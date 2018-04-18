import OwnHeader from "../components/Header";
import Link from "next/link";
import React, { Component } from "react";
import $ from "jquery";
import { roomFunctionByTitle, createRoomFunction } from "./PostMethods";

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

  constructor(props) {
    super(props);
    this.state = {
      checkPassword: false
    };

    this._handleDescriptionChange = this._handleDescriptionChange.bind(this);
    this._handleTitleChange = this._handleTitleChange.bind(this);
    this._handlePasswordChangeCheck = this._handlePasswordChangeCheck.bind(
      this
    );
    this._handlePasswordChange = this._handlePasswordChange.bind(this);
    this._handleRoomCreation = this._handleRoomCreation.bind(this);
  }

  static get defaultProps() {
    return {
      title: "",
      description: "",
      checkPassword: false,
      password: ""
    };
  }

  componentDidMount() {
    this.setState({
      title: this.props.title,
      description: this.props.description
    });
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
      checkPassword: !this.state.checkPassword
    });
  }

  _handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  async _handleRoomCreation(event) {
  /*  this.setState({
      title: undefined,
      description: undefined,
      checkPassword: false,
      password: undefined
    });*/
    event.preventDefault();

    const title = this.state.title;
    const description = this.state.description;
    const checkPassword = this.state.checkPassword;
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
        password
    );
    var titleExpression = /^[A-Za-z0-9_]{3,32}$/;
    var pwExpression = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    //Check Regex Statements
    if (
      (titleExpression.test(title) &&
        (pwExpression.test(password) || !checkPassword)) ||
      true
    ) {
      console.log("Testpattern succeded");
      const responseSelectTitle = await roomFunctionByTitle(
        "/selectRoomByTitle",
        title
      );
      console.log(
        "Number of entries in the database with username " +
          title +
          " :" +
          responseSelectTitle.length
      );
      //check if title is already used
      if (responseSelectTitle.length == "0") {
        // send the room information to the database
        const responseRoomCreation = await createRoomFunction(
          "/createRoom",
          title,
          description,
          password
        );
        console.log(
          "Reg. Complete | Affected Rows: " + responseRoomCreation.affectedRows
        );
        //check if db push succeded
        if (responseRoomCreation.affectedRows == "1") {
          console.log("DB push succeeded");
        //  window.location = "./";
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

  render() {
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
      <div
        style={{
          border: "1px solid grey",
          padding: "20px",
          margin: "20px 0 20px 0"
        }}
      >
        <h2>Create a Room</h2>
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
      </div>
    );
  }
}
