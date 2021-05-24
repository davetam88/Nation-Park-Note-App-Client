import React, { Component } from "react";
import { Route } from "react-router-dom";

import MainContext from './MainContext';
import HomePage from "./components/HomePage";
import PicturePage from "./components/PicturePage";
import AboutPage from './components/AboutPage';
import FavParkPage from './components/FavParkPage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import AddFavNote from './components/AddFavNote';
import VideoPage from './components/VideoPage';

import config from './config';
import STORE from './STORE'
import "./App.css";



class App extends Component {
  api_key = 'nC3wQoBberQTpH9oGy9RZd3WPZRbbUw3eTCblSCb';
  searchURL = 'https://developer.nps.gov/api/v1/parks';

  state = {
    fetchparkdata: {},
    // users: [],
    favParks: [],

    stateOptions: STORE.stateOptions,
    activityOptions: STORE.activityOptions,
    favOrderByOptoins: STORE.favOrderByOptoins,

    favOrderByBtnLabel: "Park Number",
    favOrderBySortName: "parknum",

    activity: "All",
    statecode: "AL",
    parkname: "",
    parkcode: "",
    parkdata: {},

    username: "Demo",
    logInState: false,
    userRec: {},

    savedPark: false,
    fetchErrMsg: "",
    displayFavPage: false,
    // save park name and code

  };

  ActivityCB = (activity) => {
    this.setState({
      activity
    })
  }

  statecodeCB = (statecode) => {
    this.setState({
      statecode
    })
  }

  MainControlFormCB = () => {
    const { statecode, activity } = this.state;
    this.fetchParkInfos(statecode, activity, 20);
    // this.state.activity = activity;
  }

  RegistrationCB = (username, password) => {
    let userRecNew = {
      username: username,
      password: password,
    }

    this.addNewUser(userRecNew);
    var initSelect = JSON.parse(JSON.stringify(this.state.favOrderByOptoins));
    for (let idx = 0; idx < initSelect.length; idx++)
      initSelect[idx].selected = 0
    initSelect[0].selected = 1;

    this.setState({
      username: username,
      userRec: userRecNew,
      logInState: true,
      favOrderByOptoins: initSelect,
      favOrderBySelected: 0,
    })
  }

  async fetchFavparkForUser(userid) {
    try
    {
      const response = await fetch(`${config.API_ENDPOINT}/api/favparks/favparks-userid/${userid}`);
      const favparks = await response.json();
      return (favparks);
    }
    catch (err)
    {
      const errmsg = "Cannot Fetch User Park Info : Server Access Failed"
      this.setState({
        fetchErrMsg: errmsg,
      })
      alert(errmsg)
    }
  }


  LoginCB = (userRec) => {

    var initSelect = JSON.parse(JSON.stringify(this.state.favOrderByOptoins));

    for (let idx = 0; idx < initSelect.length; idx++)
      initSelect[idx].selected = 0
    initSelect[0].selected = 1;

    this.fetchFavparkForUser(userRec.id).then(favParks => {
      this.setState({
        username: userRec.username,
        password: userRec.password,
        logInState: true,
        favOrderByOptoins: initSelect,
        favOrderBySelected: 0,
        userRec: userRec,
        favParks: favParks
      })
      return;
    })
  }


  LogoutCB = (history) => {
    this.setState({
      logInState: false
    })
    history.push('/');
  }

  FavOrderByCB = (idx, label, sortName) => {
    const oldIdx = this.state.favOrderBySelected;
    var newSelect = JSON.parse(JSON.stringify(this.state.favOrderByOptoins));
    newSelect[idx].selected = 1;
    newSelect[oldIdx].selected = 0;

    this.setState({
      favOrderByOptoins: newSelect,
      favOrderBySelected: idx,
      favOrderByBtnLabel: label,
      favOrderBySortName: sortName
    });
  }

  SaveParkButtonCB = (parkname, parkcode, parkdata, history) => {
    localStorage.setItem("park", parkname)
    this.setState({
      parkcode,
      parkname,
      parkdata,
    });
    history.push('/add-fav-note')
  };


  async addFavPark(favpark) {
    //   const response = await fetch('http://localhost:8000/users');
    try
    {
      await fetch(config.API_ENDPOINT + `/api/favparks`, {
        body: JSON.stringify(favpark),
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          // 'authorization': `bearer ${config.API_KEY}`
        }
      })
    }
    catch (err)
    {
      const errmsg = "Cannot Add Park Info : Server Access Failed"
      this.setState({
        fetchErrMsg: errmsg,
      })
      alert(errmsg)
    }
  }


  AddFavNoteSubmitCB = (favPark) => {

    this.addFavPark(favPark).then(() => {
      const favParkTmp = JSON.parse(JSON.stringify(favPark))
      this.setState({
        favParks: [
          ...this.state.favParks,
          favParkTmp
        ]
      })
    })
  }


  ParkSelectedCB = (parkSelected) => {
    this.setState({
      parkSelected
    })
  }


  ViewVideoBtnCB = (history, parkname) => {
    this.setState({ parkname: parkname });
    history.push('/video-page')

  }

  ViewPictureBtnCB = (history, parkname, parkdata) => {

    this.setState({
      parkname: parkname,
      parkdata: parkdata,
    });
    history.push('/picture-page')
  }

  async deleteFavPark(favparkId) {
    try
    {
      await fetch(config.API_ENDPOINT + `/api/favparks/${favparkId}`, {
        method: 'DELETE',
        headers: {
          'authorization': `bearer ${config.API_KEY}`
        }
      })
    }
    catch (err)
    {
      const errmsg = "Cannot Remove Park Info : Server Access Failed"
      this.setState({
        fetchErrMsg: errmsg,
      })
      alert(errmsg)
    }
  }

  DeleteFavParkCB = (favParkId) => {
    this.deleteFavPark(favParkId).then(() => {
      const favParksNew = this.state.favParks.filter(favPark =>
        (favParkId !== favPark.id)
      )
      this.setState({
        favParks: favParksNew,
      })
      return;
    })
  }

  async addNewUser(userRec) {
    const response = await fetch(`${config.API_ENDPOINT}/api/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userRec),
    })
    const temp = await response.json();
    return temp;
  }


  componentDidMount() {
    const { statecode, activity } = this.state;
    this.fetchParkInfos(statecode, activity, 20);
  }

  formatParkInfoQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

  fetchParkInfos(statecode, activity, maxResults = 4) {
    this.setState({ fetchErrMsg: "" })

    const paramsNormal = {
      api_key: this.api_key,
      statecode: statecode,
      q: activity,
      limit: maxResults
    };

    const paramsAllActivity = {
      api_key: this.api_key,
      statecode: statecode,
      limit: maxResults
    };

    let paramsUse = paramsNormal;
    if (activity === "All")
    {
      paramsUse = paramsAllActivity;
    }

    const queryString = this.formatParkInfoQueryParams(paramsUse);
    const parkURL = this.searchURL + '?' + queryString;

    fetch(parkURL)
      .then(response => {
        if (response.ok)
          return response.json();
        let errmsg = `${response.status} : ${response.statusText}`;
        throw new Error(errmsg);
      })
      .then(fetchparkdata => {

        this.setState({
          activity: activity,
          statecode: statecode,
          fetchparkdata: fetchparkdata
        })

      })
      .catch(err => {
        let errmsg = `Error: ${err.message}`;
        this.setState({
          fetchErrMsg: errmsg,
        })
        //        alert(errmsg);
      });
  }


  render() {
    const contextValue = {
      history: this.props.history,
      fetchparkdata: this.state.fetchparkdata,

      users: this.state.users,
      favParks: this.state.favParks,
      stateOptions: this.state.stateOptions,
      activityOptions: this.state.activityOptions,
      favOrderByOptoins: this.state.favOrderByOptoins,
      favOrderByBtnLabel: this.state.favOrderByBtnLabel,
      favOrderBySortName: this.state.favOrderBySortName,

      activity: this.state.activity,
      statecode: this.state.statecode,
      parkname: this.state.parkname,
      parkcode: this.state.parkcode,
      parkdata: this.state.parkdata,

      username: this.state.username,
      password: this.state.password,
      userRec: this.state.userRec,
      logInState: this.state.logInState,

      savedPark: this.state.savedPark,
      fetchErrMsg: this.state.fetchErrMsg,
      displayFavPage: this.state.displayFavPage,

      ActivityCB: this.ActivityCB,
      statecodeCB: this.statecodeCB,
      MainControlFormCB: this.MainControlFormCB,
      RegistrationCB: this.RegistrationCB,
      LoginCB: this.LoginCB,
      SaveParkCB: this.SaveParkCB,
      FavOrderByCB: this.FavOrderByCB,
      SaveParkButtonCB: this.SaveParkButtonCB,
      ParkSelectedCB: this.ParkSelectedCB,
      AddFavNoteSubmitCB: this.AddFavNoteSubmitCB,
      ViewVideoBtnCB: this.ViewVideoBtnCB,
      ViewPictureBtnCB: this.ViewPictureBtnCB,
      DeleteFavParkCB: this.DeleteFavParkCB,
    }

    const { parkname, parkdata } = this.state;

    return (
      <div className="container" >
        <MainContext.Provider value={contextValue}>

          <Route exact path="/" component={HomePage} />

          <Route path="/about" component={AboutPage} />

          <Route path="/login" component={LoginPage} />

          <Route path="/registration" component={RegistrationPage} />

          < Route
            path="/video-page"
            render={routeProps => {
              return <VideoPage
                history={routeProps.history}
                parkname={parkname}
              />
            }} />


          < Route
            path="/picture-page"
            render={routeProps => {
              return <PicturePage
                history={routeProps.history}
                parkname={parkname}
                parkdata={parkdata}
              />
            }} />


          < Route
            path="/add-fav-note"
            render={routeProps => {
              return <AddFavNote
                history={routeProps.history}
                favParks={this.state.favParks}
              />
            }} />

          < Route
            path="/fav-park"
            render={routeProps => {
              return <FavParkPage
                history={routeProps.history}
              />
            }} />

          < Route
            path="/logout"
            render={routeProps => {
              this.LogoutCB(routeProps.history)
              // routeProps.history.push('/');
              return null;
            }}
          />
        </MainContext.Provider>
      </div >
    );
  }
}

export default App;
