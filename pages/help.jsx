import OwnHeader from "../components/Header";
import React, { Component } from 'react';
import { Icon, Image, Statistic } from "semantic-ui-react";

export default class help extends Component {
  render() {
    return (
      <OwnHeader>
        <Statistic.Group>
          <Statistic>
            <Statistic.Value>22</Statistic.Value>
            <Statistic.Label>Active Rooms</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value text>
              Three<br />
              Thousand
            </Statistic.Value>
            <Statistic.Label>Signups</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>
              <Icon name="music" />
              214
            </Statistic.Value>
            <Statistic.Label>Played Videos</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </OwnHeader>
    );
  }
}
