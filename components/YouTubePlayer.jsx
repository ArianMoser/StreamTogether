//--------------------------------Imports-------------------------------//
import { Component } from "react";
import YouTube from "react-youtube";
import PropTypes from "prop-types";

//****************************************************************************
//This component is used for contole the Youtube-Player
//****************************************************************************

export default class YouTubePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: new Date().getTime()
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

  //componentDidUpdate() is invoked immediately after updating occurs
  componentDidUpdate(nextProps, nextState) {
    if (this.props.status != nextProps.status && false) {
      console.log("Unequal");
      console.log(this.props.status + "|" + nextProps.status);
      var currentTime = new Date().getTime();
      if (nextProps.status == "pause" && currentTime - this.state.init > 500) {
        console.log("PauseVideo");
        //this.refs.ytPlayer.internalPlayer.pauseVideo();
      }
      this.setState({ init: new Date().getTime() });
    }
  }

  //----------------------------------Render-----------------------------//
  render() {
    var startTime = this.props.started;
    var currentTime = new Date().getTime();
    var timecode = Math.round((currentTime - startTime) / 1000);

    //check status youtubePlayer
    console.log(this.refs.ytPlayer);
    if (this.refs.ytPlayer != undefined && false) {
      if (this.props.status == "play") {
        this.refs.ytPlayer.internalPlayer.seekTo(timecode);
      } else {
        if (this.props.status == "pause") {
          console.log("pauseVideo");
          // this.refs.ytPlayer.internalPlayer.pauseVideo();
        }
      }
    }
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        //autoplay: autoplay,
        //start: timecode
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
        ref="ytPlayer"
      />
    );
  }

  //----------------------------------Event-Handler-----------------------------//
  _onError(event) {
    console.log("Player error");
  }

  _onEnd(event) {
    console.log("Player end");
    this.props.handleVideoEnd(this.props.roomId, this.props.databaseId);
  }

  _onPause(event) {
    var currentTime = new Date().getTime();
    console.log(currentTime - this.state.init);
    console.log("Player paused");
    if (this.props.status != "pause" && false) {
      this.props.handleVideoPause(this.props.roomId, this.props.databaseId);
    }
  }

  _onPlay(event) {
    var currentTime = new Date().getTime();
    console.log("Player started");
    if (this.props.status != "play") {
      var currentVideoTimer = event.target.getCurrentTime();
      var timecode = currentTime - currentVideoTimer * 1000;
      this.props.handleVideoPlay(
        this.props.roomId,
        this.props.databaseId,
        timecode
      );
    }
  }

  // access to player in all event handlers via event.target
  _onReady(event) {
    if (this.props.status == "play") {
      console.log("Player ready");
      console.log(event);
      var startTime = this.props.started;
      var currentTime = new Date().getTime();
      var timecode = Math.round((currentTime - startTime) / 1000);
      console.log(timecode);
      event.target.seekTo(timecode);
    } else {
      console.log(event.target);
      event.target.pauseVideo();
    }
  }

  _onStateChanged(event) {
    console.log("Player state changed");
  }
}
