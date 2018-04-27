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
      history: [],
      message: "",
      timestamp: "no timestamp yet",
      username: "default-username"
    };

    this._send = this._send.bind(this);
    this._messageUpdated = this._messageUpdated.bind(this);
    this._refreshChatText = this._refreshChatText.bind(this);

    //  setInterval(this._refreshChatText, 1000);
  }

  _send() {
    //console.log("Kiebling");
    var timeStamp = Math.floor(Date.now() / 1000);
    socket.emit("sendMessage", {
      content: this.state.message,
      username: this.state.username,
      timeStamp: timeStamp
    });
    this.setState({ message: "" });
    this._refreshChatText();
  }
  _messageUpdated(e) {
    this.setState({ message: e.target.value });
  }

  _refreshChatText() {
    socket.on("sendMessageBack", message => {
      if (message.length != 0) {
        console.log(message.message.content);
      }
      console.log(message);
      var chat = this.state.chat;
      console.log(chat);
      if (chat != [] && chat.length != "0") {
        if (chat[chat.length-1].timeStamp != message.message.timeStamp){
          chat.push({
            username: message.message.username,
            message: message.message.content,
            timeStamp: message.message.timeStamp
          });
          this.setState({ chat: chat });
        }
      } else {
        chat.push({
          username: message.message.username,
          message: message.message.content,
          timeStamp: message.message.timeStamp
        });
        this.setState({ chat: chat });
      }

      //  console.log("chatText:" );
    });
  }

  componentDidMount() {
    // Register user to the chat on the server
    //socket.emit("registerToChat", {username: this.state.username, roomId: this.props.hv});
    //console.log("roomId:");
    //console.log(this.props.hv);
  }

  componentWillMount() {
    var username = checksession();
    if (username != "ErrorTokenFalse") {
      this.state.username = username;
    } else {
      this.state.username = "undefined user";
    }
  }

  //--------------------------------Render----------------------------------//
  render() {
    var chatTextElement = <div />;

    if (chatTextElement != [] && chatTextElement != undefined) {
      var chat = this.state.chat;
      chatTextElement = chat.map(function(chatElement, index) {
        return (
          <List.Item>
            <List.Content key={index}>
              {" "}
              <List.Header>
                {chatElement.username} ({chatElement.timeStamp}) :
              </List.Header>{" "}
              {chatElement.message}{" "}
            </List.Content>
          </List.Item>
        );
      });
    }

    return (
      <Grid>
        <Grid.Row>
          <div className="App">
            <p className="App-intro">
              This is the timer value: {this.state.timestamp}
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
