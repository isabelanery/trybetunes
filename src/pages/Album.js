import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../css/Album.css';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      albumName: '',
      albumData: { primaryGenreName: '', year: '', albumLength: '', time: '' },
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
    // console.log(data);
    const albumData = {
      primaryGenreName: data[0].primaryGenreName,
      year: data[0].releaseDate ? data[0].releaseDate.split('-')[0] : 'unknown',
      albumLength: musicList.length,
    };

    this.setState({
      albumData,
      artistName: data[0].artistName,
      albumName: data[0].collectionName,
      albumMusics: musicList,
      albumImage: data[0].artworkUrl100,
    });
  }

  async getFavoritesList() {
    const data = await getFavoriteSongs();
    this.setState({ favoritesList: data });
  }

  converImg(url = '') {
    return url.replace(/100x100bb.jpg/, '300x300bb.jpg');
  }

  render() {
    const { albumImage, artistName, albumName, albumMusics,
      favoritesList, albumData } = this.state;
    const { primaryGenreName, year, albumLength, time } = albumData;
    // const year = releaseDate.split('-')[0];
    return (
      <div data-testid="page-album" className="album">
        <div className="top-container">
          <Header />

          {
            albumMusics
              ? (
                <div className="artist-container">
                  <div className="artist-wrapper">
                    <img src={ this.converImg(albumImage) } alt={ albumName } />
                    <div className="artist-info">
                      <h3 data-testid="artist-name">
                        { artistName }
                      </h3>
                      <h2 data-testid="album-name">
                        { albumName }
                      </h2>
                      <p>
                        {`${primaryGenreName} • ${year} • 
                          ${albumLength} músicas • ${time}`}
                      </p>

                    </div>
                  </div>

                </div>
              )
              : <Loading size="big" />
          }
        </div>

        <section className="music-album">
          {
            (albumMusics && favoritesList)
              && albumMusics.map((music, index) => {
                const isFavorite = favoritesList
                  .some((favorite) => favorite.trackId === music.trackId);

                return (
                  <MusicCard
                    key={ index }
                    previewUrl={ music.previewUrl }
                    trackName={ music.trackName }
                    index={ index }
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
