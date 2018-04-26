import React, { Component } from "react";
import axios from "axios";
import YouTubePlayer from "../components/YouTubePlayer";
import MyButton from "../components/Button";
import { List, Button, Icon, Input, Grid, Table } from "semantic-ui-react";
import VideoElement from "../components/VideoElement";
import PropTypes from "prop-types";
import openSocket from 'socket.io-client';
import {checksession} from "./Util";
const socket = openSocket('http://localhost:8000');
var chatText ="";

export default class Chat extends Component {
  constructor(props) {
    super(props);

    // Set initial state
    this.state = {
      history: [],
      message: "",
      timestamp: 'no timestamp yet',
      username: "default-username"
    };


    this._send = this._send.bind(this);
    this._messageUpdated = this._messageUpdated.bind(this);
  }



    _send(){
  //console.log("Kiebling");
    socket.emit("sendMessage", {
      content: this.state.message,
      username: this.state.username
    });
    this.setState ({message:""});

}
   _messageUpdated(e){
   this.setState ( {message:e.target.value} );
  }

  _refreshChatText(){
    socket.on("sendMessageBack", (message) => {
      if(message.length!=0){console.log(message.message.content);}
  //console.log(chatText);
      if(chatText==""){chatText = message.message.content;}
        else {chatText = chatText  +message.message.content; }
      console.log("chatText:" + chatText);
    });
}



  componentDidMount(){
// Register user to the chat on the server
//socket.emit("registerToChat", {username: this.state.username, roomId: this.props.hv});
//console.log("roomId:");
//console.log(this.props.hv);
setTimeout( this._refreshChatText(), 1000);
}


  componentWillMount() {
  var username = checksession();
  if (username != "ErrorTokenFalse"){
    this.state.username = username;
  } else {
    this.state.username = "undefined user";
  }
  }



  //--------------------------------Render----------------------------------//
  render() {

 return(
  <Grid>
    <Grid.Row>
      <div className="App">
        <p className="App-intro">
          This is the timer value: {this.state.timestamp}
          <p />
          This is the username: {this.state.username}
        </p>
        <ul id="messages">
            {chatText}
        </ul>
          <Input id="chat" focus placeholder='Chat...' value={this.state.message} onChange={this._messageUpdated} /><Button onClick={this._send} >Send<Icon name='right arrow' /></Button>
        <p>
        </p>
      </div>
    </Grid.Row>
  </Grid>
);

  }

}
