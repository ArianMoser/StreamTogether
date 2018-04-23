import React, { Component } from "react";
import OwnHeader from "../components/Header";
import TopBox from "../components/TopBox";
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

  static propTypes = {
    activeItem: PropTypes.string,
    rooms: PropTypes.object,
    userId: PropTypes.string,
    username: PropTypes.string
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

  render() {
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
          userNumber={rooms[room].ActiveUser}
        />
      ));
      console.log(roomCardList);
    } //end of if

    return (
      <OwnHeader>
        <TopBox
          activeItem={activeItem}
          layer1="Available rooms"
          layer2="Stream videos with your friends!"
          layer3="Or just meet new friends!"
        />
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
