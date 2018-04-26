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
    this.state = {
      activeItem: "rooms",
      rooms: {},
      userId: "",
      username: ""
    };
  }
  //-------------------------functions of react----------------------------//
  componentWillMount() {
    this._getAllRooms();
  }

  //----------------------functions------------------------------//
  async _getAllRooms() {
    console.log("Loading rooms");
    const responseGetRooms = await roomFunctionShowAll("/selectRooms");
    console.log("Reg. Complete | Count : " + responseGetRooms.length);
    console.log(responseGetRooms);
    this.setState({
      rooms: responseGetRooms
    });
  }

  //----------------------------------Render-------------------------------//
  render() {
    const activeItem = this.state.activeItem;
    const rooms = this.state.rooms;
    var roomCardList = [];
    console.log(rooms);

    if (rooms != {} && rooms != undefined) {
      roomCardList = Object.keys(rooms).map(room => (
        <RoomCard
          creator={rooms[room].creator}
          description={rooms[room].description}
          hashedValue={rooms[room].hashedValue}
          key={room}
          password={rooms[room].password}
          thumbnail={rooms[room].thumbnail}
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
