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

  componentDidMount() {}

  //componentDidUpdate() is invoked immediately after updating occurs
  componentDidUpdate(nextProps, nextState) {}

  async playVideo() {
    console.log("Play Video (private function)");
    var startTime = this.props.started;
    var currentTime = new Date().getTime();
    var timecode = Math.round((currentTime - startTime) / 1000);
    console.log(timecode);
    console.log(this.refs.ytPlayer);
    await this.refs.ytPlayer.internalPlayer.playVideo();
    await this.refs.ytPlayer.internalPlayer.seekTo(timecode + 1);
    await this.refs.ytPlayer.internalPlayer.playVideo();
  }
  //----------------------------------Render-----------------------------//
  render() {
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0
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
    console.log("Player paused");
  }

  _onPlay(event) {
    console.log("Player started");
  }

  // access to player in all event handlers via event.target
  _onReady(event) {
    console.log("Player ready");
    console.log(event.target);
    //event.target.playVideo();
    //this.refs.ytPlayer.internalPlayer.playVideo();
  }

  _onStateChanged(event) {
    console.log("Player state changed");
    console.log(event);
  }
}
