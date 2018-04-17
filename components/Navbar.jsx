import React, { Fragment, Component } from "react";
import Link from "next/link";
import {
  Button,
  Container,
  Menu
} from "semantic-ui-react";


export default class Navbar extends Component {
  state = {};

  constructor(props){
    super(props);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    const { activeItem } = this.state;
    return (
      <Menu
        fixed={fixed ? "top" : null}
        inverted={!fixed}
        secondary={!fixed}
        size="large"
      >
        <Container>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
            active
          >
            Start
          </Menu.Item>
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
    );
  }
}
