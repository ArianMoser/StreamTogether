import OwnHeader from "../components/Header";
import Link from "next/link";
import React, { Component } from "react";
import $ from "jquery";
import { userFunctionLogin } from "./PostMethods";
const bcrypt = require("bcryptjs");

import {
  Button,
  Form,
  Grid,
  Icon,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

export default class Login extends Component {

//{checkPassword ? {$("#passwordField").hide()} : {$("#passwordField").show()}}

  constructor(props) {
      super(props);
      this.state = {
        checkPassword: false
      };

      this._handleDescriptionChange = this._handleDescriptionChange.bind(this);
      this._handleTitleChange = this._handleTitleChange.bind(this);
      this._handlePasswordChangeCheck = this._handlePasswordChangeCheck.bind(this);
      this._handlePasswordChange = this._handlePasswordChange.bind(this);
      this._handleRoomCreation = this._handleRoomCreation.bind(this);
  }

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
            checkPassword: event.target.value
        });
    }

  _handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    _handleRoomCreation() {
      this.setState({
            title: undefined,
            description: undefined,
            checkPassword: false,
            password: undefined,
        });
      console.log("Title: " + this.state.title + "| description: " + this.state.description
      + "| checkPassword: " + this.state.checkPassword + "| password: " + this.state.password);
    }



render(){
  return (
  <div style={{border: '1px solid grey',  padding: '20px', margin: '20px 0 20px 0'}}>
                <h2>Create a Room</h2>

                <p>Title:</p>
                <input value={this.state.title} onChange={this._handleTitleChange} />

                <p>Description:</p>
                <input value={this.state.description} onChange={this._handleDescriptionChange} />

                <p></p>
                <input type="checkbox" value={this.state.checkPassword} onChange={this._handlePasswordChangeCheck} />
                Password?
                <div id="passwordField">
                  <p></p>
                  <input value={this.state.password} onChange={this._handlePasswordChange}></input>
                </div>
                <p></p>
                <button onClick={this._handleRoomCreation}>Create Room</button>

            </div>
          )
          };
}
