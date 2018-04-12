import React, { Fragment, Component } from "react";
import "../node_modules/semantic-ui-css/semantic.min.css";

export default class Header extends Component{
    //props -> Eigenschaften die beim erstellen der Komponente übergeben worden sin
    // state -> Status der Komponente momentan
    render()
    {
        return (
            <Fragment>
                {this.props.children}
            </Fragment>
        )
    }
}