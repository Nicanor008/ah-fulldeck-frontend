import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class Protected extends Component {
  render() {
    return <div className="container mt-4">I am a protected route</div>;
  }
}

export default Protected;
