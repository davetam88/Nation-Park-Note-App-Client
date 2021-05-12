import React, { Component } from 'react';
import MainContext from '../MainContext';
import '../App.css'

class FavParkItem extends Component {
  static contextType = MainContext;

  parkCodeSelected = "";

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleModifyButton = () => {
  };


  handleDeleteButton = (e) => {
  };


  // match with userid and state code 
  matchFavPark = (userFavParks, userRec, data) => {
    for (let idx = 0; idx < userFavParks.length; idx++)
    {
      let favParkTmp = userFavParks[idx];
      if ((favParkTmp.parkCode === data.parkCode) &&
        (favParkTmp.userid === userRec.userid))
      {
        return favParkTmp;
      }
    }
    return 0;
  }


  renderButtons(userFavParkData, history) {
    const { DeleteFavParkCB } = this.context;

    return (
      <>
        {/* 
        <button className="btn-generic-mod " type="button"
          onClick={e => this.handleModifyButton()}  >
          Modify</button>
 */}
        <button className="btn-generic-del " type="button"
          onClick={e => DeleteFavParkCB(
            userFavParkData.favParkId,
            userFavParkData.userid
          )}
        > Remove</button>
      </>
    )
  }

  render() {

    const { history, userFavParkData } = this.props;

    const note = userFavParkData.note;
    const parkNumber = userFavParkData.parkNumber;
    const rating = userFavParkData.rating;
    const activity = userFavParkData.activity;
    const stateName = userFavParkData.stateName;

    const parkData = userFavParkData.parkData;


    let siteAddress = "";
    if (parkData.addresses.length === 0)
      siteAddress = 'No Address Information For This Park, Sorry';
    else
    {
      siteAddress = `
            ${parkData.addresses[0].line1}
            ${parkData.addresses[0].city},  ${parkData.addresses[0].stateCode} ${parkData.addresses[0].postalCode} 
            `;
    }


    return (

      < div className="item" >
        <div className="fav-show-title">
          <h3>{parkData.fullName}</h3>
        </div>
        <div className="fav-show-stats">
          Park# {parkNumber}, Rating: {rating}, State: {stateName}
        </div>
        <div className="fav-show-stats">
          Activity: {activity}
        </div>
        <div className="fav-show-stats">
          <h3><i>My Note</i></h3>
        </div>
        <textarea className="fav-show-note" name="content" rows="4" cols="45" readOnly value={note}
        ></textarea>
        <br />
        <br />

        <img src={parkData.images[0].url} alt={parkData.fullName} />

        <p>{parkData.description}</p>
        <p><b>WebLink</b> : <a href={parkData.url}> {parkData.fullName}</a></p>

        <p>
          <b>HQ Address</b> : {siteAddress}
        </p>

        <button className="btn-generic " type="button"
          onClick={e => this.context.ViewPictureBtnCB(history, parkData.fullName, parkData)}
        > More Picture</button >

        <button className="btn-generic " type="button"
          onClick={e => this.context.ViewVideoBtnCB(history, parkData.fullName)}
        >Video</button>
        { this.renderButtons(userFavParkData, history)}
      </div >
    )
  }
}
export default FavParkItem;

