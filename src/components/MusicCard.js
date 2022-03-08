import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { previewUrl, trackName, albumImage } = this.props;

    return (
      <div>
        <p>
          { trackName }
        </p>
        <img src={ albumImage } alt={ trackName } />
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  albumImage: PropTypes.string.isRequired,
};

export default MusicCard;
