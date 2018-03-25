import React, { Component } from "react";
import OwnHeader from "../components/Header";
import Link from "next/link";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

export default class Index extends Component {

    constructor(props)
    {
        super(props);
        this.state={}
    }

    logging=()=>
    {
        console.log("hier")
        this.setState({loggedIn:!this.state.loggedIn})
    }

  render() {
    return (
      <OwnHeader isLoggedIn={this.state.loggedIn}>
      <Link>
        <Button onClick={href='/index'}>Ein/Ausloggen</Button>
      </Link>
        State: {this.state.loggedIn===true?" state eingeloggt":"state  ausgeloggt"}

        <div className="login-form">
          <Grid
            textAlign="center"
            style={{ height: "100%" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="teal" textAlign="center">
                <Image src="./static/logo.png" /> Log-in to your account
              </Header>
              <Form size="large">
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                  />

                  <Button color="teal" fluid size="large">
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                New to us? <a href="#">Sign Up</a>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      </OwnHeader>
    );
  }
}
