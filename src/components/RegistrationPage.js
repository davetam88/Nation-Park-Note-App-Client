import React, { Component } from 'react';
import MainContext from '../MainContext';
import '../App.css'
import './FavForm.css'

class RegistrationPage extends Component {
  static contextType = MainContext;

  state = {
    errorMsg: "",
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

  handleSubmit = (e) => {

    e.preventDefault();
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
      let usernametaken = false;
      let idx = 0;
      this.context.users.forEach(list => {
        idx++;
        if (list.username === username)
        {
          this.setState({
            errorMsg: "Username Already Taken, Please Try Other.",
          })
          usernametaken = true;
          return;
        }
      })
      if (!usernametaken)
      {
        this.context.RegistrationCB(username, password, idx);
        this.props.history.push("/");
      }
      // post to api
    } else
    {
      this.setState({
        errorMsg: "Password And Re-type Password Do No Match, Please Try Again",
      })
      return;
    }
  }


  render() {
    const { errorMsg } = this.state;
    return (
      <main>
        <div class="FavPark-form-container">
          <form class="FavPark-form"
            onSubmit={this.handleSubmit}
          >
            <h2>
              Please Enter Registration Infomation
              </h2>


            <label for="username" class="label"> Username:</label>
            <input type="text" id="username" name="username"
              placeholder="Username"
              onChange={(e) => this.updateUsername(e.target.value)}
              required="" />
            <br />

            <label for="password1" class="label">Password:</label>
            <input type="password" id="password1" name="password1" placeholder="Password"
              onChange={(e) => this.updatePassword1(e.target.value)}
              required="" />
            <br />
            <label for="password2" class="label">Re-type Password:</label>
            <input type="password" id="password2" name="password2"
              placeholder="Password"
              onChange={(e) => this.updatePassword2(e.target.value)}
              required="" />
            <br />

            <br />
            <div class="error-message-login">{errorMsg}</div>
            <br />
            <div class="filter-button-section">
              <div class="FavPark-form-buttons-wrapper">
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
