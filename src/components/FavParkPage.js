import React, { Component } from 'react';
import '../App.css'
import MainControl from './MainControl';
import NavBar from './NavBar';
import '../App.css'
import './FavForm.css'
import MainContext from '../MainContext';
import FavParkList from "./FavParkList";
import { findFavParksForUser } from './Helpers';

class FavParkPage extends Component {
  static contextType = MainContext;
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      error: "",
    }
  }

  componentDidMount() {
    const { favParks, userRec } = this.context;

    // sql
    const userFavParks = findFavParksForUser(favParks, userRec.userid);

    const parkCodeList = userFavParks.map(park => park.parkCode);
    parkCodeList.join(',');


    if (!userFavParks.length)
    {
      // let errorMsg = `You Have Not Save Any Park Yet`;
      // this.setState({ error: errorMsg });
    }

    let searchURL = 'https://developer.nps.gov/api/v1/parks';
    let api_key = 'nC3wQoBberQTpH9oGy9RZd3WPZRbbUw3eTCblSCb';
    let limit = 20;
    let parkURL = `${searchURL}?parkCode=${parkCodeList}&limit=${limit}&api_key=${api_key}&`;

    fetch(parkURL)
      .then(response => {
        if (response.ok)
          return response.json();
        let errorMsg = `${response.status} : ${response.statusText}`;
        throw new Error(errorMsg);
      })
      .then(data => {
        this.setState(data)
      })
      .catch(err => {
        let errorMsg = `Something went wrong, ErrorMsg/ErrorCode : ${err.message}`;
        this.setState(errorMsg);
      });

  }

  render() {
    // const { favParks, userRec } = this.context;
    const { history } = this.props;


    if (Object.keys(this.state.data).length === 0)
    {
      return (
        <>
        </>
      )
    }

    return (
      <>
        <MainControl
          history={history}
          logInState={this.context.logInState}
          doFavPage={true}
          username={this.context.username}
        />
        <NavBar
          username={this.context.username}
          logInState={this.context.logInState}
        />
        <main>
          <section id="js-results" className="bg-main-display cls-results">
            {/* error or content */}
            {this.state.error
              ?
              < p style={{
                fontSize: '1.2em', color: "red"
              }}>{this.state.error}</p>
              :
              <FavParkList
                dataList={this.state.data}
                history={this.props.history}
              />
            }
          </section>
        </main>
      </>
    );
  }
}

export default FavParkPage;


