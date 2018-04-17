import OwnHeader from "../components/Header";
import Link from "next/link";
import React, { Component } from "react";
import $ from "jquery";
import { userFunctionLogin } from "./PostMethods";
const bcrypt = require("bcryptjs");

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
  async onSubmitHandler(event) {
    event.preventDefault();

    const username = event.target[0].value;
    const password = event.target[1].value;

    console.log("Username : " + username);
    console.log("Passwort : " + password);

    const response = await userFunctionLogin("/login", username);
    console.log(response);
    if (response.length == "0") {
      console.log("No user found");
      document.getElementById("feedback").innerHTML =
        '<div class="ui negative message"><div class="header">Error</div><p>Username or Password not correct</p></div>';
    } else {
      console.log("User found");
      if (bcrypt.compareSync(password, response[0].password)) {
        document.getElementById("test").innerHTML = response[0].username;
        console.log("Password correct!");
        document.getElementById("feedback").innerHTML =
          '<div class="ui positive message"><div class="header">Login successful</div><p>You will be redirected</p></div>';
        setTimeout(continueToLogIn, 2000);
        function continueToLogIn() {
          window.location = "./index";
        }
      } else {
        console.log("Password incorrect");
        document.getElementById("feedback").innerHTML =
          '<div class="ui negative message"><div class="header">Error</div><p>Username or Password not correct</p></div>';
      }
    }
  }

  render() {
    return (
      <OwnHeader useFooter={false} useHeader={false}>
        <div className="login-site">
          <style>{` body > div,
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
