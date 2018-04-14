import OwnHeader from "../components/Header";
import Link from "next/link";
import React, { Component } from "react";
import $ from "jquery";
import { registerFunction, userFunctionByUsername, userFunctionByEmail } from "./PostMethods";
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
    const pw = event.target[2].value
    const pw2 = event.target[3].value

    console.log("Input :" + username);
    console.log("Input :" + email);
    console.log("Input :" + pw);
    console.log("Input :" + pw2);

    //Check if Passwords are equal!
    if (pw == pw2) {
      const responSelectUsername = await userFunctionByUsername("/getuserbyusername", username);
      console.log("Number of entries in the database with username " + username + " :" + responSelectUsername.length);
      //Check if Username is Used!
      if (responSelectUsername.length == "0")
      {
        const responSelectEmail = await userFunctionByEmail("/getuserbyemail", email);
        console.log("Number of entries in the database with email " + email + " :" + responSelectEmail.length);  
        if (responSelectEmail.length == "0")
        {
          const responseRegister = await registerFunction(
            "/register",
            username,
            email,
            pw
          );
          console.log("Reg. Complete | Affected Rows: " + responseRegister.affectedRows);
        }else {
          console.log("Email is Used!");
        }
        
      } else{
        console.log("Username is Used!");
      }
    } else {
      console.log("Password not Equal!");
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
                    required
                  />
                  <Form.Input //KRITERIEN FÜR EINGABEN NOCH HINZUFÜGEN!
                    fluid
                    icon="mail"
                    iconPosition="left"
                    placeholder="E-Mail"
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
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Repeat password"
                    type="password"
                    required
                  />
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
