import { Component } from "react";
import { Button, Icon } from "semantic-ui-react";
import * as Icons from "react-icons/lib/fa";

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
      icon: "heart"
    };
  }

  componentWillMount() {
    // console.log(this.props);
  }

  _handleClick(event) {
    this.props.onClick();
    console.log("Button clicked");
  }

  render() {
    var icon = <Icons.FaStar />;
    switch (this.props.icon) {
      case "thumps-up":
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

    return (
      <div>
        <Button
          color={this.props.color}
          content={this.props.content}
          onClick={this._handleClick}
        >
          {icon}
        </Button>
      </div>
    );
  }
}

export default MyButton;
