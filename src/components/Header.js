import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import NavBar from './NavBar';

class Header extends React.Component {
  constructor() {
    super();

    this.userName = this.userName.bind(this);

    this.state = {
      // loading: false,
      userName: '',
    };
  }

  componentDidMount() {
    this.userName();
  }

  async userName() {
    // this.setState({ loading: true });

    const name = await getUser();
    // console.log(name.name);

    this.setState({
      // loading: false,
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
