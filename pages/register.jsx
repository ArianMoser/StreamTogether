import OwnHeader from "../components/Header";
import Link from "next/link";
import React, { Component } from "react";
import $ from "jquery";
import {
  registerFunction,
  userFunctionByUsername,
  userFunctionByEmail
} from "./PostMethods";
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

export default class register extends Component {
  async onSubmitHandler(event) {
    event.preventDefault();

    const username = event.target[0].value;
    const email = event.target[1].value;
    const pw = event.target[2].value;
    const pw2 = event.target[3].value;

    console.log("Input :" + username);
    console.log("Input :" + email);
    console.log("Input :" + pw);
    console.log("Input :" + pw2);

    var userExpression = /^[A-Za-z0-9_]{1,32}$/;
    var emailExpression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    var pwExpression = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    //Check Regex Statements
    if (
      userExpression.test(username) &&
      emailExpression.test(email) &&
      pwExpression.test(pw) &&
      pwExpression.test(pw2)
    ) {
      //Check if Passwords are equal!
      if (pw == pw2) {
        const responSelectUsername = await userFunctionByUsername(
          "/getuserbyusername",
          username
        );
        console.log(
          "Number of entries in the database with username " +
            username +
            " :" +
            responSelectUsername.length
        );
        //Check if Username is Used!
        if (responSelectUsername.length == "0") {
          const responSelectEmail = await userFunctionByEmail(
            "/getuserbyemail",
            email
          );
          console.log(
            "Number of entries in the database with email " +
              email +
              " :" +
              responSelectEmail.length
          );
          //Check if Email is Used!
          if (responSelectEmail.length == "0") {
            //Send Registration
            const responseRegister = await registerFunction(
              "/register",
              username,
              email,
              pw
            );
            console.log(
              "Reg. Complete | Affected Rows: " + responseRegister.affectedRows
            );
            document.getElementById("feedback").innerHTML =
              '<div class="ui positive message"><div class="header">Registration successful</div><p>You may now log-in with the username you have chosen</p></div>';
            //window.location = "./login";
          } else {
            console.log("Email is Used!");
            document.getElementById("feedback").innerHTML =
              '<div class="ui negative message"><div class="header">Email is already used</div><p>Please choose a different email</p></div>';
          }
        } else {
          console.log("Username is Used!");
          document.getElementById("feedback").innerHTML =
            '<div class="ui negative message"><div class="header">Username is already used</div><p>Please choose a different username</p></div>';
        }
      } else {
        console.log("Password not Equal!");
        document.getElementById("feedback").innerHTML =
          '<div class="ui negative message"><div class="header">Passwords are not equal</div><p>Please enter your password again</p></div>';
      }
    } else {
      document.getElementById("feedback").innerHTML =
        '<div class="ui negative message"><div class="header">Error</div><p>Hack detected</p></div>';
    }
  }

  render() {
    return (
      <OwnHeader>
        <div className="register-site">
          <style>{` body > div,
                    body > div > div,
                    body > div > div > div.register-site {
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
                Register a new account
              </Header>
              <Form error size="large" onSubmit={this.onSubmitHandler}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                    pattern="^[A-Za-z0-9_]{1,32}$"
                    required
                  />
                  <Form.Input
                    fluid
                    icon="mail"
                    iconPosition="left"
                    placeholder="E-Mail"
                    pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
                    required
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    required
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Repeat password"
                    type="password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    required
                  />
                  <div id="feedback" />
                  <br />
                  <Button color="orange" fluid size="large">
                    Register
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
                      <Link href="/login">
                        <Button animated="vertical" fluid>
                          <Button.Content visible>Account?</Button.Content>
                          <Button.Content hidden>Login</Button.Content>
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
