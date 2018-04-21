import { Component } from "react";
import YouTube from 'react-youtube';

export default class YouTubePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const opts = {
        height: '390',
        width: '640',
        playerVars: { // https://developers.google.com/youtube/player_parameters
          autoplay: 1
        }
      };

      return (
        <YouTube
          opts={opts}
          onError={this._onError}
          onPause={this._onPause}
          onPlay={this._onPlay}
          onReady={this._onReady}
          onStateChange={this._onStateChanged}
          start={this.props.timecode}
          videoId={this.props.videoId}
        />
      );
    }

    _onError(event) {
      console.log("Player error");
      console.log(event);
    }

    _onPause(event) {
      console.log("Player paused");
      console.log(event);
    }

    _onPlay(event) {
      console.log("Player started")
      console.log(event);
    }

    _onReady(event) {
      // access to player in all event handlers via event.target
      console.log("Player ready");
      console.log(event);
      // event.target.pauseVideo();
    }

    _onStateChanged(event) {
      console.log("Player state changed");
      console.log("CurrentTimer:" + event.target.getCurrentTime());
      console.log(event);
    }
}
