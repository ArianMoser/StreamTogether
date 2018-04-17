import React, { Component } from "react";
import OwnHeader from "../components/Header";
import Navbar from "../components/Navbar";
import PropTypes from "prop-types";
import Link from "next/link";
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
  Visibility
} from "semantic-ui-react";

//Nav Bar
class DesktopContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static get defaultProps() {
    return {
      activeItem: "rooms"
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
            <Navbar name={activeItem} />
            <Container text>
              <Header
                as="h1"
                content="Available rooms"
                inverted
                style={{
                  fontSize: "4em",
                  fontWeight: "normal",
                  marginBottom: 0,
                  marginTop: "2em"
                }}
              />
              <Header
                as="h2"
                content="Stream videos with your friends!"
                inverted
                style={{
                  fontSize: "1.7em",
                  fontWeight: "normal",
                  marginTop: "1.5em"
                }}
              />
              <Header
                as="h2"
                content="Or just meet new friends!"
                inverted
                style={{
                  fontSize: "1.7em",
                  fontWeight: "normal",
                  marginTop: "1.5em"
                }}
              />
            </Container>
          </Segment>
        </Visibility>
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Card>
                  <Image src="../static/minion.png" />
                  <Card.Content>
                    <Card.Header>Super Geile Mukke 123</Card.Header>
                    <Card.Meta>
                      <span className="username">Hexenmühle97</span>
                    </Card.Meta>
                    <Card.Description>
                      Hier wird nur die geilste Musik auf Erden wiedergegeben :D
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Icon name="music" />
                    22 active user
                    <Button
                      icon
                      color="blue"
                      labelPosition="right"
                      floated="right"
                    >
                      Join
                      <Icon name="right arrow" />
                    </Button>
                  </Card.Content>
                </Card>
              </Grid.Column>

              <Grid.Column width={8}>
                <Card>
                  <Image src="../static/minion.png" />
                  <Card.Content>
                    <Card.Header>Super Geile Mukke 123</Card.Header>
                    <Card.Meta>
                      <span className="username">Hexenmühle97</span>
                    </Card.Meta>
                    <Card.Description>
                      Hier wird nur die geilste Musik auf Erden wiedergegeben :D
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Icon name="music" />
                    22 active user
                    <Button
                      icon
                      color="blue"
                      labelPosition="right"
                      floated="right"
                    >
                      Join
                      <Icon name="right arrow" />
                    </Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <Card>
                  <Image src="../static/minion.png" />
                  <Card.Content>
                    <Card.Header>Super Geile Mukke 123</Card.Header>
                    <Card.Meta>
                      <span className="username">Hexenmühle97</span>
                    </Card.Meta>
                    <Card.Description>
                      Hier wird nur die geilste Musik auf Erden wiedergegeben :D
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Icon name="music" />
                    22 active user
                    <Button
                      icon
                      color="blue"
                      labelPosition="right"
                      floated="right"
                    >
                      Join
                      <Icon name="right arrow" />
                    </Button>
                  </Card.Content>
                </Card>
              </Grid.Column>

              <Grid.Column width={8}>
                <Card>
                  <Image src="../static/minion.png" />
                  <Card.Content>
                    <Card.Header>Super Geile Mukke 123</Card.Header>
                    <Card.Meta>
                      <span className="username">Hexenmühle971</span>
                    </Card.Meta>
                    <Card.Description>
                      Hier wird Alex penis gelutscht :D
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Icon name="music" />
                    22 active user
                    <Button
                      icon
                      color="blue"
                      labelPosition="right"
                      floated="right"
                    >
                      Join
                      <Icon name="right arrow" />
                    </Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </OwnHeader>
    );
  }
}

export default DesktopContainer;
