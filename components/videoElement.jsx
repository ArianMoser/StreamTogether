import React, { Component } from "react";
import { Button, Icon, Table } from "semantic-ui-react";
import MyButton from "../components/Button";
import PropTypes from "prop-types";
import $ from "jquery";

export default class VideoElement extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this._handleDelete = this._handleDelete.bind(this);
    this._handleThumbsUp = this._handleThumbsUp.bind(this);
    this._handleThumbsDown = this._handleThumbsDown.bind(this);
    this._handleStartVideo = this._handleStartVideo.bind(this);
  } //end of constructor

  static propTypes = {
    channelId: PropTypes.string,
    channelName: PropTypes.string,
    databaseId: PropTypes.number,
    roomId: PropTypes.number,
    handleDelete: PropTypes.func,
    handleVote: PropTypes.func,
    videoDescription: PropTypes.string,
    videoId: PropTypes.string,
    videoThumbnailUrl: PropTypes.string,
    userId: PropTypes.string,
    videoTitle: PropTypes.string
  };

  static get defaultProps() {
    return {
      channelId: "default-channelId",
      channelName: "default-channelName",
      databaseId: 0,
      roomId: 0,
      videoDescription: "default-videoDescription",
      videoId: "default-videoId",
      videoThumbnailUrl: "default-videoThumbnailUrl",
      videoTitle: "default-videoTitle"
    };
  } // end of defaultProps

  componentWillMount() {
    this.setState(this.props);
  } //end of componentWillMount

  componentWillUpdate(nextProps, nextState) {
    console.log("VideoElement");
    console.log(nextProps);
    console.log(nextState);
    if (nextProps.videoId != this.state.videoId) {
      console.log("Updates VideoElemen");
      this.setState(nextProps);
    }
  } //end of componentDidUpdate

  _handleDelete() {
    console.log("Clicked delete");
    console.log("DatabaseId:" + this.state.databaseId);
    console.log("RoomId: " + this.state.roomId);
    this.props.handleDelete(this.state.roomId, this.state.databaseId);
  }

  _handleThumbsUp() {
    console.log("Clicked thumbsup");
    $("#thumbs-up").prop("disabled", true);
    $("#thumbs-down").prop("disabled", false);
    this.props.handleVote(this.props.roomId, this.props.databaseId, 1);
  }

  _handleThumbsDown() {
    console.log("Clicked thumbsdown");
    $("#thumbs-up").prop("disabled", true);
    $("#thumbs-down").prop("disabled", false);
    this.props.handleVote(this.props.roomId, this.props.databaseId, -1);
  }

  _handleStartVideo() {
    console.log("Clicked start video");
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>
          {" "}
          <img src={this.state.videoThumbnailUrl} height="100px" />{" "}
        </Table.Cell>
        <Table.Cell>{this.state.videoTitle}</Table.Cell>
        <Table.Cell width={3}>
          <MyButton
            color="green"
            icon="thumbs-up"
            id="thumbs-up"
            onClick={this._handleThumbsUp}
          />
          <MyButton
            color="red"
            icon="thumbs-down"
            id="thumbs-down"
            onClick={this._handleThumbsDown}
          />
        </Table.Cell>
        <Table.Cell width={3}>
          <MyButton color="red" icon="delete" onClick={this._handleDelete} />
          <Button icon color="red" onClick={this._handleStartVideo}>
            <Icon name="youtube" />
            <Icon name="play" />
          </Button>
        </Table.Cell>
      </Table.Row>
    ); //end of return
  } // end of render
} //end of class
