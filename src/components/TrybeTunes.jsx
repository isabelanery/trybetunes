import React, { Component } from 'react';
import { BsSoundwave } from 'react-icons/bs';
import '../css/TrybeTunes.css';

class TrybeTunes extends Component {
  render() {
    return (
      <h1 className="trybetunes">
        <BsSoundwave className="header-icon" />
        TrybeTunes
      </h1>
    );
  }
}

export default TrybeTunes;
