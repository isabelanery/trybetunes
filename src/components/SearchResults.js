import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/SearchResults.css';

class SearchResults extends React.Component {
  converImg(url = '') {
    return url.replace(/100x100bb.jpg/, '300x300bb.jpg');
  }

  render() {
    const { artist, results } = this.props;

    return (
      <div className="search-results">
        <p className="p-results">
          {`Resultado de álbuns de: ${artist}` }
        </p>

        <section className="search-section">

          {
            results.length > 0
              ? results.map((album) => {
                const albumImg = this.converImg(album.artworkUrl100);
                return (
                  <Link
                    key={ album.collectionId }
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                    className="card-result"
                  >

                    <img src={ albumImg } alt="album" className="albumImg" />

                    <p className="album-name">
                      { `${album.collectionName}` }
                    </p>

                    <p className="artist-name">
                      { `${album.artistName}` }
                    </p>
                  </Link>);
              })
              : <p>Nenhum álbum foi encontrado</p>
          }

        </section>
      </div>
    );
  }
}

SearchResults.propTypes = {
  artist: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default SearchResults;
