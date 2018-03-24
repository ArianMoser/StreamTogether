import React, { Fragment, Component } from "react";

export default class Header extends Component{
    //props -> Eigenschaften die beim erstellen der Komponente übergeben worden sin
    // state -> Status der Komponente momentan
    render()
    {
        return (
            <Fragment>
                hallo <br/>
                
                {this.props.isLoggedIn===true?"eingeloggt":"ausgeloggt"}
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
                <div> Das ist ein Header</div>
                {this.props.children}
            </Fragment>
        )
    }
}