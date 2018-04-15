import { Component } from 'react';

class YouTubePlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + this.props.videoId +
        "?amp;showinfo=0&amp;start=" + this.props.timecode + "allowfullscreen"} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
    );
  }
}

export default YouTubePlayer;
