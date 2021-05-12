import React, { Component } from 'react';
import VideoItem from "./VideoItem";
import MainContext from '../MainContext';
import '../App.css'

class VideoList extends Component {
  static contextType = MainContext;
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { data, parkName, history } = this.props;

    if (Object.keys(data).length === 0)
    {
      return (
        <>
        </>
      )
    }
    const numVideos = data.items.length;

    return (
      <>
        <h3 className="overlay-section-heading">
          There Are <em>{numVideos}</em> Videos for <em>{parkName}</em><br /> Click on The Picture to Watch, Enjoy!!
        </h3>
        <div className="group-container wrap">
          {
            data.items.map((item, idx) => (
              <VideoItem key={idx}
                item={item}
                history={history}
              />
            ))
          }
        </div>
      </>
    );
  }
}

export default VideoList;
