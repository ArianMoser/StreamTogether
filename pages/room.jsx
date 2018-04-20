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
} from "semantic-ui-react";
import Link from "next/link";
import React, { Component } from "react";
import PropTypes from "prop-types";
import OwnHeader from "../components/Header";
import YouTubeSearch from "../components/YouTubeSearch";
import Navbar from "../components/Navbar";
import { roomFunctionByHashedValue } from "./PostMethods";
export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static get defaultProps() {
    return {
      activeItem: "empty", //active item of the Navbar
      creator: "default-creator",
      description: "Default-description",
      id: "0",
      title: "Default-title",
      userlist: {}
    };
  }

  componentWillMount() {
    this._getInformation();
  }

  componentDidMount() {
    //
  }

  async _getInformation() {
    var title = "Test-title";
    var hashedValue = this.props.url.query.hv;
    console.log("Tries to receive room information of the database");
    console.log("hashedValue :" + hashedValue);

    const responseRoomInformation = await roomFunctionByHashedValue(
      "/selectRoomInformation",
      hashedValue
    );
    console.log("Reg. Complete | Count : " + responseRoomInformation.length);
    //check if db push succeded
    if (responseRoomInformation.length == "1") {
      console.log("DB push succeeded");
      console.log(responseRoomInformation);
      console.log("RoomId:      " + responseRoomInformation[0].ID);
      console.log("Title:       " + responseRoomInformation[0].title);
      console.log("Ersteller:   " + responseRoomInformation[0].Ersteller);
      console.log("Description: " + responseRoomInformation[0].description);
      this.setState({
        roomid: responseRoomInformation[0].ID,
        title: responseRoomInformation[0].title,
        creator: responseRoomInformation[0].Ersteller,
        description: responseRoomInformation[0].description
      });
    } else {
      // exception during room creation db push
      // todo: add dialog
      console.log("DB push failed");
    }
    this.setState({
      roomid: this.probs.id,
      title: this.probs.title,
      creator: this.probs.creator,
      description: this.probs.description
    });
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    const activeItem = this.props.activeItem;
    const title = this.state.title;
    const description = this.state.description;

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
                content={title}
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
                content={description}
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
            <List divided verticalAlign="middle">
              <YouTubeSearch />
            </List>
          </Grid>
        </Segment>
      </OwnHeader>
    );
  }
}
