import React, { Component } from 'react';
import '../App.css'

class PictureItem extends Component {
  render() {
    const { data, history } = this.props;
    return (
      <div className="item">
        <div className="park-info-title-container">
          <h3>{data.title}</h3>
        </div>
        <img src={data.url} alt={data.caption} />
        <p>{data.caption}</p>
        <button className="btn-generic-fav green" type="button"
          onClick={e => history.goBack()}
        >Go Back</button>
      </div >
    )
  }
}

export default PictureItem;



