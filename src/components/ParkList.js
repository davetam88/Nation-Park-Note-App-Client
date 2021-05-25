import React, { Component } from 'react';
import ParkItem from "./ParkItem";
import MainContext from '../MainContext';
import '../App.css'
import { findStateObjByCode } from './Helpers';

class ParkList extends Component {
  static contextType = MainContext;

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    const { favParks, stateOptions, statecode, activity, fetchparkdata, userRec } = this.context;

    if (Object.keys(fetchparkdata).length === 0)
    {
      return (
        <>
        </>
      )
    }


    const dataLen = fetchparkdata.data.length;
    const stateOjb = findStateObjByCode(stateOptions, statecode);
    const stateName = stateOjb.label;

    return (
      <>
        <h3 className="overlay-section-heading">
          There Are <em>{dataLen}</em> Parks That Matches Your Search Criteria<br />
          <em>State={stateName}  :  Activity={activity}</em>
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
