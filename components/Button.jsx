import { Component } from "react";
import { Button, Icon } from "semantic-ui-react";

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
  _handleClick(event){
    console.log("Button clicked");
  }

  render() {
    return (
      <div>
        <Button
          color={this.props.color}
          content={this.props.content}
          icon={this.props.icon}
          onClick={this._handleClick}
        />
      </div>
    );
  }
}

export default MyButton;
