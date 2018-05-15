//--------------------------------Imports-------------------------------//
import { Component } from "react";
import YouTube from "react-youtube";
import PropTypes from "prop-types";
import Button from "semantic-ui-react";

//****************************************************************************
//This component is used for contole the Youtube-Player
//****************************************************************************

export default class YouTubePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = { controlled: false };
    this._onError = this._onError.bind(this);
    this._onEnd = this._onEnd.bind(this);
    this._onPause = this._onPause.bind(this);
    this._onPlay = this._onPlay.bind(this);
    this._onReady = this._onReady.bind(this);
    this._onStateChanged = this._onStateChanged.bind(this);
    this.handlePauseVideo = this.handlePauseVideo.bind(this);
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

  componentWillUpdate(nextProps, nextState) {
    if (nextState.controlled == true) {
      if (nextProps.status == "play") {
        this.playVideo();
      }
      this.setState({ controlled: false });
    }
  }

  //componentDidUpdate() is invoked immediately after updating occurs
  componentDidUpdate(prevProps, prevState) {
    if (this.props.status != prevProps.status) {
      if (this.props.status == "pause") {
        this.refs.ytPlayer.internalPlayer.pauseVideo();
      } else {
        this.setState({ controlled: true });
      }
    } else {
      if (
        Math.abs(Math.round((this.props.started - prevProps.started) / 1000)) >
        2
      ) {
        console.log(
          Math.abs(Math.round((this.props.started - prevProps.started) / 1000))
        );
        // console.log("Started Time changed");
        this.setState({ controlled: true });
      }
    }
  }

  async playVideo() {
    // console.log("Play Video (private function)");
    var startTime = this.props.started;
    var currentTime = new Date().getTime();
    var timecode = Math.round((currentTime - startTime) / 1000);
    await this.refs.ytPlayer.internalPlayer.playVideo();
    await this.refs.ytPlayer.internalPlayer.seekTo(timecode + 1);
  }
  //----------------------------------Render-----------------------------//
  render() {
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        //start: timecode
      }
    };

    return (
      //  <div>
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
      //<Button onClick={this.handlePauseVideo} />
      //  </div>
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
    var currentTime = new Date().getTime();
    var startTime = this.props.started;
    var timecode = Math.round((currentTime - startTime) / 1000);
    var currentVideoTimer = event.target.getCurrentTime();
    var diff = Math.abs(currentTime - timecode);
    if (
      (this.props.status != "play" || diff > 2) &&
      this.state.controlled == false
    ) {
      var newTimecode = currentTime - currentVideoTimer * 1000;
      this.props.handleVideoPlay(
        this.props.roomId,
        this.props.databaseId,
        newTimecode
      );
    } else {
      /*  console.log("startTime:" + startTime);
      console.log("currentTime:" + currentTime);
      console.log("timecode:" + timecode);
      console.log(currentVideoTimer);
      console.log(diff); */
    }
  }

  // access to player in all event handlers via event.target
  _onReady(event) {
    console.log("Player ready");
    //console.log(event.target);
    if (this.status == "play") {
      var startTime = this.props.started;
      var currentTime = new Date().getTime();
      var timecode = Math.round((currentTime - startTime) / 1000);
      //console.log(timecode);
      // console.log(this.refs.ytPlayer);
      this.refs.ytPlayer.internalPlayer.playVideo();
      this.refs.ytPlayer.internalPlayer.seekTo(timecode + 1);
      this.setState({ controlled: false });
    } else {
      var startTime = this.props.started;
      var currentTime = new Date().getTime();
      var timecode = Math.round((currentTime - startTime) / 1000);
      // console.log(timecode);
      // console.log(this.refs.ytPlayer);
      this.refs.ytPlayer.internalPlayer.pauseVideo();
      this.refs.ytPlayer.internalPlayer.seekTo(timecode + 1);
      this.setState({ controlled: false });
    }
  }

  _onStateChanged(event) {
    console.log("Player state changed");
    //console.log(event);
  }

  handlePauseVideo(event) {
    this.refs.ytPlayer.internalPlayer.pauseVideo();
  }
}
