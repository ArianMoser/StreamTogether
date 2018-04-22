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
  roomFunctionByHashedValue,
  changeRoomId,
  videoFunctionByRoomId
} from "./PostMethods";
import { read_cookie, delete_cookie } from "sfcookies";

const jwt = require("jsonwebtoken");

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: []
    };
    this._updateUserRoomId = this._updateUserRoomId.bind(this);
    this._getInformation = this._getInformation.bind(this);
  }

  static get defaultProps() {
    return {
      activeItem: "empty", //active item of the Navbar
      userName: "",
      creator: "default-creator",
      description: "Default-description",
      id: "0",
      roomId: "0",
      title: "Default-title",
      userlist: {}
    };
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

    const user = await this.checksession();
    this.setState({
      userName: ""
    });
    const roomId = this.state.roomId;

    console.log("Username: " + user);
    console.log("roomId:   " + roomId);

    const responseUpdate = await changeRoomId(
      "/updateUserRoomId",
      user,
      roomId
    );
    console.log(
      "Reg. Complete | Affected Rows: " + responseUpdate.affectedRows
    );
    if (responseUpdate.affectedRows == "1") {
      console.log("DB push succeded");
    } else {
      console.log("DB push failed");
    }
  }

  async _getInformation() {
    var title = "Test-title";
    var hashedValue = this.props.url.query.hv;
    console.log("Tries to receive room information of the database");
    console.log("hashedValue :" + hashedValue);

    const responseRoomInformation = await roomFunctionByHashedValue(
      "/selectRoomInformation",
      hashedValue
    );
    console.log("Reg. Complete | Count : " + responseRoomInformation.length);
    //check if db push succeded
    if (responseRoomInformation.length == "1") {
      console.log("DB push succeeded");
      console.log(responseRoomInformation);
      console.log("RoomId:      " + responseRoomInformation[0].ID);
      console.log("Title:       " + responseRoomInformation[0].title);
      console.log("Ersteller:   " + responseRoomInformation[0].Ersteller);
      console.log("Description: " + responseRoomInformation[0].description);
      this.setState({
        roomId: responseRoomInformation[0].ID,
        title: responseRoomInformation[0].title,
        creator: responseRoomInformation[0].Ersteller,
        description: responseRoomInformation[0].description
      });
      this._updateUserRoomId();

      // get videos of room
      console.log("Get videos of room");
      const responseVideos = await videoFunctionByRoomId(
        "/selectVideosByRoomId",
        responseRoomInformation[0].ID
      );
      console.log(responseVideos);
      this.setState({
        videos: responseVideos
      });
    } else {
      // exception during room creation db push
      // todo: add dialog
      console.log("DB push failed");
      this.setState({
        roomId: this.props.id,
        title: this.props.title,
        creator: this.props.creator,
        description: this.props.description
      });
    }
  }

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
    const activeItem = this.props.activeItem;
    const title = this.state.title;
    const description = this.state.description;
    const videos = this.state.videos;
    const choosenVideoId =
      videos.length != "0" || videos[0] != undefined
        ? videos[0].youtube_id
        : "";
    return (
      <OwnHeader>
        <TopBox activeItem={activeItem} layer1={title} layer2={description} />
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <List divided verticalAlign="middle">
              <YouTubeSearch videos={videos} chosenVideoId={choosenVideoId} />
            </List>
          </Grid>
        </Segment>
      </OwnHeader>
    );
  }
}
