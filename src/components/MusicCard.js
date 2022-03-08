import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
// import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      favorite: undefined,
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { isFavorite } = this.props;

    console.log(isFavorite);

    this.setState({ favorite: isFavorite });
  }

  handleChange({ target }) {
    const { name, checked } = target;

    this.setState({
      [name]: checked,
      loading: true,
    }, async () => {
      const { musicData } = this.props;
      const { favorite } = this.state;

      if (favorite === true) {
        await addSong(musicData);
      } else {
        await removeSong(musicData);
      }

      this.setState({ loading: false });
    });
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
  isFavorite: PropTypes.bool.isRequired,
  albumImage: PropTypes.string,
};

MusicCard.defaultProps = {
  albumImage: '',

};

export default MusicCard;
