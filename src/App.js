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
    users: [],
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
    parkdata: "",

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

  RegistrationCB = (username, password, newUserid) => {
    let currentUserMem = {
      // this id could be generate by sql
      // userid: this.state.users.length + 1,
      username: username,
      password: password,
      favParkIds: [],
    }

    let currentUserDB = {
      // this id could be generate by sql
      userid: this.state.users.length + 1,
      username: username,
      password: password,
    }

    this.addNewUser(currentUserDB);

    // const userRec = findUserRecByUsername(this.state.users, username);
    // initialzie order by buttons, for new user.
    var initSelect = JSON.parse(JSON.stringify(this.state.favOrderByOptoins));
    for (let idx = 0; idx < initSelect.length; idx++)
      initSelect[idx].selected = 0
    initSelect[0].selected = 1;


    this.setState({
      users: [
        ...this.state.users,
        currentUserMem
      ],
      username: username,
      userRec: currentUserMem,
      logInState: true,
      favOrderByOptoins: initSelect,
      favOrderBySelected: 0,
    })
    // store information to database
  }


  async fetchFavpark(userid) {
    const response = await fetch(`${config.API_ENDPOINT}/favparks/favparks-userid/${userid}`);
    // const response = await fetch(`${config.API_ENDPOINT}/favparks`);
    const favparks = await response.json();
    return (favparks);
  }


  LoginCB = (userRec) => {
    // initialzie order by buttons, for new user.
    var initSelect = JSON.parse(JSON.stringify(this.state.favOrderByOptoins));

    for (let idx = 0; idx < initSelect.length; idx++)
      initSelect[idx].selected = 0
    initSelect[0].selected = 1;

    this.fetchFavpark(userRec.id).then(favParks => {
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

  SaveParkButtonCB = (parkname, parkcode, history) => {
    localStorage.setItem("park", parkname)
    this.setState({
      parkcode,
      parkname,

    });
    history.push('/add-fav-note')
  };

  AddFavNoteSubmitCB = (favPark) => {
    this.setState({
      favParks: [
        ...this.state.favParks,
        favPark
      ]
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

  DeleteFavParkCB = (favParkIdEntry, userid) => {

    const favParksNew = this.state.favParks.filter(fp => {
      return (fp.favParkId !== favParkIdEntry)
    })

    let userRecNew = this.state.userRec;
    const favParkIdsNew = userRecNew.favParkIds.filter(favParkId => {
      return (
        (favParkId !== favParkIdEntry)
      )
    })
    userRecNew.favParkIds = favParkIdsNew;


    this.setState({
      favParks: favParksNew,
      userRec: userRecNew,
      // userFavParks: userFavParks,
    })

  }

  FetchFavParkInfosCB = (firsTime) => {
    this.fetchFavParkInfosExec("hobe", 'All')
    // this.setState({ savedPark: true });

  }

  async addNewUser(userRec) {
    //   const response = await fetch('http://localhost:8000/users');
    const response = await fetch(`${config.API_ENDPOINT}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify(userRec),
    })
    const temp = await response.json();
    return temp;
  }



  async test1() {
    try
    {
      // const response = await fetch(`${config.API_ENDPOINT}/test1`)
      const response = await fetch(`${config.API_ENDPOINT}/users`)
      const temp = await response.json();
      return temp;
    } catch (err)
    {
      alert(err);
    }
  }

  componentDidMount() {
    const { statecode, activity } = this.state;
    this.fetchFavpark(1).then(favpark_rec => {
    })
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

      FetchFavParkInfosCB: this.FetchFavParkInfosCB,
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
