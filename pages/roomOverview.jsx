//--------------------------------Imports-------------------------------//
import React, { Component } from "react";
import OwnHeader from "../components/Header";
import TopBox from "../components/TopBox";
import RoomCard from "../components/RoomCard";
import PropTypes from "prop-types";
import Link from "next/link";
import { checksession } from "../components/Util";
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
import { roomFunctionShowAll, userFunctionByUsername } from "./PostMethods";

export default class roomOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "rooms",
      rooms: {},
      roomId: 0,
      username: ""
    };
  }
  //-------------------------functions of react----------------------------//

  //componentWillMount() is invoked just before mounting occurs
  componentWillMount() {
    this._getAllRooms();
  }

  //componentDidMount() is invoked immediately after a component is mounted
  componentDidMount() {
    var userName = checksession();
    console.log("user:" + userName);
    this._getUserRoom(userName);
  }

  //----------------------functions------------------------------//
  async _getAllRooms() {
    console.log("Loading rooms");
    const responseGetRooms = await roomFunctionShowAll("/selectRooms");
    console.log("Reg. Complete | Count : " + responseGetRooms.length);
    console.log(responseGetRooms);
    this.setState({ rooms: responseGetRooms });
  }

  async _getUserRoom(userName) {
    if (userName != undefined && userName != "") {
      const responseUserInformation = await userFunctionByUsername(
        "/getuserandroombyusername",
        userName
      );
      if (responseUserInformation.length == "1") {
        console.log(responseUserInformation);
        console.log("RoomId: " + responseUserInformation[0].current_room_id);
        this.setState({ roomId: responseUserInformation[0].current_room_id });
      }
    }
  }

  //----------------------------------Render-------------------------------//
  render() {
    const activeItem = this.state.activeItem;
    const rooms = this.state.rooms;
    var roomCardList = [];
    var userRoom = <span> </span>;
    const spanstyle = {
      "box-shadow": "10px 10px 5px blue"
    };

    //to highlight the current room
    if (rooms != {} && rooms != undefined) {
      roomCardList = Object.keys(rooms).map(room => {
        console.log(rooms[room]);
        if (this.state.roomId == rooms[room].id) {
          userRoom = (
            <div style={spanstyle}>
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
            </div>
          );
        } else {
          return (
            <div>
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
            </div>
          );
        } //end of else
      });
      console.log(".........");
      console.log(userRoom);
      console.log(roomCardList);
      console.log(".........");
      if (
        roomCardList.length == "0" ||
        roomCardList == undefined ||
        roomCardList[0] == undefined
      ) {
        roomCardList = [];
      }
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
            {userRoom}
            {roomCardList.map(function(roomCard) {
              if (roomCard != undefined) {
                if (roomCard.key % 3 == 0) {
                  //  console.log("even");
                  var returnValue = (
                    <Grid.Column width={5}>{roomCard}</Grid.Column>
                  );
                }
                if (roomCard.key % 3 == 1) {
                  // console.log("even");
                  var returnValue = (
                    <Grid.Column width={5}>{roomCard}</Grid.Column>
                  );
                }
                if (roomCard.key % 3 == 2) {
                  //  console.log("even");
                  var returnValue = (
                    <Grid.Column width={5}>{roomCard}</Grid.Column>
                  );
                }
              }
              return returnValue;
            })}
          </Grid>
        </Segment>
      </OwnHeader>
    );
  }
}
