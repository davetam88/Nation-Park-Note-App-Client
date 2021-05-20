export const findStateObjByCode = (stateOptions = [], statecode) => {
  return (
    stateOptions.find(statename => statename.value === statecode)
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

export const findFavParkByParkcode = (FavParks = [], parkcode) => {
  return (
    FavParks.find(elem => elem.parkcode === parkcode)
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
      // note varname from DB is all lower case
      if (userFavPark.parkcode === dataListTmp.parkCode)
      {
        userFavPark.parkdata = dataListTmp;
        // userFavPark.parkdata = "test";
        break;
      }
    }
  }
  return (idy);
}

// import { findFavParksForUser } from './Helpers';
