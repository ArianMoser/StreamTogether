//Imports
import PropTypes from "prop-types";
import React, { Component } from "react";
import Link from "next/link";
import OwnHeader from "../components/Header";
import TopBox from "../components/TopBox";
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
  Visibility
} from "semantic-ui-react";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "empty"
    };
  }

  //-------------------------------Render----------------------------------//
  render() {
    const activeItem = this.state.activeItem;

    return (
      <OwnHeader>
        <TopBox activeItem={activeItem} layer1="Contact" />
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <List>
                  <List.Item>
                    <List.Icon name="users" size="big" />
                    <List.Content>
                      <Header as="h4">Max Mustermann</Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="marker" size="big" />
                    <List.Content>
                      <Header as="h4">Musterstra&szlig;e 111</Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="mail" size="big" />
                    <List.Content>
                      <Header as="h4">
                        <a href="mailto:mustermann@musterfirma.de">
                          mustermann@musterfirma.de
                        </a>
                      </Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="linkify" size="big" />
                    <List.Content>
                      <Header as="h4">
                        <a href="http://gruppe2.testsites.info">
                          gruppe2.testsites.info
                        </a>
                      </Header>
                    </List.Content>
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={8}>
                <iframe
                  width="100%"
                  height="400"
                  src="https://maps.google.de/maps?hl=de&q=Akurala%20Beach&t=&z=15&ie=UTF8&iwloc=B&output=embed"
                  frameBorder="0"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </OwnHeader>
    );
  }
}
