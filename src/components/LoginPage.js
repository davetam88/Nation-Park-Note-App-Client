import React, { Component } from 'react';
import MainContext from '../MainContext';
import '../App.css'
import './FavForm.css'

class LoginPage extends Component {
  static contextType = MainContext;

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errorMsg: "",
    };
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
    });
  }

  updatePassword(password) {
    this.setState({
      password: password,
      errorMsg: "",
    })
  }

  handleCancel = () => {
    this.props.history.push('/')
  };

  handleSubmit = (e) => {
    const { users } = this.context;
    const { username, password } = this.state;


    e.preventDefault();

    if (username === "")
    {
      this.setState({
        errorMsg: 'Username is Required',
      })
      return;
    }

    if (password === "")
    {
      this.setState({
        errorMsg: 'Password is Required',
      })
      return;
    }

    let passwordMatch = 0;
    for (let idx = 0; idx < users.length; idx++)
    {
      if (users[idx].username === username)
      {
        if (users[idx].password === password)
        {
          passwordMatch = 1;
          break;
        }
      }
    }
    if (passwordMatch)
    {
      this.context.LoginCB(username, password);
      this.props.history.push("/");
    } else
    {
      this.setState({
        errorMsg: 'Invalid Password, Please Try Again',
      })
      return;
    }
  }

  render() {

    const { errorMsg } = this.state;

    return (
      <>
        <main>
          <div className="FavPark-form-container">
            <form className="FavPark-form"
              onSubmit={this.handleSubmit}
            >
              <h2>
                Please Enter Login Information
        </h2>

              <label htmlFor="username" className="FavPark-label"> Username:</label>
              <input type="text" id="username" name="username" placeholder="Username"
                onChange={(e) => this.updateUsername(e.target.value)}
                required="" />
              <br />


              <label htmlFor="password" className="label">Password:</label>
              <input type="password" id="password" name="password" placeholder="Password"
                onChange={(e) => this.updatePassword(e.target.value)}
                required="" />

              <br />
              <div className="error-message-login">{errorMsg}</div>
              <br />

              <div className="FavPark-form-buttons-wrapper">
                <button type="submit">Submit</button>

                <button type='button' onClick={this.handleCancel}>
                  Cancel</button>
              </div>
            </form>
          </div>
        </main>
      </>
    );
  }
}

export default LoginPage;
