import React, { Fragment, Component } from "react";
import "../node_modules/semantic-ui-css/semantic.min.css";
import { Responsive } from "semantic-ui-react";
import Footer from "./Footer";
import Navbar from "./Navbar"

export default class Header extends Component {
  //props -> Eigenschaften die beim erstellen der Komponente übergeben worden sin
  // state -> Status der Komponente momentan

  constructor(props) {
    super(props);
    this.state = {
      useFooter: true,
      useHeader: true,
      activeItem: "home"
    };
  }

  static get defaultProps() {
    return {
      useFooter: true,
      useHeader: true,
      activeItem: "home2"
    };
  }

  render() {
    const useFooter = this.props.useFooter;
    const useHeader = this.props.useHeader;
    const activeItem = this.props.activeItem;

    const footer = useFooter ? <Footer /> : <div id="possibleFooterPosition" />;
  const header = useHeader ? <Navbar name={activeItem}> Header </Navbar> : <div> keinHeader </div>;

    return (
      <Fragment>
        <Responsive {...Responsive.onlyComputer}>
          {Header}
          {this.props.children}
          {footer}
        </Responsive>
      </Fragment>
    );
  }
}
