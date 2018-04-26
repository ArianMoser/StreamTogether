import React, { Component } from "react";
import { Button, Card, Icon, Image, Input, Popup } from "semantic-ui-react";
import PropTypes from "prop-types";
import { userFunctionById } from "../pages/PostMethods";
const bcrypt = require("bcryptjs");

export default class RoomCard extends Component {
  constructor(props) {
    super(props);
    this.state = { inputPassword: "" };
    this._handleRoomJoining = this._handleRoomJoining.bind(this);
    this._handlePasswordChange = this._handlePasswordChange.bind(this);
    this._handlePasswordCheck = this._handlePasswordCheck.bind(this);
  }

  static get defaultProps() {
    return {
      creator: "Default-Creator",
      description: "Default-Description",
      hashedValue: "",
      key: 0,
      password: "Default-Password",
      thumbnail: "Default-Thumbnail",
      title: "Default-title",
      userName: "Default-User",
      userNumber: -1
    };
  }

  static propTypes = {
    creator: PropTypes.string,
    description: PropTypes.string,
    hashedValue: PropTypes.string,
    key: PropTypes.number,
    password: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    userName: PropTypes.string,
    userNumber: PropTypes.number
  };

  //-------------------------functions of react----------------------------//
  componentWillMount() {
    this.setState(this.props);
    this._getUsername(this.props.creator);
  }

  //----------------------------event handlers---------------------------//
  _handleRoomJoining(event, hashed) {
    event.preventDefault();
    console.log("Join Room clicked");
    console.log("Target room: " + hashed);
    window.location = "./room?hv=" + hashed;
  }

  _handlePasswordChange(event) {
    event.preventDefault();
    this.setState({
      inputPassword: event.target.value
    });
  }

  _handlePasswordCheck(event) {
    if (event.charCode == 13) {
      console.log("Check password");
      if (bcrypt.compareSync(this.state.inputPassword, this.state.password)) {
        console.log("Password correct");
        window.location = "./room?hv=" + this.state.hashedValue;
      } else {
        console.log("Password wrong");
      }

      //window.location = "./room?hv=" + this.state.hashedValue;
    }
  }

  //----------------------functions------------------------------//
  async _getUsername(id) {
    const responseUsername = await userFunctionById("/getUserById", id);
    console.log(responseUsername);
    if (responseUsername.length == "1") {
      this.setState({
        userName: responseUsername[0].username
      });
    } else {
      console.log("Failed to resolve creator");
    }
  }

  //----------------------------------Render-------------------------------//
  render() {
    const userName = this.state.userName;
    const description = this.state.description;
    const hashedValue = this.state.hashedValue;
    const title = this.state.title;
    const userNumber = this.state.userNumber;

    var joinButton = (
      <Button
        icon
        color="blue"
        labelPosition="right"
        floated="right"
        onClick={e => this._handleRoomJoining(e, hashedValue)}
        id={hashedValue}
      >
        Join
        <Icon name="right arrow" />
      </Button>
    );

    if (
      this.state.password != "" &&
      this.state.password != "Default-Password"
    ) {
      const trigger = (
        <Button icon color="blue" labelPosition="right" floated="right">
          Join
          <Icon name="right arrow" />
        </Button>
      );
      joinButton = (
        <Popup wide trigger={trigger} on="click">
          <Input
            icon="privacy"
            iconPosition="left"
            id="password"
            type="password"
            onChange={this._handlePasswordChange}
            onKeyPress={this._handlePasswordCheck}
            placeholder="Password"
          />
        </Popup>
      );
    }

    return (
      <Card>
        <Image src="../static/minion.png" />
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>
            <span className="username">{userName}</span>
          </Card.Meta>
          <Card.Description>{description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="music" />
          {userNumber} active user
          {joinButton}
        </Card.Content>
      </Card>
    );
  }
}
