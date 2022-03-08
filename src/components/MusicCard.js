import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
// import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange({ target }) {
    const { name, checked } = target;

    this.setState({
      [name]: checked,
      loading: true,
    });

    const { musicData } = this.props;
    await addSong(musicData);

    this.setState({ loading: false });
  }

  render() {
    const { previewUrl, trackName, albumImage, trackId } = this.props;
    const { favorite, loading } = this.state;

    return (
      <div>
        {
          loading
            ? <Loading />
            : (
              <div className="music">
                <div className="text-music">
                  <p>
                    { trackName }
                  </p>
                  <label htmlFor={ trackId }>
                    <input
                      data-testid={ `checkbox-music-${trackId}` }
                      id={ trackId }
                      type="checkbox"
                      checked={ favorite }
                      name="favorite"
                      onChange={ this.handleChange }
                    />
                    Favorita
                  </label>
                </div>

                <img src={ albumImage } alt={ trackName } />
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                </audio>
              </div>)

        }
      </div>

    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  musicData: PropTypes.objectOf(PropTypes.any).isRequired,
  albumImage: PropTypes.string,
};

MusicCard.defaultProps = {
  albumImage: '',

};

export default MusicCard;
