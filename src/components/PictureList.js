import React, { Component } from 'react';
import PictureItem from "./PictureItem";
import MainContext from '../MainContext';
import '../App.css'

class PictureList extends Component {
  static contextType = MainContext;

  render() {
    const { parkname, parkdata, doFavPage, history } = this.props;

    if (Object.keys(parkdata).length === 0)
      return null;

    const imageLen = parkdata.images.length;

    return (
      <>
        <h3 className="overlay-section-heading">
          There are <em>{imageLen}</em> Pictures for <em>{parkname}</em>, Enjoy !!
        </h3>
        <div className="group-container wrap">
          <div className="group-container wrap">
            {
              parkdata.images.map((data, idx) => (
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


