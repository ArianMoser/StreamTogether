import React, { Component } from "react";
import axios from "axios";
import MyButton from "../components/Button";
import { List, Button, Icon, Input, Grid, Table } from "semantic-ui-react";
import PropTypes from "prop-types";

const API_KEY = "AIzaSyCkXsSdyK3kKmUYEe9T9wf6AUli3V6Nzus";

class YouTubeSearch extends Component {
  constructor(props) {
    super(props);

    // Set initial state
    this.state = {
      nextPageToken: "",
      query: "",
      searchResults: []
    };

    // Bind event handlers
    this._updateQuery = this._updateQuery.bind(this);
    this._searchVideos = this._searchVideos.bind(this);
    this._loadMore = this._loadMore.bind(this);
    this._chooseVideo = this._chooseVideo.bind(this);
  }

  static get defaultProps() {
    return {
      creator: 0,
      roomId: 0,
      userName: ""
    };
  }

  static propTypes = {
    creator: PropTypes.number,
    roomId: PropTypes.number,
    userName: PropTypes.string
  };

  componentDidMount() {
    this.setState({
      creator: this.props.creator,
      roomId: this.props.roomId,
      userName: this.props.userName
    });
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

  _chooseVideo(video) {
    this.props.chooseVideo(video);
    this.setState({
      searchResults: [] //resets youtube search results
    });
  }

  //--------------------------------Render----------------------------------//
  render() {
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
      </div>
    );
  }
}

export default YouTubeSearch;
