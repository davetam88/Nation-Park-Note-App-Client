import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import MainContext from '../MainContext';
import '../App.css'

class NavBar extends Component {
  static contextType = MainContext;

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  renderLoginLinks(logInState, username) {
    const { favParks } = this.context;
    if (!logInState)
    {
      return (
        <>
          <Link to='/login'>
            Login
            </Link>

          <Link to='/registration'>
            Registration
            </Link>
        </>
      )
    } else
    {
      return (
        <>
          <Link to='/logout'>
            Logout
          </Link>
          <span className="username">
            {username}
          </span>
          <span className="username">
            FP={favParks.length}
          </span>
        </>
      )
    }
  }


  render() {
    const { logInState, username } = this.context;

    return (
      <div className="nav-main-container">

        <div className="nav-links">
          <div>
            <Link to='/'>
              Home
            </Link>

            <Link to='/about'>
              About
            </Link>
            {this.renderLoginLinks(logInState, username)}
          </div>
        </div>

      </div>

    )
  }
}

export default NavBar;
