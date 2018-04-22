import React, { Component } from "react";
import { Button, Icon, Table } from "semantic-ui-react";
import MyButton from "../components/Button";

export default class VideoElement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._handleDelete = this._handleDelete.bind(this);
    this._handleThumbsUp = this._handleThumbsUp.bind(this);
    this._handleThumbsDown = this._handleThumbsDown.bind(this);
    this._handleStartVideo = this._handleStartVideo.bind(this);
  } //end of constructor

  static get defaultProps() {
    return {
      channelId: "default-channelId",
      channelName: "default-channelName",
      videoDescription: "default-videoDescription",
      videoId: "default-videoId",
      videoThumbnailUrl: "default-videoThumbnailUrl",
      videoTitle: "default-videoTitle"
    };
  } // end of defaultProps

  componentWillMount() {
    this.setState(this.props);
  } //end of componentWillMount

  componentDidUpdate(nextProps, nextState) {
    if (nextProps.videoId != this.state.videoId) {
      this.setState(nextProps);
    }
  } //end of componentDidUpdate

  _handleDelete() {
    console.log("Clicked delete");
  }

  _handleThumbsUp() {
    console.log("Clicked thumbsup");
  }

  _handleThumbsDown() {
    console.log("Clicked thumbsdown");
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
            onClick={this._handleThumbsUp}
          />
          <MyButton
            color="red"
            icon="thumbs-down"
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
