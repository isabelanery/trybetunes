import React from 'react';
// import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      disableBtn: true,
      // redirect: false,
      user: {
        name: undefined,
        email: undefined,
        image: undefined,
        description: undefined,
      },
    };

    this.getUserInfo = this.getUserInfo.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  handleChange = ({ target }) => {
    const { name: userName, value } = target;

    this.setState((prevState) => ({
      user: { ...prevState.user, [userName]: value },
    }), () => {
      const { user: { name, email, image, description } } = this.state;
      const verifyName = (name, email, image, description);

      this.setState({ disableBtn: !verifyName });
    });
  }

  async handleClick(event) {
    event.preventDefault();

    this.setState({ loading: true });

    const { user: { name, email, image, description } } = this.state;
    await updateUser({ name, email, image, description });

    // this.setState({
    //   redirect: true,
    //   loading: false });

    const { history } = this.props;
    history.push('/profile');
  }

  async getUserInfo() {
    this.setState({ loading: true });

    const data = await getUser();
    const { name, email, image, description } = data;

    this.setState({
      user: {
        name,
        email,
        image,
        description,
      },
      loading: false,
    });
  }

  render() {
    const { loading, user, disableBtn } = this.state;
    const { name, email, image, description } = user;

    return (
      <div data-testid="page-profile-edit">
        {
          loading ? <Loading />
            : user
              && (
                <form className="userInfo">
                  <label htmlFor="name">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={ name }
                      data-testid="edit-input-name"
                      placeholder="Nome"
                      onChange={ this.handleChange }
                    />
                  </label>

                  <label htmlFor="email">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={ email }
                      data-testid="edit-input-email"
                      placeholder="Email"
                      onChange={ this.handleChange }
                    />
                  </label>

                  <label htmlFor="image">
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={ image }
                      data-testid="edit-input-image"
                      placeholder="Foto de perfil"
                      onChange={ this.handleChange }
                    />
                  </label>

                  <label htmlFor="description">
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={ description }
                      data-testid="edit-input-description"
                      placeholder="Descrição"
                      onChange={ this.handleChange }
                    />
                  </label>

                  <button
                    data-testid="edit-button-save"
                    type="submit"
                    disabled={ disableBtn }
                    onClick={ this.handleClick }
                  >
                    Atualizar perfil
                  </button>
                </form>
              )
        }

        {/* {
          redirect && <Redirect exact to="/profile" />
        } */}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProfileEdit;
