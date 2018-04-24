import React, { Fragment, Component } from "react";
import "../node_modules/semantic-ui-css/semantic.min.css";
import { Responsive } from "semantic-ui-react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  static get defaultProps() {
    return {
      useFooter: true,
      useHeader: true,
      activeItem: "home"
    };
  }
  //----------------------------------Render-------------------------------//
  render() {
    const useFooter = this.props.useFooter;
    const useHeader = this.props.useHeader;
    const activeItem = this.props.activeItem;

    const footer = useFooter ? <Footer /> : <div id="possibleFooterPosition" />;
    const header = useHeader ? (
      <Navbar name={activeItem}> Header </Navbar>
    ) : (
      <div> keinHeader </div>
    );

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
