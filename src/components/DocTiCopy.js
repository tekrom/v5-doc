import React, { Component } from 'react';

class ApplyContent extends Component {
  demo = () => {
    console.log('test')
  }
  render() {
    return (
      <div onClick={this.demo}>import component demo</div>
    );
  }
}

export default ApplyContent;