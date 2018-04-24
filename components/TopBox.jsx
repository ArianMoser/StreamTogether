import React, { Fragment, Component } from "react";
import Navbar from "../components/Navbar";
import {
  Container,
  Header,
  Segment,
  Visibility
} from "semantic-ui-react";
import PropTypes from "prop-types";

export default class TopBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixed: false
    };
  }

  static get defaultProps() {
    return {
      layer1: "",
      layer2: "",
      layer3: "",
      activeItem: "empty"
    };
  }

  static propTypes = {
    layer1: PropTypes.string,
    layer2: PropTypes.string,
    layer3: PropTypes.string,
    activeItem: PropTypes.string
  }


  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const layer1 = this.props.layer1;
    const layer2 = this.props.layer2;
    const layer3 = this.props.layer3;
    const activeItem = this.props.activeItem;
    const fixed = this.state.fixed

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
          <Navbar name={activeItem} fixed={fixed}/>
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
