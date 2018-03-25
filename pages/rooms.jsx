import React, { Component } from "react";
import OwnHeader from "../components/Header";
import Container, { Card, Icon, Image, Button } from "semantic-ui-react";

export default class rooms extends Component {
  render() {
    return (
      <OwnHeader>
        <Card>
        <Image src='../static/minion.png' />
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
            <Button icon color='blue' labelPosition="right" floated='right'>
              Join
              <Icon name="right arrow" />
            </Button>
          </Card.Content>
        </Card>
      </OwnHeader>
    );
  }
}
