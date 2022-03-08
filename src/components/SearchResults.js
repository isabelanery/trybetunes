import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SearchResults extends React.Component {
  render() {
    const { artist, results } = this.props;

    return (
      <div>
        <p>
          {`Resultado de álbuns de: ${artist}` }
        </p>

        <section className="search-result">

          {
            results.length > 0
              ? results.map((album) => (
                <div key={ album.collectionId }>
                  <p>
                    { `${album.collectionName}` }
                  </p>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    Profile
                  </Link>
                </div>))
              : <p>Nenhum álbum foi encontrado</p>
          }

        </section>
      </div>
    );
  }
}

SearchResults.propTypes = {
  artist: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SearchResults;
