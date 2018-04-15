import React, { Fragment, Component } from "react";
import Link from "next/link";
import {
  Container,
Header,
List,
  Grid,
  Segment,

} from "semantic-ui-react";

export default class Footer extends Component {
  render() {
    return (
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
    );
  }
}
