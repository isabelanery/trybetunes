import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favList: undefined,
    };

    this.getFavs = this.getFavs.bind(this);
  }

  componentDidMount() {
    this.getFavs();
  }

  async getFavs() {
    this.setState({ loading: true });

    const data = await getFavoriteSongs();
    this.setState({
      favList: data,
      loading: false,
    });
  }

  render() {
    const { loading, favList } = this.state;

    return (
      <div data-testid="page-favorites" className="favorites-page">
        <Header />

        {
          loading ? <Loading />
            : favList
              && favList.map((music) => {
                const isFavorite = favList
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
                    getFavs={ this.getFavs }
                  />);
              })
        }
      </div>
    );
  }
}

export default Favorites;
