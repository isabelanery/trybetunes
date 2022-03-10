import React from 'react';

class Loading extends React.Component {
  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }
}

export default Loading;
