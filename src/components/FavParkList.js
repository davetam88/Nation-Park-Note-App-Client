
import React, { Component } from 'react';
import FavParkItem from "./FavParkItem";
import MainContext from '../MainContext';
import { findFavParksForUser } from './Helpers';
import { attachDataToPark } from './Helpers';

import '../App.css'

class FavParkList extends Component {
  static contextType = MainContext;

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  sortObjectArray(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key))
      {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB)
      {
        comparison = 1;
      } else if (varA < varB)
      {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  render() {

    const { dataList, history } = this.props;
    const { favParks, userRec, favOrderByBtnLabel, favOrderBySortName } = this.context;

    const userFavParks = findFavParksForUser(favParks, userRec.userid);
    let sortedUserFavParks = userFavParks.slice();
    sortedUserFavParks.sort(this.sortObjectArray('parkNumber'));

    sortedUserFavParks = sortedUserFavParks.map(
      (favPark, idx) => {
        favPark.parkNumber = idx + 1
        return (favPark)
      }
    )
    sortedUserFavParks.sort(this.sortObjectArray(favOrderBySortName));
    attachDataToPark(userFavParks, dataList);

    return (
      <>
        <h3 className="overlay-section-heading">
          You Have <em>({userFavParks.length})</em> Favorvite Park(s) Sorted By
          <span> </span><em>
            {favOrderByBtnLabel} </em> <br />
        </h3>
        <div className="group-container wrap">
          {
            sortedUserFavParks.map((userFavParkData, idx) => (
              <FavParkItem
                key={idx}
                history={history}
                userFavParkData={userFavParkData}
              />
            ))
          }
        </div>
      </>
    );
  }
}

export default FavParkList;
