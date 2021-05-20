import React from 'react'


const MainContext = React.createContext({
  fetchparkdata: {},
  users: [],
  favParks: [],

  activityOptions: [],
  stateOptions: [],
  favOrderByOptoins: [],
  favOrderByBtnLabel: "",
  favOrderBySortName: "",

  error: null,

  activity: "",
  statecode: "",
  parkname: "",
  parkcode: "",
  parkdata: "",

  username: "",
  password: "",
  userRec: {},
  logInState: false,

  savedPark: false,
  fetchErrMsg: "",
  displayFavPage: "",

  ActivityCB: () => { },
  statecodeCB: () => { },
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
