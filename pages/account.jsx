//Imports
import PropTypes from "prop-types";
import React, { Component } from "react";
import Link from "next/link";
import OwnHeader from "../components/Header";
import TopBox from "../components/TopBox";
import { checksession } from "../components/Util";
// import { read_cookie, delete_cookie } from "sfcookies";
import $ from "jquery";
import {
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

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Nav Bar
export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "account",
      deleteAccountCheck: false,
      email: "default-email",
      hashedPassword: "",
      lastRoom: "default-room",
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
  componentWillMount() {
    this.setState({
      deleteAccountCheck: false
    });
  }

  componentDidMount() {
    console.log("Check Cookie");
    if (checksession() == "ErrorTokenFalse") {
      window.location = "/login";
      console.log("Coockie not found");
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
    console.log("Handle password change");

    const oldPassword = this.state.oldPassword;
    const newPassword1 = this.state.newPassword1;
    const newPassword2 = this.state.newPassword2;
    const userId = this.state.userId;

    console.log("oldPassword:  " + oldPassword);
    console.log("newPassword1: " + newPassword1);
    console.log("newPassword2: " + newPassword2);
    console.log("userid:       " + userId);

    //todo: checkPasswordPattern
    if (newPassword1 == newPassword2) {
      console.log("Passwords are equal. Continues ... ");
      //check oldPassword
      if (
        bcrypt.compareSync(oldPassword, this.state.hashedPassword) &&
        this.state.hashedPassword != ""
      ) {
        console.log("Password accepted");
        const responseChangePassword = await changePassword(
          "/updateUserPassword",
          userId,
          newPassword2
        );
        console.log(
          "Reg. Complete | Affected Rows: " +
            responseChangePassword.affectedRows
        );
        //check if db push succeded
        if (responseChangePassword.affectedRows == "1") {
          console.log("DB push succeeded");
          setTimeout(redirect(), 500);
          function redirect() {
            delete_cookie("StreamTogether");
            window.location = "/login";
          }
          //todo: dialog for successful password change
        } else {
          console.log("DB push failed");
        }
      } else {
        console.log("Password wrong");
        //todo: dialog for wrong password
      }
    } else {
      //todo: Dialog password are not equal ()
      console.log("Exception: 'Passwords are not equal'");
    }
  }

  // deletes the account
  async _deleteAccount(event) {
    event.preventDefault();
    console.log("Delete user");
    console.log(this.state);

    const deleteAccountCheck = this.state.deleteAccountCheck;
    const userId = this.state.userId;

    if (deleteAccountCheck) {
      console.log("Delete Account check succeded");
      const responseDeleteAccount = await deleteUser("/deleteUser", userId);
      console.log(
        "Reg. Complete | Affected Rows: " + responseDeleteAccount.affectedRows
      );
      if (responseDeleteAccount.affectedRows == "1") {
        //todo: dialog, that the account has been deleted successfully
        console.log("Deletion completed");
        delete_cookie("StreamTogether");
        window.location = "/login";
      } else {
        console.log("Deletion failed");
        //todo: dialog is missing
      }
    } else {
      console.log("Delete Account check failed");
      //todo: user muss angezeigt werden, dass er erst die checkbox anklicken muss
    }
  }

  //----------------------functions------------------------------//
  // gets the account information
  async _getInformation() {
    var username = checksession();
    await this._getUserId(username);
    var userId = this.state.userId;

    console.log("Tries to receive room information of the database");
    console.log("Found Username: " + username);
    const responseUserInformation = await userFunctionLogin(
      "/login",
      username,
      username
    );
    console.log(responseUserInformation);
    console.log("Reg. Complete | Count : " + responseUserInformation.length);
    if (responseUserInformation.length == "1") {
      console.log("DB push succeeded");
      console.log("Get room name");
      console.log(responseUserInformation);
      console.log(responseUserInformation[0].current_room_id);
      var currentRoomId =
        !responseUserInformation[0].current_room_id
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
          lastRoom: responseRoomInformation[0].title
        });
      } else {
        this.setState({
          userId: userId,
          username: username,
          email: responseUserInformation[0].email,
          lastRoom: "Currently not in a room"
        });
      }
    } else {
      console.log("Error during database request");
    }
  }

  // gets the username by the userid
  async _getUserId(username) {
    console.log("Passed username: " + username);
    const response = await userFunctionByUsername(
      "/getuserbyusername",
      username
    );
    console.log(response);
    if (response.length == "1") {
      var hashedPassword = response[0].password;
      var currentUserId = response[0].ID;
      console.log("Found id " + currentUserId);
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
    const lastRoom = this.state.lastRoom;

    /*--------------------Panel----------------------------*/
    //todo: image dynamisch aus der db holen
    //todo: Account info überarbeiten, dass man auch sieht was angezeigt wird
    // vor allem beim lastRoom sollte ein Label oder so davor
    const panes = [
      {
        menuItem: "Info",
        render: () => (
          <Tab.Pane>
            <Header as="h2">Account Info</Header>
            <Grid>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Image src="../static/minion.png" size="small" circular />
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
                  </Grid.Row>
                  <Grid.Row>
                    <Input
                      icon="users"
                      iconPosition="left"
                      placeholder="last room"
                      readOnly="true"
                      value={lastRoom}
                      id="lastRoom"
                    />
                  </Grid.Row>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Tab.Pane>
        )
      },

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
                <Grid.Column width={5}>
                  <Popup
                    trigger={
                      <Input
                        icon="privacy"
                        iconPosition="left"
                        id="repeatNewPassword"
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
              </Grid.Row>
            </Grid>
          </Tab.Pane>
        )
      },
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
