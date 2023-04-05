import { Component } from 'react';

import './styles.css';

export class Button extends Component {
  render() {
    return (
      <div >
        < button className='button'
          onClick={this.props.onClick}
          disabled={this.props.disabled}>
          Load More Posts
        </button >
      </div>
    );
  };
}