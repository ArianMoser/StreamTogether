//Imports
import PropTypes from "prop-types";
import React, { Component } from "react";
import Link from "next/link";
import OwnHeader from "../components/Header";
import TopBox from "../components/TopBox";
import {
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
export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static get defaultProps() {
    return {
      activeItem: "empty"
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
        <TopBox activeItem={activeItem} layer1="Contact" />
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <p style={{ fontSize: "1.33em" }}>
                  <p>
                    {" "}
                    Max Mustermann<br />
                    Musterstra&szlig;e 111<br /> Geb&auml;ude 44<br /> 90210
                    Musterstadt
                  </p>
                  <p>
                    Telefon: +49 (0) 123 44 55 66<br /> Telefax: +49 (0) 123 44
                    55 99<br /> E-Mail: mustermann@musterfirma.de
                  </p>
                </p>
              </Grid.Column>
              <Grid.Column width={8}>
                <iframe
                  width="100%"
                  height="400"
                  src="https://maps.google.de/maps?hl=de&q=Akurala%20Beach&t=&z=15&ie=UTF8&iwloc=B&output=embed"
                  frameborder="0"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </OwnHeader>
    );
  }
}
