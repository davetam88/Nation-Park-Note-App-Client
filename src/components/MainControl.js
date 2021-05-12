import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../App.css'
import MainControlForm from './MainControlForm';
import FavControlForm from './FavControlForm';

class MainControl extends Component {
  renderLoginUser(logInState) {

    let styles = {
      'a:link': 'color: white',
      'marginLeft': '8px',
      'color': 'limegreen',
    };

    if (logInState === false)
      return (
        <>
          <span style={{ paddingLeft: 12 }}>
            Save Your Favorite Parks by
          </span>

          < Link to='/registration' >
            <span style={styles}>
              Creating Your Own User Account
                  </span>
          </Link >

          <span style={{ paddingLeft: 12 }}>
            or
          </span>
          < Link to='/login' >
            <span style={styles}>
              Login to Your Account
                  </span>
          </Link >

        </>
      )
    else
    {
      return (<></>)
    }
  }

  render() {
    const { logInState, doFavPage } = this.props;

    return (
      <>
        <header className="bg-callout">
          <h1>National Park Note APP
            </h1>
          <div className='no-login'>

            <h2 className="app-title">
              {doFavPage
                ? <div>
                  Visually Explore Your Favrite Park(S) with 'More Picture' or 'Video' Buttons, or Edit The Parks With Modify or Delete Buttons.
                  </div>
                : <div>
                  All The Information You Need to Know About Your Favorite National Park in One Easy to Use App.
                  Narrow Down Your Search by State And Activities.
            </div>
              }

              {this.renderLoginUser(logInState)}
            </h2>
          </div>

          {(doFavPage === true && logInState === true)
            ? <FavControlForm />
            // : <MainControlForm history="{history}" />
            : <MainControlForm />
          }

          {(this.context.fetchErrMsg)
            ? <div class="error-message-main">this.context.fetchErrMsg</div>
            : <> </>}
        </header>
      </>
    );
  }
}


export default MainControl;

