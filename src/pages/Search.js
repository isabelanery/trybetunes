import React from 'react';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      disableBtn: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const minLength = 2;
    const verifySearc = value.length < minLength;

    this.setState({
      [name]: value,
      disableBtn: verifySearc,
    });
  }

  render() {
    const { search, disableBtn } = this.state;

    return (
      <div data-testid="page-search">
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            name="search"
            onChange={ this.handleChange }
            value={ search }
            placeholder="Nome do album"
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ disableBtn }
            // onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
