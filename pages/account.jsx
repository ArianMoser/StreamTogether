//Imports
import PropTypes from "prop-types";
import React, { Component } from "react";
import Link from "next/link";
import OwnHeader from "../components/Header";
import {
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
  Tab,
  Input,
  Popup,
  Modal,
  Checkbox
} from "semantic-ui-react";

//Header Settings
const HomepageHeading = () => (
  <Container text>
    <Header
      as="h1"
      content="Account settings"
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
                  <Menu.Item
                    name="home"
                    active={activeItem === "home"}
                    onClick={this.handleItemClick}
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
                  <Link href="/account">
                    <Menu.Item
                      name="account"
                      active={activeItem === "account"}
                      onClick={this.handleItemClick}
                      active
                    >
                      Account
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

const panes = [
  {
    menuItem: "Info",
    render: () => (
      <Tab.Pane>
        <Header as="h2">Account Info</Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image src="../static/minion.png" size="small" circular />
            </Grid.Column>
            <Grid.Column width={12}>
              <Grid.Row>
                <Input
                  icon="users"
                  iconPosition="left"
                  placeholder="Username"
                  readOnly="true"
                  id="username"
                />
              </Grid.Row>
              <Grid.Row>
                <Input
                  icon="mail outline"
                  iconPosition="left"
                  placeholder="Email"
                  readOnly="true"
                  id="email"
                />
              </Grid.Row>
              <Grid.Row>
                <Input
                  icon="users"
                  iconPosition="left"
                  placeholder="last room"
                  readOnly="true"
                  id="lastRoom"
                />
              </Grid.Row>
              <Grid.Row>
                <Input
                  icon="users"
                  iconPosition="left"
                  placeholder="Username"
                  readOnly="true"
                />
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Tab.Pane>
    )
  },

  {
    menuItem: "Password change",
    render: () => (
      <Tab.Pane>
        <Header as="h2">Password change</Header>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Popup
                trigger={
                  <Input
                    icon="privacy"
                    iconPosition="left"
                    placeholder="Old password"
                    id="password"
                  />
                }
                content="Put in your current password."
                size="large"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Popup
                trigger={
                  <Input
                    icon="privacy"
                    iconPosition="left"
                    placeholder="New password"
                    id="newPassword"
                  />
                }
                content="Put in your new password."
                size="large"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}>
              <Popup
                trigger={
                  <Input
                    icon="privacy"
                    iconPosition="left"
                    placeholder="Repeat new password"
                    id="repeatNewPassword"
                  />
                }
                content="Repeat in your new password."
                size="large"
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <Button
                content="Change"
                icon="right arrow"
                labelPosition="right"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Tab.Pane>
    )
  },
  {
    menuItem: "Delete account",
    render: () => (
      <Tab.Pane>
        <Header as="h2">Delete Account</Header>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Popup
                wide
                trigger={<Button content="Delete Account" color="red" />}
                on="click"
              >
                <Grid divided columns="equal">
                  <Grid.Column>
                    <Popup
                      trigger={
                        <Checkbox label={<label>Delete Account</label>} />
                      }
                      content="Choose this and click the button to delete your account."
                      position="top center"
                      size="tiny"
                      inverted
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Popup
                      trigger={<Button color="red" content="Delete" fluid />}
                      content="Check the box left and click this button to delete your account."
                      position="top center"
                      size="tiny"
                      inverted
                    />
                  </Grid.Column>
                </Grid>
              </Popup>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Tab.Pane>
    )
  }
];

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: "1em 0em", paddingBottom: "13em" }} vertical>
      <Grid container stackable verticalAlign="left">
        <Grid.Row>
          <Grid.Column style={{ fluid: true }}>
            <Tab
              menu={{ fluid: true, vertical: true, tabular: "right" }}
              panes={panes}
            />
          </Grid.Column>
        </Grid.Row>
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
