import React, { Component } from 'react';
import axios from 'axios';
import YouTubePlayer from '../components/YouTubePlayer';

const API_KEY = "AIzaSyCkXsSdyK3kKmUYEe9T9wf6AUli3V6Nzus";

class YouTubeSearch extends Component {
  constructor(props) {
    super(props);

    // Set initial state
    this.state = {
      query: "",
      searchResults: [],
      nextPageToken: "",
      chosenVideoId: "",
      chosenVideoTimecode: 0
    }

    // Bind event handlers
    this._updateQuery = this._updateQuery.bind(this);
    this._searchVideos = this._searchVideos.bind(this);
    this._loadMore = this._loadMore.bind(this);
    this._chooseVideo = this._chooseVideo.bind(this);
  }

  /**
   * Update the internal component state's search query field.
   * @param  {Event} e onChange event
   */
  _updateQuery(e) {
    console.log(e);
    this.setState({
      query: e.target.value
    });
  }

  /**
   * Search the YouTube API for videos that match the query that is saved in the
   * component's internal state.
   */
  _searchVideos() {
    this.searchAPI({
      key: API_KEY,
      q: this.state.query,
      maxResults: 25
    }, (response) => {
      this.setState({
        searchResults: response.items,
        nextPageToken: response.nextPageToken
       });
      console.log(videos);
    });
  }

  /**
   * Use the nextPageToken that is stored in the component's internal state to
   * load the next page of search results.
   */
  _loadMore() {
    this.searchAPI({
      key: API_KEY,
      q: this.state.query,
      maxResults: 25,
      pageToken: this.state.nextPageToken
    }, (response) => {
      this.setState({
        searchResults: [...this.state.searchResults, ...response.items],
        nextPageToken: response.nextPageToken
       });
    });
  }

  _chooseVideo(videoId) {
    this.setState({
      chosenVideoId: videoId
    })
  }

  /**
   * Contact the YouTube API to perform a search.
   * @param  {Object}   options  Options that will be passed to the YouTube API
   * @param  {Function} callback Function that should be invoked if a search was
   *                             successful
   */
  searchAPI(options, callback) {
    var params = {
      part: 'snippet',
      type: 'video',
    };
    params = {...params, ...options};

    axios.get('https://www.googleapis.com/youtube/v3/search', { params: params })
      .then(function(response) {
        console.log(response.data);
        callback(response.data);
      })
      .catch(function(error) {
        console.error(error);
    });
  }

  render() {
    // Prepare list of all videos that were returned by the YouTube API
    var videoList = this.state.searchResults.map(video => {
      //<img src={"https://img.youtube.com/vi/" + video.id.videoId + "/default.jpg"} height="100px"></img>
      return <li>{video.snippet.title} - {video.id.videoId}<button onClick={ () => { this._chooseVideo(video.id.videoId) } }>Choose Video</button></li>;
    });

    if(this.state.chosenVideoId == 0)
      var videoPlayer = (<h2>Noch kein Video ausgewählt.</h2>);
    else
      var videoPlayer = (<YouTubePlayer videoId={ this.state.chosenVideoId } timecode={ this.state.chosenVideoTimecode }></YouTubePlayer>)

    if(this.state.searchResults.length > 0)
      var nextPageButton = (<button onClick={ this._loadMore }>Load more</button>);
    else
      var nextPageButton = (<button onClick={ this._loadMore } disabled>Load more</button>);

    return(
      <div>
        { videoPlayer }

        <button onClick={ this._searchVideos }>Search</button>
        <input type="text" onChange={ this._updateQuery } value={ this.state.query } />

        <ul>
          { videoList }
        </ul>
        { nextPageButton }
      </div>
    );
  }
}

export default YouTubeSearch;
