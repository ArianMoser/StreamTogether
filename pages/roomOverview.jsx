import React, { Component } from "react";
import OwnHeader from "../components/Header";
import Navbar from "../components/Navbar";
import RoomCard from "../components/RoomCard";
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
import { roomFunctionShowAll } from "./PostMethods";

export default class roomOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static get defaultProps() {
    return {
      activeItem: "rooms",
      rooms: {},
      userId: "",
      username: ""
    };
  }

  componentWillMount() {
    this._getAllRooms();
  }

  async _getAllRooms() {
    console.log("Loading rooms");
    const responseGetRooms = await roomFunctionShowAll("/selectRooms");
    console.log("Reg. Complete | Count : " + responseGetRooms.length);
    console.log(responseGetRooms);
    this.setState({
      rooms: responseGetRooms
    }).then(
      function() {
        console.log("Completed setState for rooms");
      }.bind(this)
    );
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    const activeItem = this.props.activeItem;

    const rooms = this.state.rooms;
    console.log(rooms);
    var roomCardList = [];
    if (rooms != {} && rooms != undefined) {
      roomCardList = Object.keys(rooms).map(room => (
        <RoomCard
          creator={rooms[room].creator}
          description={rooms[room].description}
          hashedValue={rooms[room].hashedValue}
          key={room}
          password={rooms[room].password}
          title={rooms[room].title}
        />
      ));
      console.log(roomCardList);
    } //end of if

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
            {roomCardList.map(function(roomCard) {
              console.log(roomCard);
              if (roomCard.key % 2 == 0) {
                console.log("even");
                var returnValue = (
                  <Grid.Column width={8}>{roomCard}</Grid.Column>
                );
              } else {
                console.log("odd");
                var returnValue = (
                  <Grid.Column width={8}>{roomCard}</Grid.Column>
                );
              }
              return returnValue;
            })}
          </Grid>
        </Segment>
      </OwnHeader>
    );
  }
}
