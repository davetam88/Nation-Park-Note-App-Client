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
import STORE from './STORE'
import { findUserRecByUsername } from './components/Helpers';
import "./App.css";

class App extends Component {
  api_key = 'nC3wQoBberQTpH9oGy9RZd3WPZRbbUw3eTCblSCb';
  searchURL = 'https://developer.nps.gov/api/v1/parks';

  state = {
    fetchParkData: {},

    users: STORE.users,
    favParks: STORE.favParks,
    stateOptions: STORE.stateOptions,
    activityOptions: STORE.activityOptions,
    favOrderByOptoins: STORE.favOrderByOptoins,

    favOrderByBtnLabel: "Park Number",
    favOrderBySortName: "parkNumber",

    activity: "All",
    stateCode: "AL",
    parkName: "",
    parkCode: "",
    parkData: "",

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

  StateCodeCB = (stateCode) => {
    this.setState({
      stateCode
    })
  }

  MainControlFormCB = () => {
    const { stateCode, activity } = this.state;
    this.fetchParkInfos(stateCode, activity, 20);
    // this.state.activity = activity;
  }


  RegistrationCB = (username, password, idx) => {
    let currentUser = {
      // this id could be generate by sql 
      userid: this.state.users.length + 1,
      username: username,
      password: password,
      favParkIds: [],
    }

    // const userRec = findUserRecByUsername(this.state.users, username);
    // initialzie order by buttons, for new user.
    var initSelect = JSON.parse(JSON.stringify(this.state.favOrderByOptoins));
    for (let idx = 0; idx < initSelect.length; idx++)
      initSelect[idx].selected = 0
    initSelect[0].selected = 1;


    this.setState({
      users: [
        ...this.state.users,
        currentUser
      ],
      username: username,
      userRec: currentUser,
      logInState: true,
      favOrderByOptoins: initSelect,
      favOrderBySelected: 0,
    })
    // store information to database
  }

  LoginCB = (username, password) => {

    // initialzie order by buttons, for new user.
    var initSelect = JSON.parse(JSON.stringify(this.state.favOrderByOptoins));
    for (let idx = 0; idx < initSelect.length; idx++)
      initSelect[idx].selected = 0
    initSelect[0].selected = 1;

    // for getting the favPark ids.
    const userRec = findUserRecByUsername(this.state.users, username);

    this.setState({
      username: username,
      password: password,
      logInState: true,
      favOrderByOptoins: initSelect,
      favOrderBySelected: 0,
      userRec: userRec
    })
    // store information to database
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

  SaveParkButtonCB = (parkName, parkCode, history) => {
    localStorage.setItem("park", parkName)
    this.setState({
      parkCode,
      parkName,
    });
    history.push('/add-fav-note')
  };

  AddFavNoteSubmitCB = (favPark, user) => {
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


  ViewVideoBtnCB = (history, parkName) => {
    this.setState({ parkName: parkName });
    history.push('/video-page')

  }

  ViewPictureBtnCB = (history, parkName, parkData) => {

    this.setState({
      parkName: parkName,
      parkData: parkData,
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

  componentDidMount() {
    const { stateCode, activity } = this.state;
    this.fetchParkInfos(stateCode, activity, 20);
  }

  formatParkInfoQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }


  fetchParkInfos(stateCode, activity, maxResults = 4) {
    this.setState({ fetchErrMsg: "" })

    const paramsNormal = {
      api_key: this.api_key,
      stateCode: stateCode,
      q: activity,
      limit: maxResults
    };

    const paramsAllActivity = {
      api_key: this.api_key,
      stateCode: stateCode,
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
      .then(fetchParkData => {

        this.setState({
          activity: activity,
          stateCode: stateCode,
          fetchParkData: fetchParkData
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
      fetchParkData: this.state.fetchParkData,

      users: this.state.users,
      favParks: this.state.favParks,
      stateOptions: this.state.stateOptions,
      activityOptions: this.state.activityOptions,
      favOrderByOptoins: this.state.favOrderByOptoins,
      favOrderByBtnLabel: this.state.favOrderByBtnLabel,
      favOrderBySortName: this.state.favOrderBySortName,


      activity: this.state.activity,
      stateCode: this.state.stateCode,
      parkName: this.state.parkName,
      parkCode: this.state.parkCode,
      parkData: this.state.parkData,

      username: this.state.username,
      password: this.state.password,
      userRec: this.state.userRec,
      logInState: this.state.logInState,

      savedPark: this.state.savedPark,
      fetchErrMsg: this.state.fetchErrMsg,
      displayFavPage: this.state.displayFavPage,

      ActivityCB: this.ActivityCB,
      StateCodeCB: this.StateCodeCB,
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

    const { parkName, parkData } = this.state;

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
                parkName={parkName}
              />
            }} />


          < Route
            path="/picture-page"
            render={routeProps => {
              return <PicturePage
                history={routeProps.history}
                parkName={parkName}
                parkData={parkData}
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
