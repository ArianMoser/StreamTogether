import { Component } from "react";
import YouTube from "react-youtube";
import PropTypes from "prop-types";

export default class YouTubePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "render"
    };
    this._onError = this._onError.bind(this);
    this._onEnd = this._onEnd.bind(this);
    this._onPause = this._onPause.bind(this);
    this._onPlay = this._onPlay.bind(this);
    this._onReady = this._onReady.bind(this);
    this._onStateChanged = this._onStateChanged.bind(this);
  }

  static propTypes = {
    databaseId: PropTypes.number,
    handleVideoEnd: PropTypes.func,
    started: PropTypes.string,
    timecode: PropTypes.string,
    roomId: PropTypes.number,
    videoId: PropTypes.string
  };

  static get defaultProps() {
    return {
      databaseId: 0,
      started: new Date().getTime(),
      timecode: "0",
      roomId: 0,
      videoId: ""
    };
  }

  componentDidUpdate(nextProps, nextState) {
    /*console.log("Component Update");
    if (nextProps.videos != this.props.videos) {
      console.log(nextProps);
      console.log("Rerendering Player");
      this.forceUpdate();
    } */
  }

  render() {
    var startTime = this.props.started;
    var currentTime = new Date().getTime();
    var timecode = Math.round((currentTime - startTime) / 1000);
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        /*autoplay: 1,*/
        start: timecode
      }
    };

    return (
      <YouTube
        opts={opts}
        onError={this._onError}
        onEnd={this._onEnd}
        onPause={this._onPause}
        onPlay={this._onPlay}
        onReady={this._onReady}
        onStateChange={this._onStateChanged}
        videoId={this.props.videoId}
      />
    );
  }

  _onError(event) {
    console.log("Player error");
    //  console.log(event);
  }

  _onEnd(event) {
    console.log("Player end");
    this.props.handleVideoEnd(this.props.roomId, this.props.databaseId);
    //  console.log(event);
  }

  _onPause(event) {
    console.log("Player paused");
    this.props.handleVideoPause(this.props.roomId, this.props.databaseId);
    //   console.log(event);
  }

  _onPlay(event) {
    console.log("Player started");
    this.props.handleVideoPlay(this.props.roomId, this.props.databaseId);
    //console.log(event);
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    if(this.props.status == "play") {
      console.log("Player ready");
      console.log(event);
      var startTime = this.props.started;
      var currentTime = new Date().getTime();
      var timecode = Math.round((currentTime - startTime) / 1000);
      console.log(timecode);
      event.target.seekTo(timecode);
    }

    //event.target.playVideoAt({start:timecode});
    //console.log(event);

    // event.target.pauseVideo();
  }

  _onStateChanged(event) {
    console.log("Player state changed");
    //console.log("CurrentTimer:" + event.target.getCurrentTime());
    //console.log(event);
  }
}
