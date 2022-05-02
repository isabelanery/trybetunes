import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';

class NavBar extends React.Component {
  render() {
    return (
      <nav>
        <Link to="/search" data-testid="link-to-search" className="nav-link">
          <h4>
            Pesquisar
          </h4>
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites" className="nav-link">
          <h4>
            Favoritas
          </h4>
        </Link>
        <Link to="/profile" data-testid="link-to-profile" className="nav-link">
          <h4>
            Profile
          </h4>
        </Link>
      </nav>
    );
  }
}

export default NavBar;
