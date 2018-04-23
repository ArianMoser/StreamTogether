import {
  Button,
  Container,
  Grid,
  Header,
  List,
  Menu,
  Responsive,
  Segment,
  Visibility
} from "semantic-ui-react";
import Link from "next/link";
import React, { Component } from "react";
import PropTypes from "prop-types";
import OwnHeader from "../components/Header";
import YouTubeSearch from "../components/YouTubeSearch";
import TopBox from "../components/TopBox";
import {
  changeRoomId,
  roomFunctionByHashedValue,
  videoFunctionByRoomId
} from "./PostMethods";
import { read_cookie, delete_cookie } from "sfcookies";

const jwt = require("jsonwebtoken");

export default class Room extends Component {
  constructor(props) {
    super(props);

    //default states
    this.state = {
      activeItem: "empty", //active item of the Navbar
      creator: "default-creator",
      description: "Default-description",
      id: "0",
      roomId: "0",
      title: "Default-title",
      userName: "",
      userlist: {},
      videos: []
    };
    this._updateUserRoomId = this._updateUserRoomId.bind(this);
    this._getInformation = this._getInformation.bind(this);
  }

  componentWillMount() {
    this._getInformation();
  }

  componentDidMount() {
    //this._updateUserRoomId();
  }

  componentDidUpdate(nextProps, nextState) {
    /*  if (nextState.videos != this.state.videos) {
      console.log("Rerendering");
      setTimeout(this.forceUpdate(), 200);
    } */
  }

  async _updateUserRoomId() {
    console.log("Update current room of current user");

    const user = await this.checksession(); // gets the username of current user
    this.setState({
      userName: user
    });
    const roomId = this.state.roomId;

    //console.log("Username: " + user);
    // console.log("roomId:   " + roomId);

    const responseUpdate = await changeRoomId(
      "/updateUserRoomId",
      user,
      roomId
    );
    /*console.log(
      "Reg. Complete | Affected Rows: " + responseUpdate.affectedRows
    );*/
    if (responseUpdate.affectedRows == "1") {
      console.log("Changed current room of active user ");
    } else {
      console.log("Couldnt change current room of active user");
    }
  }

  async _getInformation() {
    var title = "Test-title";

    //reads hashedValue from the given url query
    var hashedValue = this.props.url.query.hv;
    console.log("Found hashedValue :" + hashedValue);

    console.log("Tries to receive room information of the database");
    // trys to receive more room information from the database
    const responseRoomInformation = await roomFunctionByHashedValue(
      "/selectRoomInformation",
      hashedValue
    );
    // console.log("Reg. Complete | Count : " + responseRoomInformation.length);

    //check if db push succeded
    if (responseRoomInformation.length == "1") {
      console.log("Request for more room information succeded");
      /*console.log(responseRoomInformation);
      console.log("RoomId:      " + responseRoomInformation[0].ID);
      console.log("Title:       " + responseRoomInformation[0].title);
      console.log("Ersteller:   " + responseRoomInformation[0].Ersteller);
      console.log("Description: " + responseRoomInformation[0].description); */
      // get videos of room
      var videos = await this._getVideos(responseRoomInformation[0].ID);
      this.setState({
        videos: videos
      });
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
      // exception during receiving room information
      // todo: add dialog
      console.log("Cant receive room information from the database");
    }
  }

  async _getVideos(roomId) {
    // get videos of room
    console.log("Get videos of room");
    const responseVideos = await videoFunctionByRoomId(
      "/selectVideosByRoomId",
      roomId
    );
    return responseVideos;
  }

  // reads the username out of the cookie
  checksession() {
    if (read_cookie("StreamTogether").length != 0) {
      try {
        var decodedsession = jwt.verify(
          read_cookie("StreamTogether"),
          "shhhhh"
        );
        return decodedsession.username;
      } catch (err) {
        console.log("Error-Message: " + err.message);
        return "ErrorTokenFalse";
      }
    } else {
      return "ErrorTokenFalse";
    }
  }

  render() {
    const activeItem = this.state.activeItem;
    const title = this.state.title;
    const description = this.state.description;
    const videos = this.state.videos;
    
    console.log("UserName:" + this.state.userName);
    console.log("roomId:" + this.state.roomId);

    return (
      <OwnHeader>
        <TopBox activeItem={activeItem} layer1={title} layer2={description} />
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <List divided verticalAlign="middle">
              <YouTubeSearch
                creator={this.state.creator}
                getVideos={roomId => this._getVideos(roomId)}
                roomId={this.state.roomId}
                userName={
                  this.state.userName != undefined ? this.state.userName : ""
                }
                videos={videos}
              />
            </List>
          </Grid>
        </Segment>
      </OwnHeader>
    );
  }
}
