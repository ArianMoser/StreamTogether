//--------------------------------Imports-------------------------------//
import PropTypes from "prop-types";
import React, { Component } from "react";
import Link from "next/link";
import OwnHeader from "../components/Header";
import TopBox from "../components/TopBox";
import {
  Card,
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Accordion,
  activeIndex,
  Statistic
} from "semantic-ui-react";

export default class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "help"
    };
  }

  //----------------------------------Render-------------------------------//
  render() {
    const activeItem = this.state.activeItem;

    return (
      <OwnHeader>
        <TopBox activeItem={activeItem} layer1="Help" />
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <h1>Here are some tips that may will help you.</h1>
                <h3>
                  What happens when i join a room without being logged in?
                </h3>
                <p>
                  {" "}
                  You are free to use our website without having an account.<br />When
                  you join a room without being logged in, you just get a
                  randomly generated nickname.
                </p>
                <h3>How to register</h3>
                <p>
                  When you want to get an own account, you have to create an
                  account.<br />
                  Therefore you need the following credentials:
                  <ul>
                    <li>An username that is not alreay used</li>
                    <li>An Email-adress that is not already used</li>
                    <li>
                      A password. <br />Please choose your password belongs to
                      our password pattern: <br />1 upercase letter,<br /> 1
                      lowercase letter,<br /> 1 digit <br />and more than 8
                      characters at all.
                    </li>
                  </ul>
                </p>
                <h3>How to log in</h3>
                <p>
                  To log in, just click "Log in" above and enter your
                  credentials.<br /> In case you have problems with your account
                  please{" "}
                  <a href="http://gruppe2.testsites.info/contact">
                    contact us.
                  </a>
                </p>
                <h3> How to invite friends to my room </h3>
                <p>
                  To invite friends to your room, just use the blue invite
                  button inside your room and send the link to your friends.
                  <br/> By clicking the blue button the link will be added to your clipboard.
                  <br /> Special: In case you choose a room password, friends
                  who have your room link, do not have to enter the password.
                </p>
                <h3> How to create a room </h3>
                <p>
                  First, to create a room you need to be logged in.
                  <br /> Then click "create room" on the start site.
                  <br /> Enter the needed credentials and click "create room".
                  <br /> You will be forwarded to your room.
                </p>
                <h3> How to pause the running video </h3>
                <p>
                  {" "}
                  Some special. To pause the running video, please use the grew
                  button under the video.
                  <br /> We apologize for this fact and we want to say thanks
                  for your understanding.
                  <br /> We work on this problem, so that you can use the pause
                  button from the youtube player as soon as possible.
                </p>
                <h3> How to add videos to the room playlist </h3>
                <p>
                  {" "}
                  To add a video to the room playlist, follow the following
                  steps:
                  <ul>
                    <li>
                      {" "}
                      Search a video on the "Search for videos..."-input.{" "}
                    </li>
                    <li> Choose a video from the list under. </li>
                    <li>
                      {" "}
                      The choosen video will be added to the playlist on the
                      right.{" "}
                    </li>
                    <li>
                      {" "}
                      After playing all videos that was choosed before, your
                      video will be played.{" "}
                    </li>
                    <br /> You do not want to wait to play your video?
                    <br /> Just delete all other videos that are actually in the
                    room playlist.
                    <br /> But please remember: You are may not the only person
                    who want to hear a specific video.
                  </ul>
                </p>
                <h3> How long is my cookie valid? </h3>
                <p> The life time of a cookie is actually 24 hours.</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </OwnHeader>
    );
  }
}
