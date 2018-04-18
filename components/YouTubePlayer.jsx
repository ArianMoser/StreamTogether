import { Component } from 'react';

class YouTubePlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <iframe width="100%" height="400px"src={"https://www.youtube.com/embed/" + this.props.videoId +
        "?amp;showinfo=0&amp;start=" + this.props.timecode } frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen"></iframe>
      </div>
    );
  }
}

export default YouTubePlayer;
