import React, { Component } from 'react';
import ParkItem from "./ParkItem";
import MainContext from '../MainContext';
import '../App.css'


class ParkList extends Component {
  static contextType = MainContext;

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    const { favParks, statecode, activity, fetchparkdata, userRec } = this.context;

    if (Object.keys(fetchparkdata).length === 0)
    {
      return (
        <>
        </>
      )
    }

    const dataLen = fetchparkdata.data.length;

    return (
      <>
        <h3 className="overlay-section-heading">
          There Are <em>{dataLen}</em> Parks That Matches Your Search Criteria<br />
          <em>statecode = {statecode}  :  Activity = {activity}</em>
        </h3>
        <div className="group-container wrap">
          {
            fetchparkdata.data.map((respData, idx) => (
              <ParkItem key={idx} history={this.props.history}
                favParks={favParks}
                itemData={respData}
                userRec={userRec}
              />
            ))
          }
        </div>
      </>
    );
  }
}

export default ParkList;
