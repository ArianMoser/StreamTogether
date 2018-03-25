import OwnHeader from "../components/Header";
import Link from "next/link";
import React, { Component } from "react";
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
              <Form size="large">
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
                  <Button color="green" fluid size="large">
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
