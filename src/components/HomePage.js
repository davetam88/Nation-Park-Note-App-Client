import React, { Component } from 'react';
import '../App.css'
import MainContext from '../MainContext';
import MainControl from './MainControl';
import NavBar from './NavBar';
import ParkList from './ParkList';

class HomePage extends Component {
  static contextType = MainContext;

  render() {
    const { logInState, username } = this.context;

    return (
      <>
        <MainControl
          history={this.props.history}
          logInState={logInState}
          doFavPage={false}
          username={username}
        />
        <NavBar
          username={username}
          logInState={logInState}
        />
        <main>
          <section id="js-results" className="bg-main-display cls-results">
            <ParkList history={this.props.history} />
          </section>
        </main>
      </>
    );
  }
}

export default HomePage;

