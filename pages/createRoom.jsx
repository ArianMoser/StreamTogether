import OwnHeader from "../components/Header";
import Link from "next/link";
import React, { Component } from "react";
import $ from "jquery";
import {
  createRoomFunction,
  dropRoomEvent,
  roomFunctionByTitle,
  userFunctionByUsername
} from "./PostMethods";
import TopBox from "../components/TopBox";
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Message,
  Segment,
  Visibility
} from "semantic-ui-react";
import { read_cookie } from "sfcookies";
const jwt = require("jsonwebtoken");

export default class RoomCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "empty",
      checkPassword: false,
      currentUser: "",
      description: "",
      password: "",
      title: ""
    };

    //bind event handlers
    this._handleDescriptionChange = this._handleDescriptionChange.bind(this);
    this._handleTitleChange = this._handleTitleChange.bind(this);
    this._handlePasswordChangeCheck = this._handlePasswordChangeCheck.bind(
      this
    );
    this._handlePasswordChange = this._handlePasswordChange.bind(this);
    this._handleRoomCreation = this._handleRoomCreation.bind(this);
  }

  //-------------------------functions of react----------------------------//
  componentDidMount() {
    var currentUsername = this.checksession();
    console.log("Username: " + currentUsername);
    var currentUserId = this._getUserId(currentUsername);
  }

  //----------------------------event handlers---------------------------//
  _handleDescriptionChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  _handleTitleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  _handlePasswordChangeCheck(event) {
    this.setState({
      checkPassword: !this.state.checkPassword
    });
  }

  _handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  // creates a room
  async _handleRoomCreation(event) {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const checkPassword = this.state.checkPassword;
    const currentUser = this.state.currentUser;
    var password = this.state.password;

    if (password == undefined || !checkPassword) {
      password = "";
    } else {
      password = this.state.password;
    }

    console.log(
      "Title: " +
        title +
        "| description: " +
        description +
        "| checkPassword: " +
        checkPassword +
        "| password: " +
        password +
        "| currentUser: " +
        currentUser
    );

    // pattern for the input fields
    //var titleExpression = /^[A-Za-z0-9_]{3,32}$/;
    // var pwExpression = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    //Check Regex Statements
    /*if (
      titleExpression.test(title) &&
      (pwExpression.test(password) || !checkPassword || true)
    )*/
    if (password != undefined && password != "" || !checkPassword) {
      console.log("Testpattern succeded");
      const responseSelectTitle = await roomFunctionByTitle(
        "/selectRoomByTitle",
        title
      );
      console.log(
        "Number of entries in the database with roomtitle '" +
          title +
          "' :" +
          responseSelectTitle.length
      );
      //check if title is already used
      if (responseSelectTitle.length == "0") {
        // send the room information to the database
        const responseRoomCreation = await createRoomFunction(
          "/createRoom",
          title,
          description,
          password,
          currentUser
        );
        console.log(
          "Reg. Complete | Affected Rows: " + responseRoomCreation.affectedRows
        );
        //check if db push succeded
        if (responseRoomCreation.affectedRows == "1") {
          console.log("DB push succeeded");

          //get the link to the room
          console.log("Get the hashed value to reach the room");
          const responseGetHashedValue = await roomFunctionByTitle(
            "/selectRoomByTitle",
            title
          );
          console.log(
            "Number of entries in the database with roomtitle '" +
              title +
              "' :" +
              responseGetHashedValue.length
          );
          console.log(responseGetHashedValue);
          var hashedValue = responseGetHashedValue[0].hashedValue;
          var roomid = responseGetHashedValue[0].ID;
          // create DropEvent
          const responseDropRoomEvent = await dropRoomEvent(
            "createEventDropRoom",
            roomid
          );
          console.log(responseDropRoomEvent);
          if (responseDropRoomEvent.serverStatus == "2") {
            console.log("The drop event was scheduled in 1 hour");
          } else {
            console.log("Error during the event creation process");
          }
          window.location = "./room?hv=" + hashedValue;
        } else {
          // exception during room creation db push
          // todo: add dialog
          console.log("DB push failed");
        }
      } else {
        console.log("A room with this title already exists");
      }
    } else {
      console.log("Testpattern failed");
    }
  }
  //----------------------functions------------------------------//
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

  // gets the username by an id
  async _getUserId(username) {
    console.log("Passed username: " + username);
    const response = await userFunctionByUsername(
      "/getuserbyusername",
      username
    );
    console.log(response);
    if (response.length == "1") {
      var currentUserId = response[0].ID;
      console.log("Found id " + currentUserId);
    } else {
      console.log("Could not resolve username into id");
      var currentUserId = "0";
    }
    this.setState({
      currentUser: currentUserId
    });
  }

  //----------------------------------Render-------------------------------//
  render() {
    const activeItem = this.state.activeItem;
    const pwField = this.state.checkPassword ? (
      <input
        value={this.state.password}
        onChange={this._handlePasswordChange}
        type="password"
      />
    ) : (
      <div>empty</div>
    );

    return (
      <OwnHeader>
        <TopBox activeItem={activeItem} layer1="Create a room" />
        <Segment textAlign="center">
          <p>Title:</p>
          <input value={this.state.title} onChange={this._handleTitleChange} />
          <p>Description:</p>
          <input
            value={this.state.description}
            onChange={this._handleDescriptionChange}
          />
          <p />
          <input
            type="checkbox"
            value={this.state.checkPassword}
            onChange={this._handlePasswordChangeCheck}
          />
          Password?
          <div id="passwordField">
            <p />
            {pwField}
          </div>
          <p />
          <button onClick={this._handleRoomCreation}>Create Room</button>
        </Segment>
      </OwnHeader>
    );
  }
}
