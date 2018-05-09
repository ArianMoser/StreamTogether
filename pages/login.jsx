//--------------------------------Imports-------------------------------//
import OwnHeader from "../components/Header";
import Link from "next/link";
import React, { Component } from "react";
import $ from "jquery";
import { userFunctionLogin } from "./PostMethods";
import { bake_cookie} from "sfcookies";
import {checksession, checksessionfortempuser} from "../components/Util";
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

//--------------------------------Declarations-------------------------------//
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() is invoked immediately after a component is mounted
  // if user is log in, redirect to index
  componentDidMount() {
    if (checksession() != "ErrorTokenFalse" &&  checksessionfortempuser() == "no")
    {
      window.location = "/";
    }
  }

  //----------------------------event handlers---------------------------//
  // handles the login event
  async onSubmitHandler(event) {
    event.preventDefault();

    const username = event.target[0].value;
    const password = event.target[1].value;

    console.log("Username : " + username);
    console.log("Passwort : " + password);

    //check if user exist
    const response = await userFunctionLogin("/login", username, username);
    console.log(response);
    //check response
    if (response.length == "0") {
      console.log("No user found");
      document.getElementById("feedback").innerHTML =
        '<div class="ui negative message"><div class="header">Error</div><p>Username or Password not correct</p></div>';
    } else {
      console.log("User found");
      //check if password is equal
      if (bcrypt.compareSync(password, response[0].password)) {
        document.getElementById("test").innerHTML =
          "Welcome " + response[0].username;
        console.log("Password correct!");
        document.getElementById("feedback").innerHTML =
          '<div class="ui positive message"><div class="header">Login successful</div><p>Forwarding...</p></div>';
        setTimeout(continueToLogIn, 2000);
        function continueToLogIn() {
          //Set Cookie
          var sessiontoken = jwt.sign(
            {
              username: response[0].username,
              tempuser: "no",
              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
            },
            "shhhhh"
          );
          console.log(sessiontoken);
          bake_cookie("StreamTogether", sessiontoken);
          window.location = "./index";
        }
      } else {
        console.log("Password incorrect");
        document.getElementById("feedback").innerHTML =
          '<div class="ui negative message"><div class="header">Error</div><p>Username or Password not correct</p></div>';
      }
    }
  }
  //----------------------------------Render-------------------------------//
  render() {
    return (
      <OwnHeader useFooter={false} useHeader={false}>
        <div className="login-site">
          <style>{` body > div ,
                    body > div > div,
                    body > div > div > div.login-site {
                    height: 100%;}
          `}</style>
          <Grid
            textAlign="center"
            style={{ height: "100%" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 400 }}>
              <Image src="../static/logo.png" centered />
              <Header as="h1" color="black" textAlign="center">
                Login to your account
              </Header>
              <Form size="large" onSubmit={this.onSubmitHandler}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Username/E-Mail"
                    required
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    required
                  />
                  <div id="feedback" />
                  <br />
                  <Button color="green" fluid size="large" id="test">
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                <Grid celled="internally" columns="equal" stackable>
                  <Grid.Row textAlign="center">
                    <Grid.Column>
                      <Link href="/">
                        <Button animated="vertical" fluid>
                          <Button.Content visible>Back home</Button.Content>
                          <Button.Content hidden>
                            <Icon name="home" />
                          </Button.Content>
                        </Button>
                      </Link>
                    </Grid.Column>
                    <Grid.Column>
                      <Link href="/register">
                        <Button animated="vertical" fluid>
                          <Button.Content visible>New?</Button.Content>
                          <Button.Content hidden>Register</Button.Content>
                        </Button>
                      </Link>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      </OwnHeader>
    );
  }
}
