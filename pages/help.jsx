//Imports
import PropTypes from "prop-types";
import React, { Component } from "react";
import Link from "next/link";
import OwnHeader from "../components/Header";
import {
  Card,
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
  Accordion,
  activeIndex,
  Statistic
} from "semantic-ui-react";

//Nav Bar
class DesktopContainer extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    const { activeItem } = this.state;

    return (
      <OwnHeader>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            color="black"
            textAlign="center"
            style={{ minHeight: 550, padding: "1em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Link href="/index">
                  <Menu.Item
                    name="home"
                    active={activeItem === "home"}
                    onClick={this.handleItemClick}
                  >
                    Start
                  </Menu.Item>
                </Link>
                <Link href="/rooms">
                  <Menu.Item
                    name="rooms"
                    active={activeItem === "rooms"}
                    onClick={this.handleItemClick}
                  >
                    Rooms
                  </Menu.Item>
                </Link>
                <Link href="/help">
                  <Menu.Item
                    name="help"
                    active={activeItem === "help"}
                    onClick={this.handleItemClick}
                    active
                  >
                    Help
                  </Menu.Item>
                </Link>
                <Menu.Item position="right">
                  <Link href="/login">
                    <Button as="logIn" inverted={!fixed} color="green">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      as="signUp"
                      inverted={!fixed}
                      color="orange"
                      style={{ marginLeft: "0.5em" }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </Menu.Item>
              </Container>
            </Menu>
            <Container text>
              <Header
                as="h1"
                content="Help"
                inverted
                style={{
                  fontSize: "4em",
                  fontWeight: "normal",
                  marginBottom: 0,
                  marginTop: "3em"
                }}
              />
            </Container>
          </Segment>
        </Visibility>
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <p style={{ fontSize: "1.33em" }}>
                  Here are some important things that may will help you.
                </p>
                <p> Alex has a small penis</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </OwnHeader>
    );
  }
}

export default DesktopContainer;
