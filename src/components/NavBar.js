import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/search" data-testid="link-to-search" className="nav-link">
            Pesquisar
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites" className="nav-link">
            Favoritas
          </Link>
          <Link to="/profile" data-testid="link-to-profile" className="nav-link">
            Profile
          </Link>
        </div>
      </nav>
    );
  }
}

export default NavBar;
