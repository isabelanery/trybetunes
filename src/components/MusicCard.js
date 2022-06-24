import React from 'react';
import PropTypes from 'prop-types';
import { HiOutlineHeart, HiHeart, HiPlay } from 'react-icons/hi';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import '../css/MusicCard.css';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    const { isFavorite } = this.props;

    this.state = {
      favorite: isFavorite,
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, checked } = target;

    this.setState({
      [name]: checked,
      loading: true,
    }, async () => {
      const { musicData, getFavs } = this.props;
      const { favorite } = this.state;

      if (favorite) {
        await addSong(musicData);
      } else if (!favorite) {
        await removeSong(musicData);
      }

      this.setState({ loading: false });
      getFavs();
    });
  }

  handlePlay({ target }) {
    const currentTarget = target.nodeName === 'path' ? target.parentNode : target;

    const currentActive = document.querySelector('.active');
    if (currentActive) {
      currentActive.classList.remove('active');
      currentActive.previousElementSibling.classList.remove('display-none');
      currentActive.pause();
    }

    currentTarget.classList.add('display-none');
    currentTarget.nextSibling.classList.add('active');
    currentTarget.nextSibling.play();
  }

  render() {
    const { previewUrl, trackName, trackId, index } = this.props;
    const { favorite, loading } = this.state;
    const number = index !== undefined ? `${index + 1}. ` : '';
    const favIcon = favorite ? <HiHeart /> : <HiOutlineHeart />;

    return (
      <div className="music-container">
        <div className="music-wrapper">
          {
            loading
              ? <Loading size="small" />
              : (
                <div className="music">

                  <span>{ number }</span>
                  <h4>{ trackName }</h4>

                  <HiPlay onClick={ (event) => this.handlePlay(event) } />
                  <audio
                    data-testid="audio-component"
                    className="hidden"
                    src={ previewUrl }
                    controls
                  >
                    <track kind="captions" />
                  </audio>

                  <div>
                    <label htmlFor={ trackId } className="heart">
                      <input
                        data-testid={ `checkbox-music-${trackId}` }
                        id={ trackId }
                        type="checkbox"
                        checked={ favorite }
                        name="favorite"
                        className="favorite-input"
                        onChange={ this.handleChange }
                      />
                      <span className="hide">Favorita</span>
                      { favIcon }
                    </label>
                  </div>
                </div>
              )
          }
        </div>
      </div>

    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.number,
  musicData: PropTypes.objectOf(PropTypes.any),
  isFavorite: PropTypes.bool,
  getFavs: PropTypes.func,
}.isRequired;

MusicCard.defaultProps = {
  getFavs: () => {},
};

export default MusicCard;
