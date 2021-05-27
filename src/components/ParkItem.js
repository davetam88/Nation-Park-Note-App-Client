import React, { Component } from 'react';
import MainContext from '../MainContext';
import '../App.css'

class ParkItem extends Component {
  static contextType = MainContext;

  parkcodeSelected = "";

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  renderButtons(parkcode, fullName, itemData, history, favParks, userRec) {
    const { SaveParkButtonCB, DeleteFavParkCB } = this.context;
    if (this.context.logInState)
    {
      let favPark = favParks.find((favpark, idx) => {
        return (((favpark.parkcode === parkcode) && (
          favpark.userid === userRec.id)) ? favpark : 0)
      })

      if (favPark)
      {
        return (
          <>
            <button className="btn-generic-del " type="button"
              onClick={e => DeleteFavParkCB(
                favPark.id
              )}
            > Remove</button>
          </>
        )
      } else
      {
        return (
          <>
            <button className="btn-generic-save" type="button"
              onClick={e => SaveParkButtonCB(fullName, parkcode, itemData, history)}
            > Save</button>
          </>
        )
      }
    }
  }


  render() {
    const { history, favParks, itemData, userRec } = this.props;

    let siteAddress = "";
    if (itemData.addresses.length === 0)
      siteAddress = 'No Address Information For This Park, Sorry';
    else
    {
      siteAddress = `
            ${itemData.addresses[0].line1}
            ${itemData.addresses[0].city},  ${itemData.addresses[0].stateCode} ${itemData.addresses[0].postalCode} 
            `;
    }

    return (
      <div className="item">
        <div className="park-info-title-container">
          <h3>{itemData.fullName}</h3>
        </div>

        <img src={itemData.images[0].url} alt={itemData.fullName} />

        <p>{itemData.description}</p>
        <p><b>WebLink</b> : <a href={itemData.url}> {itemData.fullName}</a></p>

        <p>
          <b>HQ Address</b> : {siteAddress}
        </p>
        <button className="btn-generic " type="button"
          onClick={e => this.context.ViewPictureBtnCB(history, itemData.fullName, itemData)}
        > More Picture</button >

        <button className="btn-generic " type="button"
          onClick={e => this.context.ViewVideoBtnCB(history, itemData.fullName)}
        >Video</button>
        {/* ren but --  */}
        {this.renderButtons(itemData.parkCode, itemData.fullName, itemData, history, favParks, userRec)}
      </div>

    )
  }
}


export default ParkItem;
