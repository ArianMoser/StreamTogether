import React, { Fragment, Component } from "react";
import "../node_modules/semantic-ui-css/semantic.min.css";
import { Responsive } from "semantic-ui-react";
import Footer from "./Footer";

export default class Header extends Component {
  //props -> Eigenschaften die beim erstellen der Komponente übergeben worden sin
  // state -> Status der Komponente momentan

  constructor(props) {
    super(props);
    this.state = {
      useFooter: true,
      useHeader: true
    };
  }

  static get defaultProps() {
    return {
      useFooter: true,
      useHeader: true
    };
  }

  render() {
    const useFooter = this.props.useFooter;
    const useHeader = this.props.useHeader;

    const footer = useFooter ? <Footer /> : <div id="possibleFooterPosition" />;
    const header = useHeader ? <div> Header </div> : <div> keinHeader </div>;

    return (
      <Fragment>
        <Responsive {...Responsive.onlyComputer}>
          {this.props.children}
          {footer}
          {Header}
        </Responsive>
      </Fragment>
    );
  }
}
