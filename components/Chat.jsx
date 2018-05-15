//--------------------------------Imports-------------------------------//
import React, { Component } from "react";
import axios from "axios";
import YouTubePlayer from "../components/YouTubePlayer";
import MyButton from "../components/Button";
import {
  Button,
  Comment,
  Container,
  Header,
  Icon,
  Input,
  Grid,
  Image,
  List,
  Segment,
  Sidebar,
  Table
} from "semantic-ui-react";
import VideoElement from "../components/VideoElement";
import PropTypes from "prop-types";
import openSocket from "socket.io-client";
import { checksession } from "./Util";

//--------------------------------Declarations-------------------------------//
const socket = openSocket("http://localhost:8000");
const divStyle = {
  color: "blue"
};

//****************************************************************************
//This component enables the chat and userlist per room
//****************************************************************************

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

  static get defaultProps() {
    return {
      username: "user"
    };
  }

  //-------------------------functions of react----------------------------//

  // componentDidMount() is invoked immediately after a component is mounted
  // Register user to the chat on the server
  componentDidMount() {
    window.addEventListener("beforeunload", ev => {
      ev.preventDefault();
      socket.emit("leaveRoom", {
        username: this.state.username
      });
    });
    if (this.state.username != "" && this.state.username != undefined) {
      //console.log("#####" + this.state.username);
      this._authentificateOnServer();
    }
  }

  // componentWillMount() is invoked just before mounting occurs
  componentWillMount() {
    this.props.hv != undefined && this.props.hv != ""
      ? this.setState({ hv: this.props.hv, username: this.props.username })
      : this.setState({ hv: "", username: this.props.username });
  }

  // componentWillUnmount() is invoked immediately before a component is unmounted and destroyed
  // user leave the Room
  componentWillUnmount() {
    socket.emit("leaveRoom", {
      username: this.state.username
    });
  }

  // componentWillUpdate() is invoked just before rendering when new props or state are being received
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.username != this.state.username) {
      this.setState({ username: nextProps.username });
    }
  }

  // componentDidUpdate() is invoked immediately after updating occurs
  componentDidUpdate(prevProps, prevState) {
    if (prevState.username != this.state.username) {
      this._authentificateOnServer();
    }
    this.scrollToBottom();
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

  //authentificate
  _authentificateOnServer() {
    //console.log("Authentificate on Server");
    socket.emit("authentificate", {
      hashedValue: this.state.hv,
      username: this.state.username
    });
    this._refreshChatText();
  }

  //send message
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

  //refresh chat
  _refreshChatText() {
    socket.on("sendMessageBack", message => {
      var userInList = false;
      if (message.length != 0) {
        if (message.userlist != undefined) {
          if (message.userlist.length != "0") {
            message.userlist.map(user => {
              user == this.state.username ? (userInList = true) : null;
            });
          }
        } // end of if
      } // end of if
      //userInList = true;
      if (userInList == true) {
        var beautifulTime = this.getTime(message.message.timeStamp);
        var chat = this.state.chat;
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

    //send video command
    socket.on("sendVideoCommand", message => {
      var userInList = false;
      if (message.length != 0) {
        //console.log(message);
        if (message.userlist.length != "0") {
          message.userlist.map(user => {
            user == this.state.username ? (userInList = true) : null;
          });
        } // end of if
      } // end of if
      if (userInList == true) {
        //console.log("Handle the video command");
        this.props.handleVideoCommand(this.props.roomId);
      }
    });
  } // end of _refreshChatText

  //get current video time
  getTime(timeStamp) {
    var date = new Date(timeStamp * 1000);
    var hours = date.getHours();
    hours = hours < 10 ? "0" + hours : hours;
    var minutes = date.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var seconds = date.getSeconds();
    seconds = seconds < 10 ? "0" + seconds : seconds;
    var beautifulTime = hours + ":" + minutes + ":" + seconds;
    return beautifulTime;
  }

  scrollToBottom = () => {
    var scrollY = window.scrollY;
    var scrollX = window.scrollX;
    this.chatEnd.scrollIntoView({ behavior: "instant", block: "start" });
    window.scrollTo(scrollX, scrollY);
  };

  //--------------------------------Render----------------------------------//
  render() {
    //create chatbox
    var chatTextElement = <div />;
    if (chatTextElement != [] && chatTextElement != undefined) {
      var chat = this.state.chat;
      var username = this.state.username;
      chatTextElement = chat.map(function(chatElement, index) {
        var style = { textAlign: "left", overflow: scroll };
        if (chatElement.username == username) {
          //the current user
          style = { textAlign: "right", overflow: scroll };
        } else {
          if (chatElement.username == "server") {
            // server information
            style = { textAlign: "center", overflow: scroll };
          } else {
            //other user
            style = { textAlign: "left", overflow: scroll };
          } //end of else
        } //end of if
        return (
          <Comment>
            <Comment.Content key={index} style={style}>
              <Comment.Author as="a">{chatElement.username}</Comment.Author>
              <Comment.Metadata>
                <span>{chatElement.beautifulTime}</span>
              </Comment.Metadata>
              <Comment.Text>{chatElement.message}</Comment.Text>
            </Comment.Content>
          </Comment>
        );
      });
    } // end of chatText

    // generate Userlist
    var userlistElement = <div />;
    if (this.state.userlist != [] && this.state.userlist != undefined) {
      userlistElement = this.state.userlist.map(user => {
        var style = { color: "black" };
        //console.log(this.state.username + "|" + user);
        if (this.state.username == user) {
          style = { color: "blue" };
        }
        var userelement = (
          <List.Item>
            <Image avatar src="../static/userpicture_default.png" />
            <List.Content>
              <List.Header style={style}>{user}</List.Header>
            </List.Content>
          </List.Item>
        );
        //console.log(userelement);
        return userelement;
      });
    } //end of if

    // return userlist and Chat
    return (
      <Grid>
        <Grid.Row>
          <div className="App">
            <Header as="h2">Userlist</Header>
            <List horizontal>{userlistElement}</List>
            <Header as="h2">Chat</Header>
            <Sidebar.Pushable
              as={Segment}
              style={{ maxHeight: 300, maxWidth: 400, overflow: scroll }}
              ref="chat"
            >
              <div style={divStyle}>
                <Comment.Group minimal style={{ width: 350 }}>
                  {chatTextElement}
                </Comment.Group>
              </div>
              <div
                ref={el => {
                  this.chatEnd = el;
                }}
              />
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
