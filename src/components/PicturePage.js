import React, { Component } from 'react';
import MainContext from '../MainContext';
import '../App.css'
import MainControl from './MainControl';
import NavBar from "./NavBar";
import PictureList from './PictureList';

class PicturePage extends Component {

  static contextType = MainContext;

  render() {
    const { history, parkName, parkData } = this.props;

    return (
      <>
        <MainControl
          history={history}
          logInState={this.context.logInState}
          doFavPage={this.context.doFavPage}
          username={this.context.username}
        />
        <NavBar
          username={this.context.username}
          logInState={this.context.logInState}
        />
        <main>
          <section id="js-results" className="bg-main-display cls-results">
            <PictureList history={history}
              doFavPage={this.context.doFavPage}
              parkName={parkName}
              parkData={parkData}
            />
          </section>
        </main>
      </>
    );
  }
}

export default PicturePage;

