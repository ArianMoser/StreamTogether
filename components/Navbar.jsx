import React, { Fragment, Component } from "react";
import Link from "next/link";
import { Button, Container, Menu } from "semantic-ui-react";
import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";

export default class Navbar extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.logoutFunction = this.logoutFunction.bind(this);
  }
 
  static get defaultProps() {
    return {
      name: "home"
    };
  }

  componentDidMount() {
    this.setState({ activeItem: this.props.name });
    console.log("penis" + this.props.name);
    console.log("Cookie ist gesetzt als : " + read_cookie("StreamTogether"));
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  logoutFunction(event) {
    if (read_cookie("StreamTogether").length != 0) {
      delete_cookie("StreamTogether");
      window.location = "/login";
    }
  }

  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    const activeItem = this.props.name;
    var buttonPlaceholder = "";

    if (read_cookie("StreamTogether").length != 0) {
      // TODO: Ausloggen button hiermit
      var buttonPlaceholder = (
        <span>
          <Link href="/account">
            <Button inverted={!fixed} color="green">
              Account
            </Button>
          </Link>
            <Button
              as="logOut"
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

    console.log("penis1");
    console.log(activeItem);
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
