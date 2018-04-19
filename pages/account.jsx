//Imports
import PropTypes from "prop-types";
import React, { Component } from "react";
import Link from "next/link";
import OwnHeader from "../components/Header";
import Navbar from "../components/Navbar";
import { read_cookie } from "sfcookies";
import $ from "jquery";
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

//Nav Bar
export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static get defaultProps() {
    return {
      activeItem: "account"
    };
  }

  componentWillMount(){
   //$("OwnHeader").hide();
  }

  componentDidMount() {
    console.log("Check Cookie");
    if (read_cookie("StreamTogether").length == 0) {
      window.location = "/login";
      console.log("Coockie not found");
    } else {
      $("OwnHeader").show();
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    const activeItem = this.props.activeItem;

    return (
      <span>
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
          <Navbar name={activeItem}/>
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
          </Segment>
        </Visibility>
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
      </OwnHeader>
      </span>
    );
  }
}


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
