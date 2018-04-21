//Imports
import PropTypes from "prop-types";
import React, { Component } from "react";
import Link from "next/link";
import OwnHeader from "../components/Header";
import TopBox from "../components/TopBox";
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
export default class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static get defaultProps() {
    return {
      activeItem: "help"
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
        <TopBox activeItem={activeItem} layer1="Help" />
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
