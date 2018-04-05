import OwnHeader from "../components/Header";
import React, { Component } from 'react';
import Link from "next/link";
import { Icon, Image, Grid,GridColumn, Header, Form, Segment, Button, Message } from "semantic-ui-react";

export default class contact extends Component {
    render() {
        return (
            <OwnHeader>
                <Grid
                    textAlign="center"
                    verticalAlign="middle"
                >
                    <GridColumn>
                        Test
                    </GridColumn>
                </Grid>
            </OwnHeader>
        );
    }
}
