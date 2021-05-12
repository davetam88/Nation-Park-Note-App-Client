import React, { Component } from 'react';
import PictureItem from "./PictureItem";
import MainContext from '../MainContext';
import '../App.css'

class PictureList extends Component {
  static contextType = MainContext;

  render() {
    const { parkName, parkData, doFavPage, history } = this.props;

    if (Object.keys(parkData).length === 0)
      return null;

    const imageLen = parkData.images.length;

    return (
      <>
        <h3 className="overlay-section-heading">
          There are <em>{imageLen}</em> Pictures for <em>{parkName}</em>, Enjoy !!
        </h3>
        <div className="group-container wrap">
          <div className="group-container wrap">
            {
              parkData.images.map((data, idx) => (
                <PictureItem key={idx}
                  history={history}
                  doFavPage={doFavPage}
                  data={data}
                />
              ))
            }
          </div>
        </div>
      </>
    )
  }
}

export default PictureList;


