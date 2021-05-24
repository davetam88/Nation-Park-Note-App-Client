import React, { Component } from 'react';
import MainContext from '../MainContext';
import '../App.css'

class FavParkItem extends Component {
  static contextType = MainContext;

  parkcodeSelected = "";

  constructor(props) {
    super(props);
    this.state = {
    }
  }


  // match with userid and state code 
  matchFavPark = (userFavParks, userRec, data) => {
    for (let idx = 0; idx < userFavParks.length; idx++)
    {
      let favParkTmp = userFavParks[idx];
      if ((favParkTmp.parkcode === data.parkcode) &&
        (favParkTmp.userid === userRec.userid))
      {
        return favParkTmp;
      }
    }
    return 0;
  }

  renderButtons(favPark, history) {
    const { DeleteFavParkCB } = this.context;

    return (
      <>
        <button className="btn-generic-del " type="button"
          onClick={e => DeleteFavParkCB(
            favPark.id
          )}
        > Remove</button>
      </>
    )
  }

  render() {

    const { history, favPark } = this.props;

    const note = favPark.note;
    const parknum = favPark.parknum;
    const rating = favPark.rating;
    const activity = favPark.activity;
    const statename = favPark.statename;
    const parkdata = favPark.parkdata;


    let siteAddress = "";
    if (parkdata.addresses.length === 0)
      siteAddress = 'No Address Information For This Park, Sorry';
    else
    {
      siteAddress = `
            ${parkdata.addresses[0].line1}
            ${parkdata.addresses[0].city},  ${parkdata.addresses[0].statecode} ${parkdata.addresses[0].postalCode} 
            `;
    }


    return (

      < div className="item" >
        <div className="fav-show-title">
          <h3>{parkdata.fullName}</h3>
        </div>
        <div className="fav-show-stats">
          Park# {parknum}, Rating: {rating}, State: {statename}
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

        <img src={parkdata.images[0].url} alt={parkdata.fullName} />

        <p>{parkdata.description}</p>
        <p><b>WebLink</b> : <a href={parkdata.url}> {parkdata.fullName}</a></p>

        <p>
          <b>HQ Address</b> : {siteAddress}
        </p>

        <button className="btn-generic " type="button"
          onClick={e => this.context.ViewPictureBtnCB(history, parkdata.fullName, parkdata)}
        > More Picture</button >

        <button className="btn-generic " type="button"
          onClick={e => this.context.ViewVideoBtnCB(history, parkdata.fullName)}
        >Video</button>
        { this.renderButtons(favPark, history)}
      </div >
    )
  }
}
export default FavParkItem;

