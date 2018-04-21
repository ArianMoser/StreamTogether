import React, { Fragment, Component } from "react";
import Link from "next/link";
import { Button, Container, Menu } from "semantic-ui-react";
import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";
const jwt = require("jsonwebtoken");

export default class Navbar extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.logoutFunction = this.logoutFunction.bind(this);
  }

  static get defaultProps() {
    return {
      name: "home",
      fixed: true
    };
  }

  //Checksession
  checksession() {
    if (read_cookie("StreamTogether").length != 0) {
      try {
        var decodedsession = jwt.verify(
          read_cookie("StreamTogether"),
          "shhhhh"
        );
        return decodedsession.username;
      } catch (err) {
        console.log("Error-Message: " + err.message);
        return "ErrorTokenFalse";
      }
    } else {
      return "ErrorTokenFalse";
    }
  }

  componentDidMount() {
    this.setState({ activeItem: this.props.name });
    var answer = this.checksession();
    console.log("Current user: '" + answer + "'");
    console.log("Active Item: " + this.props.name);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  logoutFunction(event) {
    if (read_cookie("StreamTogether").length != 0) {
      delete_cookie("StreamTogether");
      window.location = "/login";
    }
  }

  render() {
    const fixed = this.props.fixed;
    const activeItem = this.props.name;
    var buttonPlaceholder = "";

    if (this.checksession() != "ErrorTokenFalse") {
      // TODO: Ausloggen button hiermit
      var buttonPlaceholder = (
        <span>
          <Link href="/account">
            <Button inverted={!fixed} color="green">
              Account
            </Button>
          </Link>
          <Button
            inverted={!fixed}
            color="red"
            style={{ marginLeft: "0.5em" }}
            onClick={this.logoutFunction}
          >
            Log Out
          </Button>
        </span>
      );
    } else {
      var buttonPlaceholder = (
        <span>
          <Link href="/login">
            <Button as="logIn" inverted={!fixed} color="green">
              Log In
            </Button>
          </Link>
          <Link href="/register">
            <Button
              inverted={!fixed}
              color="orange"
              style={{ marginLeft: "0.5em" }}
            >
              Sign Up
            </Button>
          </Link>
        </span>
      );
    }

    //console.log("fixed" + this.state.fixed);

    return (
      <Menu
        fixed={fixed ? "top" : null}
        inverted={!fixed}
        secondary={!fixed}
        size="large"
      >
        <Container>
          <Link href="/">
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
            >
              Start
            </Menu.Item>
          </Link>
          <Link href="/roomOverview">
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
            >
              Help
            </Menu.Item>
          </Link>
          <Menu.Item position="right">{buttonPlaceholder}</Menu.Item>
        </Container>
      </Menu>
    );
  }
}
