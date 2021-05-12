export const findStateObjByCode = (stateOptions = [], stateCode) => {
  return (
    stateOptions.find(stateName => stateName.value === stateCode)
  )
}

export const findUserRecByUsername = (users = [], username) => {
  return (
    users.find(user => user.username === username)
  )
}

export const findFavParksForUser = (favParks = [], userid) => {
  return (
    (!userid)
      ? favParks
      : favParks.filter(varx => (
        varx.userid === userid)
      ))
}

export const findFavParkByParkCode = (FavParks = [], parkCode) => {
  return (
    FavParks.find(elem => elem.parkCode === parkCode)
  )
}


// return # of records found
export const attachDataToPark = (userFavParks, dataList) => {

  for (var idx = 0; idx < userFavParks.length; idx++)
  {
    let userFavPark = userFavParks[idx];
    for (var idy = 0; idy < dataList.length; idy++)
    {
      // let favParkTmp = userFavParks[idx];
      let dataListTmp = dataList[idy];
      if (userFavPark.parkCode === dataListTmp.parkCode)
      {
        userFavPark.parkData = dataListTmp;
        break;
      }
    }
  }
  return (idy);
}


// import { findFavParksForUser } from './Helpers';
