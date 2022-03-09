import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      user: undefined,
    };

    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  async getUserInfo() {
    this.setState({ loading: true });

    const data = await getUser();
    this.setState({
      user: data,
      loading: false,
    });
  }

  render() {
    const { loading, user } = this.state;

    return (
      <div data-testid="page-profile">
        {
          loading ? <Loading />
            : user
              && (
                <section className="userInfo">
                  <p>
                    { user.name }
                  </p>

                  <p>
                    { user.email }
                  </p>

                  <p>
                    { user.description }
                  </p>

                  <img
                    src={ user.image }
                    alt={ user.name }
                    data-testid="profile-image"
                  />

                  <Link to="/profile/edit">Editar perfil</Link>
                </section>

              )
        }
      </div>
    );
  }
}

export default Profile;
