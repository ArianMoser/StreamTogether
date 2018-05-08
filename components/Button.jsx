//--------------------------------Imports-------------------------------//
import { Component } from "react";
import { Button, Icon } from "semantic-ui-react";
import * as Icons from "react-icons/lib/fa";
import PropTypes from "prop-types";

//****************************************************************************
//This component is used for adding the different buttons to the playlist.
//****************************************************************************

class MyButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this._handleClick = this._handleClick.bind(this);
  }

  static get defaultProps() {
    return {
      color: "red",
      content: "",
      disabled: false,
      icon: "heart"
    };
  }

  static propTypes = {
    color: PropTypes.string,
    content: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    onClick: PropTypes.func
  };

  //-------------------------functions of react--------------------------//
  componentWillMount() {
    this.setState({
      disabled: this.props.disabled
    });
  }
  //----------------------------event handlers---------------------------//
  _handleClick(event) {
    this.props.onClick();
    console.log("Button clicked");
  }
  //-----------------------------functions-------------------------------//
  _setDisable(value) {
    this.setState({
      disabled: value
    });
  }

  //----------------------------------Render-----------------------------//
  render() {
    var icon = <Icons.FaStar />;
    switch (this.props.icon) {
      case "thumbs-up":
        icon = <Icons.FaThumbsOUp />;
        break;
      case "thumbs-down":
        icon = <Icons.FaThumbsODown />;
        break;
      case "delete":
        icon = <Icons.FaClose />;
        break;
      default:
        icon = <Icons.FaStar />;
        break;
    } // end of switch-case

    //return
    return (
      <div>
        <Button
          color={this.props.color}
          content={this.props.content}
          disabled={this.state.disabled}
          onClick={this._handleClick}
        >
          {icon}
        </Button>
      </div>
    );
  }
}

export default MyButton;
