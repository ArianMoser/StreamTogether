import { Component } from 'react';
import {
 Button,
 Icon
 } from 'semantic-ui-react';

class LikeButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
      <Button color='red'content='Like'icon='heart'/>
      </div>
    );
  }
}

export default LikeButton;
