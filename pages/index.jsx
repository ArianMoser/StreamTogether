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
  Visibility
} from "semantic-ui-react";
import TopBox from "../components/TopBox";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "home" };
  }

  //----------------------------------Render-------------------------------//
  render() {
    const activeItem = this.state.activeItem;

    return (
      <OwnHeader activeName={activeItem}>
        <TopBox activeItem={activeItem} layer1="Welcome on StreamTogether" />
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h1" style={{ fontSize: "2em" }}>
                  StreamTogether step for step
                </Header>
                <Header as="h4" style={{ fontSize: "2em" }}>
                  Step 1:
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  <Link href="./createRoom">
                    <Button primary size="huge">
                      Create Room
                      <Icon name="right arrow" />
                    </Button>
                  </Link>
                </p>
                <p style={{ fontSize: "1.33em" }}>
                  You do not need to register to create a room.
                </p>
                <p style={{ fontSize: "1.33em" }}>
                  But: Get more functions by creating your own account!
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={7}>
                <Image
                  bordered
                  rounded
                  size="large"
                  src="../static/MusicListen.jpg"
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h4" style={{ fontSize: "2em" }}>
                  Step 2:
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  Share your room with others by inviting them.
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={7}>
                <Image
                  bordered
                  rounded
                  size="large"
                  src="../static/Tomorrowland2015.jpg"
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h4" style={{ fontSize: "2em" }}>
                  Step 3:
                </Header>
                <p style={{ fontSize: "1.33em" }}>Watch. Videos. Together.</p>
              </Grid.Column>
              <Grid.Column floated="right" width={7}>
                <Image bordered rounded size="large" src="../static/yt.png" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment style={{ padding: "0em" }} vertical>
          <Grid celled="internally" columns="equal" stackable>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Header as="h4" style={{ fontSize: "2em" }}>
                  Why do you should use StreamTogether?
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign="center">
              <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  Stream with friends
                </Header>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  Another reason
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  <Image avatar src="../static/Tomorrowland2015.jpg" />
                  <b>I/b> am the BOSS</b>
                </p>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  And one more reason
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  <Image avatar src="../static/Tomorrowland2015.jpg" />
                  <b>I</b> am the <b>BOSS</b>
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </OwnHeader>
    );
  }
}
