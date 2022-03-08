import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      albumName: '',
      albumMusics: undefined,
      favoritesList: undefined,
    };

    this.getAlbumMusics = this.getAlbumMusics.bind(this);
    this.getFavoritesList = this.getFavoritesList.bind(this);
  }

  componentDidMount() {
    this.getAlbumMusics();
    this.getFavoritesList();
  }

  async getAlbumMusics() {
    const { location } = this.props;
    const id = location.pathname.split('/')[2];

    const data = await getMusics(id);
    const musicList = data.filter((element, index) => index !== 0);

    this.setState({
      artistName: data[0].artistName,
      albumName: data[0].collectionName,
      albumMusics: musicList,
    });
  }

  async getFavoritesList() {
    const data = await getFavoriteSongs();
    this.setState({ favoritesList: data });
  }

  render() {
    const { artistName, albumName, albumMusics, favoritesList } = this.state;

    return (
      <div data-testid="page-album">
        <h1 data-testid="artist-name">
          { artistName }
        </h1>
        <h2 data-testid="album-name">
          { albumName }
        </h2>

        <section className="music-album">
          {
            (albumMusics && favoritesList)
              && albumMusics.map((music) => {
                const isFavorite = favoritesList
                  .some((favorite) => favorite.trackId === music.trackId);

                return (
                  <MusicCard
                    key={ music.trackId }
                    previewUrl={ music.previewUrl }
                    trackName={ music.trackName }
                    albumImage={ music.artworkUrl100 }
                    trackId={ music.trackId }
                    musicData={ music }
                    isFavorite={ isFavorite }
                  />);
              })
          }

        </section>
      </div>
    );
  }
}

Album.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Album;
