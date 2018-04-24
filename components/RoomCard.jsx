import React, { Component } from "react";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import PropTypes from "prop-types";
import { userFunctionById } from "../pages/PostMethods";

export default class RoomCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._handleRoomJoining = this._handleRoomJoining.bind(this);
  }

  static get defaultProps() {
    return {
      creator: "Default-Creator",
      description: "Default-Description",
      hashedValue: "",
      position: 0,
      userName: "Default-User",
      userNumber: -1,
      thumbnail: "",
      title: "Default-title"
    };
  }

  static propTypes = {
    creator: PropTypes.string,
    description: PropTypes.string,
    hashedValue: PropTypes.string,
    position: PropTypes.number,
    userName: PropTypes.string,
    userNumber: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string
  };

  componentWillMount() {
    this.setState({
      creator: this.props.creator,
      description: this.props.description,
      hashedValue: this.props.hashedValue,
      title: this.props.title,
      userName: this.props.userName,
      userNumber: this.props.userNumber
    });
    this._getUsername(this.props.creator);
  }

  async _getUsername(id) {
    const responseUsername = await userFunctionById(
      "/getUserById",
      id
    );
    console.log(responseUsername);
    if (responseUsername.length == "1") {
      this.setState({
        userName: responseUsername[0].username
      });
    } else {
      console.log("Failed to resolve creator");
    }
  }

  _handleRoomJoining(event, hashed) {
    event.preventDefault();
    console.log("Join Room clicked");
    console.log("Target room: " + hashed);
    window.location = "./room?hv=" + hashed;
  }

  render() {
    const userName = this.state.userName;
    const description = this.state.description;
    const hashedValue = this.state.hashedValue;
    const title = this.state.title;
    const userNumber = this.state.userNumber;

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
        </Card.Content>
      </Card>
    );
  }
}
