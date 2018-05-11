//--------------------------------Imports-------------------------------//
import React, { Fragment, Component } from "react";
import Link from "next/link";
import { Button, Container, Menu } from "semantic-ui-react";
import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";
import PropTypes from "prop-types";
import {checksession, checksessionfortempuser} from "./Util";

//****************************************************************************
//This component creates the header/navbar and controles which buttons are visible
//****************************************************************************

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    //bind event handler
    this.logoutFunction = this.logoutFunction.bind(this);
  }

  static get defaultProps() {
    return {
      name: "home",
      fixed: true
    };
  }

  static propTypes = {
    name: PropTypes.string,
    fixed: PropTypes.bool
  };

  //-------------------------functions of react----------------------------//
  // componentDidMount() is invoked immediately after a component is mounted
  componentDidMount() {
    this.setState({ activeItem: this.props.name });
    var answer = checksession();
    console.log("Current user: '" + answer + "'");
    console.log("Active Item: " + this.props.name);
  }

  //----------------------------event handlers---------------------------//
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  //----------------------functions------------------------------//
  // deletes the cookie and redirect the user to the login page
  logoutFunction(event) {
    if (read_cookie("StreamTogether").length != 0) {
      delete_cookie("StreamTogether");
      window.location = "/";
    }
  }

  //----------------------------------Render-------------------------------//
  render() {
    const fixed = this.props.fixed;
    const activeItem = this.props.name;
    var buttonPlaceholder = "";

    // If no cookie is set or user is a temp user then...
    if (checksession() != "ErrorTokenFalse" && checksessionfortempuser() == "no") {
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
            <Button inverted={!fixed} color="green">
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

    //return
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
