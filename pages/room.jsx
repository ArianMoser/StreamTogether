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
import Navbar from "../components/Navbar"

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


export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static get defaultProps() {
    return {
      activeItem: "empty"
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    const activeItem = this.props.activeItem;

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
            <Navbar name={activeItem}></Navbar>
              <HomepageHeading />
            </Segment>
          </Visibility>
          <Segment style={{ padding: "8em 0em" }} vertical>
            <Grid container stackable verticalAlign="middle">
              <List divided verticalAlign='middle'>
                <YouTubeSearch></YouTubeSearch>
              </List>
            </Grid>
          </Segment>
      </OwnHeader>
    );
  }
}
