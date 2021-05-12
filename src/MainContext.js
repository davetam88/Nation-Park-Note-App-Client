import React from 'react'


const MainContext = React.createContext({
  fetchParkData: {},
  users: [],
  favParks: [],

  activityOptions: [],
  stateOptions: [],
  favOrderByOptoins: [],
  favOrderByBtnLabel: "",
  favOrderBySortName: "",

  error: null,

  activity: "",
  stateCode: "",
  parkName: "",
  parkCode: "",
  parkData: "",

  username: "",
  password: "",
  userRec: {},
  logInState: false,

  savedPark: false,
  fetchErrMsg: "",
  displayFavPage: "",

  ActivityCB: () => { },
  StateCodeCB: () => { },
  MainControlFormCB: () => { },
  RegistrationCB: () => { },
  LoginCB: () => { },
  SaveParkCB: () => { },
  FavOrderByCB: () => { },
  SaveParkButtonCB: () => { },
  ParkSelectedCB: () => { },
  AddFavNoteSubmitCB: () => { },
  ViewVideoBtnCB: () => { },
  ViewPictureBtnCB: () => { },
  DeleteFavParkCB: () => { },

  FetchFavParkInfosCB: () => { },
})

export default MainContext
