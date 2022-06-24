import React from 'react';
import validator from 'validator';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import '../css/ProfileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      disableBtn: true,
      redirect: false,
      user: {
        name: undefined,
        email: undefined,
        image: undefined,
        description: undefined,
      },
    };

    this.getUserInfo = this.getUserInfo.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateBtn = this.validateBtn.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  handleChange = ({ target }) => {
    const { name: targetName, value } = target;

    this.setState((prevState) => ({
      user: { ...prevState.user, [targetName]: value },
    }), this.validateBtn);
  }

  handleClick(event) {
    event.preventDefault();

    this.setState({ loading: true }, async () => {
      const { user: { name, email, image, description } } = this.state;
      await updateUser({ name, email, image, description });
      this.setState({
        redirect: true,
        loading: false });
    });
  }

  getUserInfo() {
    this.setState({ loading: true }, async () => {
      const data = await getUser();
      const { name, email, image, description } = data;

      const img = image === 'https://www.business2community.com/wp-content/plugins/wp-user-avatars/wp-user-avatars/assets/images/mystery.jpg'
        ? '' : image;

      this.setState({
        user: {
          name,
          email,
          image: img,
          description,
        },
        loading: false,
      });
    });
  }

  validateBtn = () => {
    const { user: { name, email, image, description } } = this.state;
    const validateForm = name && email && image && description;
    const validateEmail = validator.isEmail(email);
    this.setState({ disableBtn: !(validateForm && validateEmail) });
  }

  render() {
    const { loading, user, disableBtn, redirect } = this.state;
    const { name, email, image, description } = user;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        <section className="edit-section">
          {
            loading ? <Loading size="big" />
              : user
                && (
                  <form className="userInfo-edit">
                    <div className="userInfo-input">
                      <label htmlFor="name">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
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
                          className="form-control"
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
                          className="form-control"
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
                          className="form-control"
                          value={ description }
                          data-testid="edit-input-description"
                          placeholder="Descrição"
                          onChange={ this.handleChange }
                        />
                      </label>
                    </div>

                    <button
                      type="submit"
                      data-testid="edit-button-save"
                      className="saveBtn"
                      disabled={ disableBtn }
                      onClick={ this.handleClick }
                    >
                      Enviar
                    </button>
                  </form>
                )
          }
        </section>

        { redirect && <Redirect exact to="/profile" /> }
      </div>
    );
  }
}

export default ProfileEdit;
