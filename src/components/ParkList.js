import React, { Component } from 'react';
import ParkItem from "./ParkItem";
import MainContext from '../MainContext';
import '../App.css'
import { findFavParksForUser } from './Helpers';

class ParkList extends Component {
  static contextType = MainContext;

  constructor(props) {
    super(props);

    this.state = {
      // activity: "All",
    }
  }

  render() {
    const { favParks, logInState, stateCode, activity, fetchParkData, userRec } = this.context;

    if (Object.keys(fetchParkData).length === 0)
    {
      return (
        <>
        </>
      )
    }

    const dataLen = fetchParkData.data.length;
    let userFavParks = {};
    if (logInState) userFavParks = findFavParksForUser(favParks, userRec.userid);


    return (
      <>
        <h3 className="overlay-section-heading">
          There Are <em>{dataLen}</em> Parks That Matches Your Search Criteria<br />
          <em>StateCode = {stateCode}  :  Activity = {activity}</em>
        </h3>
        <div className="group-container wrap">
          {
            fetchParkData.data.map((respData, idx) => (
              <ParkItem key={idx} history={this.props.history}
                userFavParks={userFavParks}
                itemData={respData}
              />
            ))
          }
        </div>
      </>
    );
  }
}

export default ParkList;
