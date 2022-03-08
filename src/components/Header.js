import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import NavBar from './NavBar';

class Header extends React.Component {
  constructor() {
    super();

    this.userName = this.userName.bind(this);

    this.state = {
      userName: '',
    };
  }

  componentDidMount() {
    this.userName();
  }

  async userName() {
    const name = await getUser();

    this.setState({
      userName: name.name,
    });
  }

  render() {
    const { userName } = this.state;

    return (
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>

        { userName === '' ? <Loading />
          : (
            <p data-testid="header-user-name">
              { userName }
            </p>)}

        <NavBar />
      </header>
    );
  }
}

export default Header;
