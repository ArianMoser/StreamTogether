import {
  Button,
  Container,
  Grid,
  Header,
  List,
  Icon,
  Input,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Table,
  Visibility
} from "semantic-ui-react";
import Link from "next/link";
import React, { Component } from "react";
import PropTypes from "prop-types";
import OwnHeader from "../components/Header";
import YouTubeSearch from "../components/YouTubeSearch";
import TopBox from "../components/TopBox";
import {
  alterRoomEvent,
  changeRoomId,
  connectVideoAndRoom,
  deletePlaylist,
  dropUserEvent,
  insertVideo,
  registerFunction,
  roomFunctionByHashedValue,
  updateStarted,
  updateStatus,
  userFunctionByUsername,
  videoFunctionByRoomId,
  videoFunctionByYoutubeId,
  voteVideo
} from "./PostMethods";
import { checksession } from "../components/Util";
import Chat from "../components/Chat";
import YouTubePlayer from "../components/YouTubePlayer";
import VideoElement from "../components/VideoElement";
import { CopyToClipboard } from "react-copy-to-clipboard";
import openSocket from "socket.io-client";
import { getAdjective, getNoun } from "../components/Words";
import { bake_cookie } from "sfcookies";
const socket = openSocket("http://localhost:8000");

const divStyle = {
  color: "blue",
  backgroundImage: "url(../pics/download.jpg)"
};

const scroll = {
  maxHeight: 400,
  maxWidth: 1000,
  overflow: scroll
};

const jwt = require("jsonwebtoken");

export default class Room extends Component {
  constructor(props) {
    super(props);
    //default states
    this.state = {
      activeItem: "empty", //active item of the Navbar
      creator: "default-creator",
      description: "Default-description",
      roomId: "0",
      title: "Default-title",
      userName: "",
      videos: [],
      urlForInvite: "",
      copied: false
    };
  }

  //-------------------------functions of react----------------------------//
  componentWillMount() {}

  componentDidMount() {
    this._getInformation();
    //this._updateUserRoomId();
    this.state.urlForInvite = window.location.href;
    console.log("url:" + this.state.urlForInvite);
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      nextState.videos.length != this.state.videos.length &&
      this.state.videos[0] != undefined
    ) {
      // console.log("Changing state");
      this.setState({
        videos: nextState.videos
      });
    }
  }

  //----------------------functions------------------------------//
  // updates the active room of the current user in the user table
  async _updateUserRoomId() {
    console.log("Update current room of current user");

    var user = await checksession(); // gets the username of current user
    console.log("user:" + user);
    if (user == undefined || user == "ErrorTokenFalse") {
      var responseSelectUsername = "";
      do {
        user = this.generateUserName();
        console.log("user: " + user);
        responseSelectUsername = await userFunctionByUsername(
          "/getuserbyusername",
          user
        );
      } while (responseSelectUsername.length == "1");
      const responseRegister = await registerFunction(
        "/register",
        user,
        "temporary@user.net",
        ""
      );
      responseSelectUsername = await userFunctionByUsername(
        "/getuserbyusername",
        user
      );
      if (
        responseRegister.affectedRows == "1" &&
        responseSelectUsername.length == "1"
      ) {
        // get user id
        console.log(responseSelectUsername);
        var userId = responseSelectUsername[0].ID;
        // create drop event
        const responseDropUserEvent = await dropUserEvent(
          "/createEventDropUser",
          userId
        );

        console.log("sessiontoken will be set");
        console.log(user);

        var sessiontoken = jwt.sign(
          {
            username: user,
            tempuser: "yes",
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
          },
          "shhhhh"
        );
        console.log(sessiontoken);
        bake_cookie("StreamTogether", sessiontoken);
      } else {
        console.log("sessiontoken wont be set");
        window.location = "/roomOverview";
      }
    } //end of if

    this.setState({
      userName: user
    });
    const roomId = this.state.roomId;
    const responseUpdate = await changeRoomId(
      "/updateUserRoomId",
      user,
      roomId
    );
    if (responseUpdate.affectedRows == "1") {
      console.log("Changed current room of active user ");
    } else {
      console.log("Couldnt change current room of active user");
    }
  } // end of _updateUserRoomId

  // gets room information
  async _getInformation() {
    var title = "Test-title";

    //reads hashedValue from the given url query
    var hashedValue = this.props.url.query.hv;
    console.log("Found hashedValue :" + hashedValue);
    this.setState({ hv: hashedValue });
    console.log("Tries to receive room information of the database");
    // trys to receive more room information from the database
    const responseRoomInformation = await roomFunctionByHashedValue(
      "/selectRoomInformation",
      hashedValue
    );

    //check if db push succeded
    if (responseRoomInformation.length == "1") {
      console.log("Request for more room information succeded");
      // get videos of room
      var videos = await this._getVideos(responseRoomInformation[0].ID);
      // saves the received room information
      this.setState({
        creator: responseRoomInformation[0].Ersteller,
        description: responseRoomInformation[0].description,
        roomId: responseRoomInformation[0].ID,
        title: responseRoomInformation[0].title,
        videos: videos
      });
      // updates the roomId of current user
      this._updateUserRoomId();
    } else {
      window.location = "/roomOverview";
      // exception during receiving room information
      // todo: add dialog
      console.log("Cant receive room information from the database");
    }
  } //end of function _getInformation()

  // get videos of the room
  async _getVideos(roomId) {
    // get videos of room
    //console.log("Get videos of room");
    const responseVideos = await videoFunctionByRoomId(
      "/selectVideosByRoomId",
      roomId
    );
    return responseVideos;
  }

  // sets videos of the room
  async refreshVideos(roomId) {
    //  console.log(roomId);
    var videos = await this._getVideos(roomId);
    //console.log(videos);
    this.setState({ videos: videos });
  } // end of refreshVideos

  // is called, if you chose a video,
  // -> pushs the video into the database
  // -> creates connection between the video and the room (table playlist)
  async _chooseVideo(video) {
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

    console.log("Start pushing video to database");
    //check if video is already inside of the database
    var databaseId = await this._getDatabaseId(videoId);
    if (databaseId == 0) {
      // push video into database
      const responseVideoInsertion = await insertVideo(
        "/createVideo",
        videoId,
        videoTitle,
        videoDescription,
        videoThumbnailUrl,
        channelId,
        channelName,
        this.state.userName
      );
      if (responseVideoInsertion.affectedRows == "1") {
        console.log("Video inserted succesfully");
        // Now get the database-id to connect room and video inside of playlist
        databaseId = await this._getDatabaseId(videoId);
      } else {
        console.log("Couldnt insert Video into database");
        return false;
      } //end of else
    } else {
      // Video is already in the database
      console.log("Video is already in the database");
    } // end of else
    // connect room and video
    const responsePlaylistInsertion = await connectVideoAndRoom(
      "/createPlaylist",
      databaseId,
      this.state.roomId
    );
    if (responsePlaylistInsertion.affectedRows == "1") {
      console.log("Created connection between video and room");
    } else {
      console.log("Couldnt create connection between video and room");
    }
    var videos = await this._getVideos(this.state.roomId);
    // alters the delete room event
    this._alterDeleteEvent(this.state.roomId);
    console.log("Videos");
    console.log(videos);

    this.setState({
      videos: videos
    });
  }

  // alters the deletion event of the room
  async _alterDeleteEvent(roomId) {
    console.log("Alter room event");
    if (roomId != 0 && roomId != undefined) {
      const responseAlterEvent = await alterRoomEvent(
        "/updateDeleteEvent",
        roomId
      );
      console.log(responseAlterEvent);
    }
  }

  // gets called, if the video is connectVideoAndRoom
  // deletes connection between video and room (playlist table)
  // alters the delete event for the room
  async _nextVideo(roomId, videoId) {
    console.log("Next Video");
    this._deleteVideo(roomId, videoId);
    this._alterDeleteEvent(roomId);
  }

  // votes for the video (inside of the playlist table)
  async _voteVideo(roomId, databaseId, voteValue) {
    console.log("Vote video");
    const responseVoteVideo = await voteVideo(
      "/updateUpVotes",
      roomId,
      databaseId,
      voteValue
    );
    if (responseVoteVideo.affectedRows == "1") {
      console.log("Video voted");
      var videos = await this._getVideos(roomId);
      this.setState({
        videos: videos
      });
    } else {
      console.log("Error during voting process");
    }
  }

  // deletes connection between video and room (playlist table)
  async _deleteVideo(roomId, videoId) {
    console.log("Delete Video");
    const responseDeleteVideo = await deletePlaylist(
      "/deletePlaylist",
      roomId,
      videoId
    );
    if (responseDeleteVideo.affectedRows == "1") {
      console.log("Deleted Video in table playlist");
      var videos = await this._getVideos(this.state.roomId);
      this.setState({
        videos: videos
      });
    } else {
      console.log("Error during deleting process of video");
    }
  }

  // checks, if the video is already in the database
  // if yes -> returns the databaseId of the video
  async _getDatabaseId(youtubeId) {
    const responseDatabaseId = await videoFunctionByYoutubeId(
      "/selectVideoByYoutubeId",
      youtubeId
    );
    if (responseDatabaseId.length == "1") {
      console.log("Found a data set");
      return responseDatabaseId[0].ID;
    } else {
      if (responseDatabaseId.length == "0") {
        console.log("Couldnt find any dataset");
        return 0;
      } else {
        console.log("Found multiple datasets. Working with default (0)");
        return responseDatabaseId[0].ID;
      }
    }
  }

  // updates the started attribute of a video inside of the table Playlist
  async _updateStarted(roomId, videoId, started, status) {
    console.log("Update started");
    const responseUpdateStarted = await updateStarted(
      "/updatePlaylistStarted",
      roomId,
      videoId,
      started,
      status
    );
    if (responseUpdateStarted.affectedRows == "1") {
      console.log("Updated started value");
      return true;
    } else {
      console.log("Error during update process(started)");
      return false;
    }
  }

  // updates the status of the videos
  async _updateStatus(roomId, videoId, status) {
    console.log("Update started");
    const responseUpdateStatus = await updateStatus(
      "/updatePlaylistStatus",
      roomId,
      videoId,
      status
    );
    if (responseUpdateStatus.affectedRows == "1") {
      console.log("Updated status value");
      return true;
    } else {
      console.log("Error during update process(started)");
      return false;
    }
  }

  //handles the pause event
  async handlePlayerPause(roomId, videoId) {
    console.log("******Player will paused on the room");
    var res = await this._updateStatus(roomId, videoId, "pause");
    if (res == true) {
      // trigger socket call //this.props.url.query.hv

      socket.emit("triggerRefresh", {
        content: " has stoped the video",
        username: this.state.userName
      });
    }
  }

  // handles the play event
  async handlePlayerPlay(roomId, videoId, timecode) {
    console.log("************Player will started on the room");
    var res = await this._updateStarted(roomId, videoId, timecode, "play");
    if (res == true) {
      // trigger socket call
      socket.emit("triggerRefresh", {
        content: " has continued the video",
        username: this.state.userName
      });
    }
  }

  generateUserName() {
    return (
      getAdjective(Math.round(Math.random() * 58)) +
      getNoun(Math.round(Math.random() * 49)) +
      Math.round(Math.random() * 100).toString()
    );
  }

  clearCopyMessage() {
    document.getElementById("copied").innerHTML =
      "You copied the room adress. Invite a friend!";
    setTimeout(function() {
      document.getElementById("copied").innerHTML = "";
    }, 2000);
  }

  //----------------------------------Render-------------------------------//
  render() {
    const activeItem = this.state.activeItem;
    const title = this.state.title;
    const description = this.state.description;
    //default values
    var videoPlayer = <h2>Noch kein Video ausgewählt.</h2>;
    var playlist = <div />;
    // loads the videoPlayer
    console.log("Loads videoPlayer");
    //  console.log("UrlForInvite:" + this.state.urlForInvite);
    var videos = this.state.videos;
    if (videos[0] != undefined) {
      var video = videos[0];
      var started = "0";
      var status = "play";
      console.log(video);
      //check if started is
      if (video.started == 0) {
        // videoId: video_ID
        // roomId: room_ID
        // set started to current Timestamp
        started = new Date().getTime();
        console.log(started);
        this._updateStarted(
          video.room_ID,
          video.video_ID,
          Math.round(started),
          status
        );
      } else {
        // set timecode
        started = video.started;
        status = video.status;
        /*console.log(currentTime);
        timecode = Math.round((currentTime-startTime)/1000);
        console.log(timecode);*/
      }
      var videoPlayer = (
        <YouTubePlayer
          databaseId={videos[0].video_ID}
          handleVideoEnd={(roomId, videoId) => this._nextVideo(roomId, videoId)}
          handleVideoPlay={(roomId, videoId, timecode) =>
            this.handlePlayerPlay(roomId, videoId, timecode)
          }
          handleVideoPause={(roomId, videoId) =>
            this.handlePlayerPause(roomId, videoId)
          }
          started={started}
          status={status}
          roomId={videos[0].room_ID}
          videoId={videos[0].youtube_id}
        />
      );
      // loads the playlist
      console.log("Loads the playlist");
      playlist = videos.map(video => {
        return (
          <VideoElement
            channelId={video.channel_id}
            channelName={video.channel_name}
            databaseId={video.video_ID}
            handleDelete={(roomId, databaseId) =>
              this._deleteVideo(roomId, databaseId)
            }
            handleVote={(roomId, databaseId, voteValue) =>
              this._voteVideo(roomId, databaseId, voteValue)
            }
            roomId={video.room_ID}
            videoDescription={video.description}
            videoId={video.youtube_id}
            videoThumbnailUrl={video.thumbnail_url}
            videoTitle={video.title}
          />
        );
      }); //  end of iteration over videos
    } // end of if

    return (
      <OwnHeader>
        <TopBox activeItem={activeItem} layer1={title} layer2={description} />
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <List divided verticalAlign="middle">
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={10}>
                      {videoPlayer}
                      <Header as="h2">Search</Header>
                      <YouTubeSearch
                        creator={this.state.creator}
                        getVideos={roomId => this._getVideos(roomId)}
                        chooseVideo={video => this._chooseVideo(video)}
                        roomId={this.state.roomId}
                        userName={
                          this.state.userName != undefined
                            ? this.state.userName
                            : ""
                        }
                        videos={videos}
                      />
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <Grid.Row>
                        <Header as="h2">Playlist</Header>
                        <Sidebar.Pushable as={Segment} style={scroll}>
                          <Table
                            basic="very"
                            celled
                            collapsing
                            style={{ width: 400 }}
                          >
                            <Table.Body>{playlist}</Table.Body>
                          </Table>
                        </Sidebar.Pushable>
                      </Grid.Row>
                      <Grid.Row>
                        <Chat
                          handleVideoCommand={roomId =>
                            this.refreshVideos(roomId)
                          }
                          hv={this.state.hv}
                          roomId={this.state.roomId}
                          username={this.state.userName}
                        />
                      </Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                  <CopyToClipboard
                    text={this.state.urlForInvite}
                    onCopy={() => this.setState({ copied: true })}
                  >
                    <Button primary onClick={this.clearCopyMessage}>
                      Invite friend
                    </Button>
                  </CopyToClipboard>
                  <div id="copied" />
                </Grid>
              </List>
            </Grid.Row>
          </Grid>
        </Segment>
      </OwnHeader>
    );
  }
}
