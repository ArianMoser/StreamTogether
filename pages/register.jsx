import OwnHeader from "../components/Header";
import Link from "next/link";
import React, { Component } from "react";
import {registerFunction} from './PostMethods';
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

    console.log(event.target[0].value);
    console.log(event.target[1].value); //PASSWORT HASH VERWENDEN!
    console.log(event.target[2].value);
    console.log(event.target[3].value);

    if (event.target[2].value == event.target[3].value) {
      const response = await registerFunction(
        "/register",
        event.target[0].value,
        event.target[1].value,
        event.target[2].value
      );
      console.log("Register Complete! Number of records inserted: " + response);
    } else {
      console.log("Password not equal!");
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
              <Form size="large" onSubmit={this.onSubmitHandler}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                  />
                  <Form.Input                                                     //KRITERIEN FÜR EINGABEN NOCH HINZUFÜGEN!
                    fluid
                    icon="mail"
                    iconPosition="left"
                    placeholder="E-Mail"
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Repeat password"
                    type="password"
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
