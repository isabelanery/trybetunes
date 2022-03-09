import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      nameUser: '',
      disableBtn: true,
      loading: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const minLength = 3;
    const verifyName = value.length < minLength;

    this.setState({
      [name]: value,
      disableBtn: verifyName,
    });
  }

  async handleClick(event) {
    event.preventDefault();
    const { nameUser } = this.state;

    this.setState({ loading: true });

    await createUser({
      name: nameUser,
      email: '',
      image: '',
      description: '',
    });

    const { history } = this.props;

    history.push('/search');
    // this.setState({ loading: false });
  }

  render() {
    const { nameLogin, disableBtn, loading } = this.state;

    return (
      <main>

        {
          loading
            ? <Loading />
            : (
              <div data-testid="page-login">
                <form>
                  <input
                    data-testid="login-name-input"
                    type="text"
                    name="nameUser"
                    onChange={ this.handleChange }
                    value={ nameLogin }
                    placeholder="Nome"
                  />
                  <button
                    data-testid="login-submit-button"
                    type="submit"
                    disabled={ disableBtn }
                    onClick={ this.handleClick }
                  >
                    Entrar
                  </button>
                </form>
              </div>)
        }

      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Login;
