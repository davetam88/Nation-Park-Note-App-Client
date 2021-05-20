import React, { Component } from 'react';
import MainContext from '../MainContext';
import '../App.css'
import './FavForm.css'
import { findUserRecByUsername } from './Helpers';
import config from '../config';

class RegistrationPage extends Component {
  static contextType = MainContext;

  state = {
    errorMsg: "",
    username: "",
    password1: "",
    password2: ""
  }

  static defaultProps = {
    history: {
      push: () => { },
    },

  };

  updateUsername(username) {
    this.setState({
      username: username,
      errorMsg: "",
    })
  }

  updatePassword1(password1) {
    this.setState({
      password1: password1,
      errorMsg: "",
    })
  }

  updatePassword2(password2) {
    this.setState({
      password2: password2,
      errorMsg: "",
    })
  }

  handleCancel = () => {
    this.props.history.push('/')
  };

  async fetchUsers() {
    const response = await fetch(`${config.API_ENDPOINT}/users`);
    const users = await response.json();
    return (users);
  }

  handleSubmit = (e) => {

    e.preventDefault();
    const { users } = this.context;
    const { username, password1, password2 } = this.state;


    if (username === "")
    {
      this.setState({
        errorMsg: "Username is Required",
      })
      return;
    }

    if (password1 === "")
    {
      this.setState({
        errorMsg: "Password is Required",
      })
      return;
    }

    if (password2 === "")
    {
      this.setState({
        errorMsg: "Confirm Password is Required",
      })
      return;
    }


    if (password1 === password2)
    {
      const password = password1;

      // check in mem users recs 
      if (findUserRecByUsername(users, username))
      {
        this.setState({
          errorMsg: "Username Already Taken, Please Try Other."
        })
        return;
      }

      // check DB users recs 
      this.fetchUsers(username, password).then(usersDB => {

        if ((usersDB) && findUserRecByUsername(usersDB, username))
        {
          this.setState({
            errorMsg: "Username Already Taken, Please Try Other."
          })
          return;
        } else
        {
          const newUserid = users.length + usersDB.length;
          this.context.RegistrationCB(username, password, newUserid);
          this.props.history.push("/");
          return;
        }
      });
    }
  }

  render() {
    const { errorMsg } = this.state;
    return (
      <main>
        <div className="FavPark-form-container">
          <form className="FavPark-form"
            onSubmit={this.handleSubmit}
          >
            <h2>
              Please Enter Registration Infomation
              </h2>


            <label htmlFor="username" className="label"> Username:</label>
            <input type="text" id="username" name="username"
              placeholder="Username"
              onChange={(e) => this.updateUsername(e.target.value)}
              required="" />
            <br />

            <label htmlFor="password1" className="label">Password:</label>
            <input type="password" id="password1" name="password1" placeholder="Password"
              onChange={(e) => this.updatePassword1(e.target.value)}
              required="" />
            <br />
            <label htmlFor="password2" className="label">Re-type Password:</label>
            <input type="password" id="password2" name="password2"
              placeholder="Password"
              onChange={(e) => this.updatePassword2(e.target.value)}
              required="" />
            <br />

            <br />
            <div className="error-message-login">{errorMsg}</div>
            <br />
            <div className="filter-button-section">
              <div className="FavPark-form-buttons-wrapper">
                <button type="submit">Submit</button>
                <button type='button' onClick={this.handleCancel}>
                  Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </main >
    );
  }
}
export default RegistrationPage;
