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

export const attachDataToPark = (userFavParks, dataList) => {
  for (var idx = 0; idx < userFavParks.length; idx++)
  {
    let userFavPark = userFavParks[idx];

    for (var idy = 0; idy < dataList.length; idy++)
    {
      let dataListTmp = dataList[idy];
      // note varname from DB is all lower case
      if (userFavPark.parkcode === dataListTmp.parkCode)
      {
        userFavPark.parkdata = dataListTmp;
        break;
      }
    }
  }
  return (idy);
}

export const coder = (input, shift = 0, encode = true) => {
  const alphabet = [
    'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x',
    'y', 'z'
  ];

  if (shift === 0 || shift > 25 || shift < -25)
  {
    return false;
  }
  if (!encode)
  {
    shift *= -1;
  }
  return input.toLowerCase().split('').map(letter => {
    if (alphabet.includes(letter))
    {
      if (alphabet.indexOf(letter) + shift < 0)
      {
        return alphabet[alphabet.indexOf(letter) + shift + 26];
      }
      if (alphabet.indexOf(letter) + shift > 25)
      {
        return alphabet[alphabet.indexOf(letter) + shift - 26];
      }
      return alphabet[alphabet.indexOf(letter) + shift];
    } else
    {
      return letter;
    }
  }).join('');
}



// import { findFavParksForUser } from './Helpers';
