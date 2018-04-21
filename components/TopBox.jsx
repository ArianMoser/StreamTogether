import React, { Fragment, Component } from "react";
import Navbar from "../components/Navbar";
import {
  Container,
  Header,
  Segment,
  Visibility
} from "semantic-ui-react";

export default class TopBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static get defaultProps() {
    return {
      layer1: "",
      layer2: "",
      layer3: "",
      activeItem: "empty"
    };
  }

  render() {
    const layer1 = this.props.layer1;
    const layer2 = this.props.layer2;
    const layer3 = this.props.layer3;
    const activeItem = this.props.activeItem;

    return (
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
              content={layer1}
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
              content={layer2}
              inverted
              style={{
                fontSize: "1.7em",
                fontWeight: "normal",
                marginTop: "1.5em"
              }}
            />
            <Header
              as="h2"
              content={layer3}
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
    );
  }
}
