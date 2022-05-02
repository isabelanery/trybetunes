import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import NavBar from './NavBar';
import TrybeTunes from './TrybeTunes';
import '../css/Header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.userName = this.userName.bind(this);

    this.state = {
      userName: '',
      profileImg: '',
    };
  }

  componentDidMount() {
    this.userName();
  }

  async userName() {
    const { name, image } = await getUser();

    this.setState({
      userName: name,
      profileImg: image,
    });
  }

  render() {
    const { userName, profileImg } = this.state;

    return (
      <header data-testid="header-component">
        <TrybeTunes />

        <div className="right-side">
          <div className="user">
            { userName === '' ? <Loading />
              : (
                <>
                  <img
                    className="user-img"
                    src={ profileImg }
                    alt="profile"
                  />
                  <p className="user-name" data-testid="header-user-name">
                    { userName }
                  </p>
                </>)}
          </div>
          <NavBar />
        </div>
      </header>
    );
  }
}

export default Header;
