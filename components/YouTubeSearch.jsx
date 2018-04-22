import React, { Component } from "react";
import axios from "axios";
import YouTubePlayer from "../components/YouTubePlayer";
import MyButton from "../components/Button";
import { List, Button, Icon, Input, Grid, Table } from "semantic-ui-react";
import VideoElement from "../components/videoElement";

const API_KEY = "AIzaSyCkXsSdyK3kKmUYEe9T9wf6AUli3V6Nzus";

class YouTubeSearch extends Component {
  constructor(props) {
    super(props);

    // Set initial state
    this.state = {
      chosenVideoId: "",
      chosenVideoTimecode: 0,
      nextPageToken: "",
      query: "",
      searchResults: [],
      videos: []
    };

    // Bind event handlers
    this._updateQuery = this._updateQuery.bind(this);
    this._searchVideos = this._searchVideos.bind(this);
    this._loadMore = this._loadMore.bind(this);
    this._chooseVideo = this._chooseVideo.bind(this);
  }

  static get defaultProps() {
    return {
      chosenVideoId: "",
      chosenVideoTimecode: 0,
      videos: []
    };
  }

  componentWillMount() {
    console.log(this.state);
    this.setState({
      chosenVideoId: this.props.chosenVideoId,
      chosenVideoTimecode: this.props.chosenVideoTimecode,
      videos: this.props.videos
    });
  }

  componentDidUpdate(nextProps, nextState) {
    /*  console.log("Component Update (YouTubeSearch)");
    console.log(nextProps);
    console.log(this.props);
    console.log("Length videos" + nextProps.videos.length); */
    if (
      nextProps.videos.length != this.props.videos.length &&
      this.props.videos[0] != undefined
    ) {
      // console.log("Changing state");
      this.setState({
        chosenVideoId: this.props.videos[0].youtube_id,
        videos: nextProps.videos
      });
    }
  }

  /**
   * Update the internal component state's search query field.
   * @param  {Event} e onChange event
   */
  _updateQuery(e) {
    //  console.log(e);
    this.setState({
      query: e.target.value
    });
  }

  /**
   * Search the YouTube API for videos that match the query that is saved in the
   * component's internal state.
   */
  _searchVideos() {
    this.searchAPI(
      {
        key: API_KEY,
        q: this.state.query,
        maxResults: 5
      },
      response => {
        this.setState({
          searchResults: response.items,
          nextPageToken: response.nextPageToken
        });
      }
    );
  }

  /**
   * Use the nextPageToken that is stored in the component's internal state to
   * load the next page of search results.
   */
  _loadMore() {
    this.searchAPI(
      {
        key: API_KEY,
        q: this.state.query,
        maxResults: 5,
        pageToken: this.state.nextPageToken
      },
      response => {
        this.setState({
          searchResults: [...this.state.searchResults, ...response.items],
          nextPageToken: response.nextPageToken
        });
      }
    );
  }

  _chooseVideo(video) {
    var channelName = video.snippet.channelTitle;
    var channelId = video.snippet.channelId;
    var videoDescription = video.snippet.description;
    var videoThumbnailUrl = video.snippet.thumbnails.default.url;
    var videoTitle = video.snippet.title;
    var videoId = video.id.videoId;

    var videoList = this.state.videos.slice();
    var video = {
      videoTitle: videoTitle,
      videoDescription: videoDescription,
      videoId: videoId,
      videoThumbnailUrl: videoThumbnailUrl,
      channelId: channelId,
      channelName: channelName
    };
    videoList.push(video);

    this.setState({
      videos: videoList
    });
    /*console.log("Choosen Video:");
    console.log(video);
    console.log("Video-title:       " + videoTitle);
    console.log("Video-description: " + videoDescription);
    console.log("Video-id:          " + videoId);
    console.log("Video-Thumbnail:   " + videoThumbnailUrl);
    console.log("Channel-id:        " + channelId);
    console.log("Channel-Name:      " + channelName);
*/
    this.setState({
      chosenVideoId: videoId
    });
  }

  /**
   * Contact the YouTube API to perform a search.
   * @param  {Object}   options  Options that will be passed to the YouTube API
   * @param  {Function} callback Function that should be invoked if a search was
   *                             successful
   */
  searchAPI(options, callback) {
    var params = {
      part: "snippet",
      type: "video"
    };
    params = { ...params, ...options };

    axios
      .get("https://www.googleapis.com/youtube/v3/search", { params: params })
      .then(function(response) {
        console.log(response.data);
        callback(response.data);
      })
      .catch(function(error) {
        //console.error(error);
      });
  }

  render() {
    console.log(this.state.videos);
    if (this.state.videos[0] != undefined) {
      var playlist = this.state.videos.map(video => {
        return <VideoElement
              channelId={video.channelId}
              channelName={video.channelName}
              videoDescription={video.videoDescription}
              videoId={video.videoId}
              videoThumbnailUrl={video.videoThumbnailUrl}
              videoTitle={video.videoTitle}
          />;
      });
    } else {
      var playlist = <VideoElement />;
    }
    console.log(playlist);

    // Prepare list of all videos that were returned by the YouTube API
    var videoList = this.state.searchResults.map(video => {
      //<img src={"https://img.youtube.com/vi/" + video.id.videoId + "/default.jpg"} height="100px"></img>      {video.snippet.title} - {video.id.videoId}
      return (
        <Table.Row>
          <Table.Cell>
            {" "}
            <img
              src={
                "https://img.youtube.com/vi/" +
                video.id.videoId +
                "/default.jpg"
              }
              height="100px"
            />{" "}
          </Table.Cell>
          <Table.Cell>{video.snippet.title}</Table.Cell>
          <Table.Cell width={3}>
            <MyButton />
          </Table.Cell>
          <Table.Cell width={3}>
            <Button
              icon
              color="red"
              onClick={() => {
                this._chooseVideo(video);
              }}
            >
              <Icon name="youtube" />
              <Icon name="play" />
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    });

    if (
      this.state.chosenVideoId == "" ||
      this.state.chosenVideoId === undefined
    ) {
      var videoPlayer = <h2>Noch kein Video ausgewählt.</h2>;
    } else {
      console.log("Load Video");
      var currentVideo = this.state.chosenVideoId;
      console.log(this.state.videos);
      var videoPlayer = <YouTubePlayer videoId={currentVideo} timecode="0" />;
    }

    if (this.state.searchResults.length > 0)
      var nextPageButton = (
        <Button icon labelPosition="right" onClick={this._loadMore}>
          <Icon name="chevron right" />More
        </Button>
      );
    else var nextPageButton = <List.Item>Please search for a video.</List.Item>;

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {videoPlayer}
              <Grid>
                <Grid.Row>
                  <Input
                    icon="youtube"
                    iconPosition="left"
                    placeholder="Search for videos..."
                    type="text"
                    onChange={this._updateQuery}
                    value={this.state.query}
                  />
                  <Button
                    icon
                    labelPosition="right"
                    floated="right"
                    onClick={this._searchVideos}
                  >
                    <Icon name="right arrow" />Search
                  </Button>
                </Grid.Row>
              </Grid>
              <Table basic="very" celled collapsing>
                <Table.Body>{videoList}</Table.Body>
                {nextPageButton}
              </Table>
            </Grid.Column>
            <Grid.Column width={6}>
              <Table basic="very" celled collapsing>
                <Table.Body>{playlist}</Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default YouTubeSearch;
