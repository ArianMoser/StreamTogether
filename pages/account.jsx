//--------------------------------Imports-------------------------------//
import PropTypes from "prop-types";
import React, { Component } from "react";
import Link from "next/link";
import OwnHeader from "../components/Header";
import TopBox from "../components/TopBox";
import { checksession, checksessionfortempuser } from "../components/Util";
import { read_cookie, delete_cookie } from "sfcookies";
import $ from "jquery";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Tab,
  Input,
  Popup,
  Modal,
  Checkbox
} from "semantic-ui-react";
import {
  changePassword,
  deleteUser,
  userFunctionLogin,
  userFunctionByUsername,
  roomFunctionById
} from "./PostMethods";

//--------------------------------Declarations-------------------------------//
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "account",
      deleteAccountCheck: false,
      email: "default-email",
      hashedPassword: "",
      currentRoom: "default-room",
      newPassword1: "",
      newPassword2: "",
      oldPassword: "",
      userId: "",
      username: "default-username"
    };

    // bind event handlers
    this._changePassword = this._changePassword.bind(this);
    this._handleOldPasswordChange = this._handleOldPasswordChange.bind(this);
    this._handleNewPassword1Change = this._handleNewPassword1Change.bind(this);
    this._handleNewPassword2Change = this._handleNewPassword2Change.bind(this);
    this._handleDeleteAccountChange = this._handleDeleteAccountChange.bind(
      this
    );
    this._deleteAccount = this._deleteAccount.bind(this);
  }

  //-------------------------functions of react----------------------------//
  // componentWillMount() is invoked just before mounting occurs
  componentWillMount() {
    this.setState({
      deleteAccountCheck: false
    });
  }

  // componentDidMount() is invoked immediately after a component is mounted
  //check if Cookie is set. Otherwise the user will be redirected to the login page
  componentDidMount() {
    //console.log("Check Cookie");
    if (
      checksession() == "ErrorTokenFalse" ||
      checksessionfortempuser() == "yes"
    ) {
      window.location = "/login";
      //console.log("Cookie not found");
    } else {
      $("OwnHeader").show();
      this._getInformation();
    }
  }
  //----------------------------event handlers---------------------------//
  _handleOldPasswordChange(event) {
    this.setState({
      oldPassword: event.target.value
    });
  }

  _handleNewPassword1Change(event) {
    this.setState({
      newPassword1: event.target.value
    });
  }

  _handleNewPassword2Change(event) {
    this.setState({
      newPassword2: event.target.value
    });
  }

  _handleDeleteAccountChange(event) {
    this.setState({
      deleteAccountCheck: !this.state.deleteAccountCheck
    });
  }

  //changes the password
  async _changePassword(event) {
    event.preventDefault();
    //console.log("Handle password change");

    //password pattern
    var pwExpression = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const oldPassword = this.state.oldPassword;
    const newPassword1 = this.state.newPassword1;
    const newPassword2 = this.state.newPassword2;
    const userId = this.state.userId;

    //check if pattern is successfull
    if (pwExpression.test(newPassword1) && pwExpression.test(newPassword2)) {
      /*console.log("oldPassword:  " + oldPassword);
      console.log("newPassword1: " + newPassword1);
      console.log("newPassword2: " + newPassword2);
      console.log("userid:       " + userId);*/

      //check if passwords ars equal
      if (newPassword1 == newPassword2) {
        //console.log("Passwords are equal. Continues ... ");
        //check oldPassword
        if (
          bcrypt.compareSync(oldPassword, this.state.hashedPassword) &&
          this.state.hashedPassword != ""
        ) {
          //console.log("Password accepted");
          //change password
          const responseChangePassword = await changePassword(
            "/updateUserPassword",
            userId,
            newPassword2
          );
          /*console.log(
            "Reg. Complete | Affected Rows: " +
              responseChangePassword.affectedRows
          );*/
          //check if db push succeded
          if (responseChangePassword.affectedRows == "1") {
            document.getElementById("feedback_password").innerHTML =
              '<div class="ui positive message"><div class="header">Password changed</div><p>Your password has been changed successfully</p></div>';
            //console.log("DB push succeeded");
          } else {
            document.getElementById("feedback_password").innerHTML =
              '<div class="ui negative message"><div class="header">Error</div><p>Internal Error</p></div>';
            //console.log("DB push failed");
          }
        } else {
          document.getElementById("feedback_password").innerHTML =
            '<div class="ui negative message"><div class="header">Password not correct</div><p>Old password not correct</p></div>';
          //console.log("Password wrong");
        }
      } else {
        document.getElementById("feedback_password").innerHTML =
          '<div class="ui negative message"><div class="header">Password not equal</div><p>Please try again</p></div>';
        //console.log("Exception: 'Passwords are not equal'");
      }
    } else {
      document.getElementById("feedback_password").innerHTML =
        '<div class="ui negative message"><div class="header">New password not accepted</div><p>Please try another password</p></div>';
      //console.log("Pattern Error!");
    }
  }

  // deletes the account
  async _deleteAccount(event) {
    event.preventDefault();
    //console.log("Delete user");
    // console.log(this.state);

    const deleteAccountCheck = this.state.deleteAccountCheck;
    const userId = this.state.userId;

    if (deleteAccountCheck) {
      //console.log("Delete Account check succeded");
      //delete account
      const responseDeleteAccount = await deleteUser("/deleteUser", userId);
      /*console.log(
        "Reg. Complete | Affected Rows: " + responseDeleteAccount.affectedRows
      );*/
      //check if db push is succeded
      if (responseDeleteAccount.affectedRows == "1") {
        //console.log("Deletion completed");
        delete_cookie("StreamTogether");
        window.location = "/login";
      } else {
        //console.log("Deletion failed");
      }
    } else {
      //console.log("Delete Account check failed");
    }
  }

  //----------------------functions------------------------------//
  // gets the account information
  async _getInformation() {
    var username = checksession();
    await this._getUserId(username);
    var userId = this.state.userId;

    //console.log("Tries to receive room information of the database");
    //console.log("Found Username: " + username);
    //get user information
    const responseUserInformation = await userFunctionLogin(
      "/login",
      username,
      username
    );
    //console.log(responseUserInformation);
    //console.log("Reg. Complete | Count : " + responseUserInformation.length);
    //check if db push succeed
    if (responseUserInformation.length == "1") {
      //console.log("DB push succeeded");
      //console.log("Get room name");
      //console.log(responseUserInformation);
      //console.log(responseUserInformation[0].current_room_id);
      var currentRoomId = !responseUserInformation[0].current_room_id
        ? ""
        : responseUserInformation[0].current_room_id;
      const responseRoomInformation = await roomFunctionById(
        "/selectRoomById",
        currentRoomId
      );
      if (responseRoomInformation.length == "1") {
        this.setState({
          userId: userId,
          username: username,
          email: responseUserInformation[0].email,
          currentRoom: responseRoomInformation[0].title
        });
      } else {
        this.setState({
          userId: userId,
          username: username,
          email: responseUserInformation[0].email,
          currentRoom: "Currently not in a room"
        });
      }
    } else {
      console.log("Error during database request");
    }
  }

  // gets the username by the userid
  async _getUserId(username) {
    //console.log("Passed username: " + username);
    const response = await userFunctionByUsername(
      "/getuserbyusername",
      username
    );
    //console.log(response);
    //check if db select succeded
    if (response.length == "1") {
      var hashedPassword = response[0].password;
      var currentUserId = response[0].ID;
      //console.log("Found id " + currentUserId);
    } else {
      console.log("Could not resolve username into id");
      var currentUserId = "0";
      var hashedPassword = "";
    }
    this.setState({
      hashedPassword: hashedPassword,
      userId: currentUserId
    });
  }

  //----------------------------------Render-------------------------------//
  render() {
    const activeItem = this.state.activeItem;
    const username = this.state.username;
    const email = this.state.email;
    const currentRoom = this.state.currentRoom;

    /*--------------------Panel----------------------------*/
    const panes = [
      {
        //account info
        menuItem: "Info",
        render: () => (
          <Tab.Pane>
            <Header as="h2">Account Info</Header>
            <Grid>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Image
                    src="../static/userpicture_default.png"
                    size="small"
                    circular
                  />
                </Grid.Column>
                <Grid.Column width={12}>
                  <Grid.Row>
                    <Input
                      icon="users"
                      iconPosition="left"
                      placeholder="Username"
                      readOnly="true"
                      value={username}
                      id="username"
                    />
                    <Label pointing="left">Username</Label>
                  </Grid.Row>
                  <Grid.Row>
                    <Input
                      icon="mail outline"
                      iconPosition="left"
                      placeholder="Email"
                      readOnly="true"
                      value={email}
                      id="email"
                    />
                    <Label pointing="left">E-Mail</Label>
                  </Grid.Row>
                  <Grid.Row>
                    <Input
                      icon="book"
                      iconPosition="left"
                      placeholder="current room"
                      readOnly="true"
                      value={currentRoom}
                      id="currentRoom"
                    />
                    <Label pointing="left">Current Room</Label>
                  </Grid.Row>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Tab.Pane>
        )
      },

      //Password change
      {
        menuItem: "Password change",
        render: () => (
          <Tab.Pane>
            <Header as="h2">Password change</Header>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Popup
                    trigger={
                      <Input
                        icon="privacy"
                        iconPosition="left"
                        id="password"
                        type="password"
                        onChange={this._handleOldPasswordChange}
                        placeholder="Old password"
                      />
                    }
                    content="Put in your current password."
                    size="large"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Popup
                    trigger={
                      <Input
                        icon="privacy"
                        iconPosition="left"
                        id="newPassword"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="At least: 1 uppercase letter, 1 lowercase letter, 1 digit & min. 8 characters"
                        type="password"
                        onChange={this._handleNewPassword1Change}
                        placeholder="New password"
                      />
                    }
                    content="Put in your new password."
                    size="large"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Popup
                    trigger={
                      <Input
                        icon="privacy"
                        iconPosition="left"
                        id="repeatNewPassword"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="At least: 1 uppercase letter, 1 lowercase letter, 1 digit & min. 8 characters"
                        type="password"
                        onChange={this._handleNewPassword2Change}
                        placeholder="Repeat new password"
                      />
                    }
                    content="Repeat in your new password."
                    size="large"
                  />
                </Grid.Column>
                <Grid.Column width={3}>
                  <Button
                    content="Change"
                    icon="right arrow"
                    labelPosition="right"
                    onClick={this._changePassword}
                  />
                </Grid.Column>
                <Grid.Column width={8}>
                  <div id="feedback_password" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Tab.Pane>
        )
      },

      //delete account
      {
        menuItem: "Delete account",
        render: () => (
          <Tab.Pane>
            <Header as="h2">Delete Account</Header>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Popup
                    wide
                    trigger={<Button content="Delete Account" color="red" />}
                    on="click"
                  >
                    <Grid divided columns="equal">
                      <Grid.Column>
                        <Popup
                          trigger={
                            <Checkbox
                              label={<label>Delete Account</label>}
                              onChange={this._handleDeleteAccountChange}
                            />
                          }
                          content="Choose this and click the button to delete your account."
                          position="top center"
                          size="tiny"
                          inverted
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Popup
                          trigger={
                            <Button
                              color="red"
                              content="Delete"
                              onClick={this._deleteAccount}
                              fluid
                            />
                          }
                          content="Check the box left and click this button to delete your account."
                          position="top center"
                          size="tiny"
                          inverted
                        />
                      </Grid.Column>
                    </Grid>
                  </Popup>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Tab.Pane>
        )
      }
    ];

    /*--------------------Page-information-------------------*/
    return (
      <span>
        <OwnHeader>
          <TopBox activeItem={activeItem} layer1="Account settings" />
          <Segment
            style={{ padding: "1em 0em", paddingBottom: "13em" }}
            vertical
          >
            <Grid container stackable verticalAlign="left">
              <Grid.Row>
                <Grid.Column style={{ fluid: true }}>
                  <Tab
                    menu={{ fluid: true, vertical: true, tabular: "right" }}
                    panes={panes}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </OwnHeader>
      </span>
    );
  }
}
