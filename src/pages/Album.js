import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      albumName: '',
      albumMusics: undefined,
    };

    this.getAlbumMusics = this.getAlbumMusics.bind(this);
  }

  componentDidMount() {
    this.getAlbumMusics();
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

  render() {
    const { artistName, albumName, albumMusics } = this.state;

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
            albumMusics
              && albumMusics.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  previewUrl={ music.previewUrl }
                  trackName={ music.trackName }
                  albumImage={ music.artworkUrl100 }
                  trackId={ music.trackId }
                  musicData={ music }
                />))

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
