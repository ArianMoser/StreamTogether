import { Component } from "react";
import YouTube from "react-youtube";
import PropTypes from "prop-types";

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

  componentDidUpdate(nextProps, nextState) {
    //console.log("Component Update");
    //console.log(this.props);
    //console.log(nextProps);
    if (
      this.props.status != nextProps.status
    ) {

      console.log("Unequal");
      console.log(this.props.status + "|" + nextProps.status);
      var currentTime = new Date().getTime();
       if (nextProps.status == "pause" && (currentTime-this.state.init)>500){
         console.log("PauseVideo");
         //this.refs.ytPlayer.internalPlayer.pauseVideo();
       }
       this.setState({init: new Date().getTime()});
    }
  }

  render() {
    var startTime = this.props.started;
    var currentTime = new Date().getTime();
    var timecode = Math.round((currentTime - startTime) / 1000);

    console.log(this.refs.ytPlayer);
    if(this.refs.ytPlayer != undefined){
      if (this.props.status == "play") {
        this.refs.ytPlayer.internalPlayer.seekTo(timecode);
      } else {
        if (this.props.status == "pause"){
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
    var currentTime = new Date().getTime();
    console.log(currentTime-this.state.init);
    console.log("Player paused");
    if (this.props.status != "pause" && (currentTime-this.state.init)>500) {
      this.props.handleVideoPause(this.props.roomId, this.props.databaseId);
    }
    //   console.log(event);
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
    //console.log(event);
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
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
