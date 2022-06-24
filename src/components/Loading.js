import React from 'react';
import PropTypes from 'prop-types';
import '../css/Loading.css';

class Loading extends React.Component {
  render() {
    const { size } = this.props;
    return (
      <>
        <p className="hide">Carregando...</p>
        <div className={ `loader-${size}` }>
          <span className={ `stroke-${size}` } />
          <span className={ `stroke-${size}` } />
          <span className={ `stroke-${size}` } />
          <span className={ `stroke-${size}` } />
          <span className={ `stroke-${size}` } />
          <span className={ `stroke-${size}` } />
          <span className={ `stroke-${size}` } />
          <span className={ `stroke-${size}` } />
        </div>
      </>
    );
  }
}

Loading.propTypes = {
  size: PropTypes.string.isRequired,
};

export default Loading;
