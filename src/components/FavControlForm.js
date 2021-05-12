import React, { Component } from 'react';
import MainContext from '../MainContext';
import { Link } from 'react-router-dom'
// import config from '../config';
// import { withRouter } from 'react-router-dom';

class MainControlForm extends Component {
  static contextType = MainContext;
  constructor(props) {
    super(props);
    this.state = {
      // stateCode: "",
      // activity: "",
    };
  }

  static defaultProps = {
    history: {
      push: () => { },
    },
  };

  handleModifyButton(e) {

  }

  renderGoFavLink() {
    let styles = {
      'a:link': 'color: white',
      'marginLeft': '8px',
      'color': 'limegreen',
    };

    if (this.context.logInState)
      return (
        <>
          <span> </span>
          or
          < Link to='/' >
            <span style={styles}>
              Search for More Parks
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
    const { FavOrderByCB, favOrderByOptoins } = this.context;
    return (
      <>
        <h3 className="filter-title">
          Sort Your Favorite Parks Using Buttons Below
        {this.renderGoFavLink()}
        </h3>

        <div className="nav-myFav-radio-btn-container"> (
          {favOrderByOptoins.map((option, idx) => (
          <button key={idx} type="button"
            className=
            {(option.selected)
              ? "btn-generic-fav blue"
              : "btn-generic-fav green"
            }
            onClick={e => FavOrderByCB(idx, option.label, option.sortName)}  >
            {option.label}</button>
        ))}
        </div>

        <br />
        < div id="js-error-message-main" className="error-message-main" >
          {this.context.fetchErrMsg}
        </div >
      </>
    );
  }
}

export default MainControlForm;

