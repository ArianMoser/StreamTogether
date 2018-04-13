import OwnHeader from "../components/Header";
import Link from "next/link";
import React, { Component } from "react";
import $ from 'jquery';
import {meineFKT} from './PostMethods';

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

    console.log(event.target[0].value)
    console.log(event.target[1].value)

    const response = await meineFKT("/login", event.target[0].value, event.target[1].value)
    console.log(response)
    document.getElementById("test").innerHTML = response[0].Vorname;

  }
  
  render() {
    return (
      <OwnHeader>
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
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                  />
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
                        <Button animated='vertical' fluid>
                          <Button.Content visible>Back home</Button.Content>
                          <Button.Content hidden>
                            <Icon name="home" />
                          </Button.Content>
                        </Button>
                      </Link>
                    </Grid.Column>
                    <Grid.Column>
                      <Link href="/register">
                        <Button animated='vertical' fluid>
                          <Button.Content visible>New?</Button.Content>
                          <Button.Content hidden>
                            Register
                          </Button.Content>
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
