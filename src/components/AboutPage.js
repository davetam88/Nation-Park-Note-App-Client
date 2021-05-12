import React, { Component } from 'react'
import MainControl from './MainControl';
import '../App.css'
import AboutContent from './AboutContent';
import NavBar from './NavBar';

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { logInState, username } = this.context;

    <MainControl
      history={this.props.history}
      logInState={logInState}
      doFavPage="false"
      username={username}
    />

    return (
      <>
        <MainControl />
        <NavBar
          username={this.context.username}
          logInState={this.context.logInState}
        />
        <AboutContent />
      </>
    )
  }
}

export default AboutPage;


