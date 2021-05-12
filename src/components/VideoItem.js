import React, { Component } from 'react';
import '../App.css'

class VideoItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleGoBackButton = () => {
    this.props.history.push('/')
  };

  render() {
    const { item, history } = this.props;
    let videoTitle = item.snippet.title;
    let videoSmallPic = item.snippet.thumbnails.medium.url;
    let videoDescription = item.snippet.description;
    let videoID = item.id.videoId;
    let linkadr = `https://www.youtube.com/watch?v=${videoID}`;

    return (
      <>
        <div className="item">
          <h4 className="overlay-title-container">{videoTitle}</h4>
          <br />

          <a href={linkadr} target='_blank' rel='noreferrer'>
            <img src={videoSmallPic} alt={videoTitle} />
          </a>

          <h4>{videoDescription}</h4>
          <br />

          <button className="btn-generic-fav green" type="button"
            onClick={e => history.goBack()}
          >Go Back</button>

        </div>
      </>
    )
  }
}

export default VideoItem;



