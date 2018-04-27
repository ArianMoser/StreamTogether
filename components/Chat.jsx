import React, { Component } from "react";
import axios from "axios";
import YouTubePlayer from "../components/YouTubePlayer";
import MyButton from "../components/Button";
import {
  List,
  Button,
  Icon,
  Input,
  Grid,
  Segment,
  Sidebar,
  Table
} from "semantic-ui-react";
import VideoElement from "../components/VideoElement";
import PropTypes from "prop-types";
import openSocket from "socket.io-client";
import { checksession } from "./Util";
const socket = openSocket("http://localhost:8000");
const imgUrl = "../pics/download.jpg";
const divStyle = {
  color: "blue"
};

export default class Chat extends Component {
  constructor(props) {
    super(props);

    // Set initial state
    this.state = {
      chat: [],
      hv: "",
      message: "",
      timestamp: "no timestamp yet",
      username: "default-username",
      userlist: []
    };

    // bind event handlers
    this._send = this._send.bind(this);
    this._messageUpdated = this._messageUpdated.bind(this);
    this._refreshChatText = this._refreshChatText.bind(this);
    this._handleMessageSendCheck = this._handleMessageSendCheck.bind(this);
    this.__authentificateOnServer = this._authentificateOnServer.bind(this);
    //  setInterval(this._refreshChatText, 1000);
  }
  //-------------------------functions of react----------------------------//

  componentDidMount() {
    // Register user to the chat on the server
    //socket.emit("registerToChat", {username: this.state.username, roomId: this.props.hv});
    //console.log("roomId:");
    //console.log(this.props.hv);
      window.addEventListener("beforeunload", ev => {
      ev.preventDefault();
      socket.emit("leaveRoom", {
        username: this.state.username
      });
    });
    this._authentificateOnServer();
  }

  componentWillMount() {
    var username = checksession();
    if (username != "ErrorTokenFalse") {
      this.setState({
        username: username
      });
    } else {
      this.setState({
        username: "undefined"
      });
    }

    this.props.hv != undefined && this.props.hv != ""
      ? this.setState({ hv: this.props.hv })
      : this.setState({ hv: "" });
  }

  componentWillUnmount() {
    socket.emit("leaveRoom", {
      username: this.state.username
    });
  }

  //----------------------------event handlers---------------------------//

  _messageUpdated(e) {
    this.setState({ message: e.target.value });
  }

  _handleMessageSendCheck(event) {
    if (event.charCode == 13 && this.state.message != "") {
      this._send();
    }
  }
  //----------------------functions------------------------------//

  _authentificateOnServer() {
    console.log("Authentificate on Server");
    socket.emit("authentificate", {
      hashedValue: this.state.hv,
      username: this.state.username
    });
    this._refreshChatText();
  }

  _send() {
    if (this.state.message != "") {
      var timeStamp = Math.floor(Date.now() / 1000);
      socket.emit("sendMessage", {
        content: this.state.message,
        username: this.state.username,
        timeStamp: timeStamp
      });
      this.setState({ message: "" });
      this._refreshChatText();
    }
  }

  _refreshChatText() {
    socket.on("sendMessageBack", message => {
      var userInList = false;
      if (message.length != 0) {
        console.log(message);
        if (message.userlist.length != "0") {
          message.userlist.map(user => {
            user == this.state.username ? (userInList = true) : null;
          });
        } // end of if
      } // end of if

      if (userInList == true) {
        console.log("User in Userlist");
        var beautifulTime = this.getTime(message.message.timeStamp);
        var chat = this.state.chat;
        console.log(chat);
        if (chat != [] && chat.length != "0") {
          if (chat[chat.length - 1].timeStamp != message.message.timeStamp) {
            chat.push({
              beautifulTime: beautifulTime,
              message: message.message.content,
              username: message.message.username,
              timeStamp: message.message.timeStamp
            });
            this.setState({ chat: chat, userlist: message.userlist });
          }
        } else {
          chat.push({
            beautifulTime: beautifulTime,
            message: message.message.content,
            username: message.message.username,
            timeStamp: message.message.timeStamp
          });
          this.setState({ chat: chat, userlist: message.userlist });
        } //end of else
      } //end of if
    }); // end of socket.on
  } // end of _refreshChatText

  getTime(timeStamp) {
    var date = new Date(timeStamp * 1000);
    var hours = date.getHours();
    hours = hours < 10 ? "0" + hours : hours;
    var minutes = date.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var seconds = date.getSeconds();
    seconds = seconds < 10 ? "0" + seconds : seconds;
    var beautifulTime = hours + ":" + minutes + ":" + seconds;
    console.log(beautifulTime);
    return beautifulTime;
  }

  //--------------------------------Render----------------------------------//
  render() {
    var chatTextElement = <div />;

    if (chatTextElement != [] && chatTextElement != undefined) {
      var chat = this.state.chat;
      var username = this.state.username;
      chatTextElement = chat.map(function(chatElement, index) {
        var style = { textAlign: "left" };
        if (chatElement.username == username) {
          //the current user
          style = { textAlign: "right" };
        } else {
          if (chatElement.username == "server") {
            // server information
            style = { textAlign: "center" };
          } else {
            //other user
            style = { textAlign: "left" };
          } //end of else
        } //end of if
        return (
          <List.Item>
            <List.Content key={index} style={style}>
              {" "}
              <List.Header>
                {chatElement.username} ({chatElement.beautifulTime}) :
              </List.Header>{" "}
              {chatElement.message}{" "}
            </List.Content>
          </List.Item>
        );
      });
    } // end of chatText

    var userlistElement = <div />;
    console.log("Creating userlist");
    if (this.state.userlist != [] && this.state.userlist != undefined) {
      console.log(this.state.userlist);
      userlistElement = this.state.userlist.map(user => {
        console.log("User");
        console.log({ user });
        return <span>{user}|</span>;
      });
    } //end of if

    return (
      <Grid>
        <Grid.Row>
          <div className="App">
            <p className="App-intro">
              This is the Userlist: {userlistElement}
              <p />
              This is the username: {this.state.username}
            </p>
            <Sidebar.Pushable as={Segment}>
              <div style={divStyle}>
                <List celled>{chatTextElement}</List>
              </div>
            </Sidebar.Pushable>
            <Input
              id="chat"
              focus
              placeholder="Chat..."
              value={this.state.message}
              onChange={this._messageUpdated}
              onKeyPress={this._handleMessageSendCheck}
            />
            <Button onClick={this._send}>
              Send<Icon name="right arrow" />
            </Button>
            <p />
          </div>
        </Grid.Row>
      </Grid>
    );
  }
}
