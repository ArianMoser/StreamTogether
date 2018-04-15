import React, { Fragment, Component } from "react";
import "../node_modules/semantic-ui-css/semantic.min.css";
import {
  Responsive
} from "semantic-ui-react";
import Footer from "./Footer"

export default class Header extends Component{
    //props -> Eigenschaften die beim erstellen der Komponente übergeben worden sin
    // state -> Status der Komponente momentan
    render()
    {
        return (
            <Fragment>
              <Responsive {...Responsive.onlyComputer}>
                {this.props.children}
                <Footer />
              </Responsive>
            </Fragment>
        )
    }
}
