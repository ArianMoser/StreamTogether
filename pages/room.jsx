import {
  Button,
  Container,
  Grid,
  Header,
  List,
  Menu,
  Responsive,
  Segment,
  Visibility
} from 'semantic-ui-react';
import Link from "next/link";
import React, { Component } from "react";

import PropTypes from "prop-types";

import OwnHeader from "../components/Header";
import YouTubeSearch from "../components/YouTubeSearch";


const HomepageHeading = () => (
  <Container text>
    <Header
      as="h1"
      content="Your room"
      inverted
      style={{
        fontSize: "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: "2em"
      }}
    />


  </Container>
);



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

        <Responsive {...Responsive.onlyComputer}>
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              inverted
              color="grey"
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
				<Link href="/test">
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
					  active
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
              <HomepageHeading />
            </Segment>
          </Visibility>
          {children}
        </Responsive>
      </OwnHeader>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <List divided verticalAlign='middle'>
          <YouTubeSearch></YouTubeSearch>
        </List>
      </Grid>
    </Segment>



    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <Link href="/contact">
                  <List.Item as="a">Contact Us</List.Item>
                </Link>
                <Link href="/impressum">
                  <List.Item as="a">Impressum</List.Item>
                </Link>
                <Link href="/dataprivacy">
                  <List.Item as="a">Data privacy</List.Item>
                </Link>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <Link href="/help">
                  <List.Item as="a">Help</List.Item>
                </Link>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted>
                Footer Header
              </Header>
              <p>Bla Bla BLAAA Bla Bla Bla Bla BLaaaa MIMIMIMIM</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);

export default HomepageLayout;
