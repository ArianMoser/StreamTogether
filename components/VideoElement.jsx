//--------------------------------Imports-------------------------------//
import React, { Component } from "react";
import { Button, Icon, Table } from "semantic-ui-react";
import MyButton from "../components/Button";
import PropTypes from "prop-types";

//****************************************************************************
// ARI
//****************************************************************************

export default class VideoElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // Bind event handlers
    this._handleDelete = this._handleDelete.bind(this);
    this._handleThumbsUp = this._handleThumbsUp.bind(this);
    this._handleThumbsDown = this._handleThumbsDown.bind(this);
    this._handleStartVideo = this._handleStartVideo.bind(this);
  } //end of constructor

  static propTypes = {
    channelId: PropTypes.string,
    channelName: PropTypes.string,
    databaseId: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleVote: PropTypes.func.isRequired,
    roomId: PropTypes.number.isRequired,
    userId: PropTypes.string,
    videoDescription: PropTypes.string,
    videoId: PropTypes.string,
    videoThumbnailUrl: PropTypes.string,
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

  //-------------------------functions of react--------------------------//

  //componentWillMount() is invoked just before mounting occurs
  componentWillMount() {
    this.setState(this.props);
  }

  //componentWillUpdate() is invoked just before rendering when new props or state are being received
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.videoId != this.state.videoId) {
      this.setState(nextProps);
    }
  }

  //----------------------------------Event-Handler-----------------------------//
  _handleDelete() {
    console.log("Clicked delete");
    console.log("DatabaseId:" + this.state.databaseId);
    console.log("RoomId: " + this.state.roomId);
    this.props.handleDelete(this.state.roomId, this.state.databaseId);
  }

  _handleThumbsUp() {
    console.log("Clicked thumbsup");

    const nodeThumbsDown = this.refs.refThumbsDown;
    const nodeThumbsUp = this.refs.refThumbsUp;
    nodeThumbsDown._setDisable(false);
    nodeThumbsUp._setDisable(true);

    this.props.handleVote(this.props.roomId, this.props.databaseId, 1);
  }

  _handleThumbsDown() {
    console.log("Clicked thumbsdown");

    const nodeThumbsDown = this.refs.refThumbsDown;
    const nodeThumbsUp = this.refs.refThumbsUp;
    nodeThumbsDown._setDisable(true);
    nodeThumbsUp._setDisable(false);

    this.props.handleVote(this.props.roomId, this.props.databaseId, -1);
  }

  _handleStartVideo() {
    console.log("Clicked start video");
    // future feature for admins
    // start video earlier (switches the position in the queue)
  }

  //----------------------------------Render-----------------------------//
  render() {
    return (
      <Table.Row>
        <Table.Cell>
          {" "}
          <a
            target="_bank"
            href={"https://youtube.com/channel/" + this.state.channelId}
          >
            <img src={this.state.videoThumbnailUrl} height="100px" />{" "}
          </a>
        </Table.Cell>
        <Table.Cell>
          <a
            target="_blank"
            href={"https://youtube.com/watch?v=" + this.state.videoId}
          >
            {this.state.videoTitle}
          </a>
        </Table.Cell>
        <Table.Cell width={3}>
          <MyButton
            color="green"
            icon="thumbs-up"
            id="thumbs-up"
            onClick={this._handleThumbsUp}
            ref="refThumbsUp"
          />
          <MyButton
            color="red"
            icon="thumbs-down"
            id="thumbs-down"
            onClick={this._handleThumbsDown}
            ref="refThumbsDown"
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
