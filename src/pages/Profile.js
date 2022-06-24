import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import '../css/Profile.css';

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
        <Header />
        <section className="profile">
          {
            loading ? <Loading size="big" />
              : user
              && (
                <>
                  <div className="userInfo">
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
                      alt={ `Foto de ${user.name}` }
                      data-testid="profile-image"
                    />
                  </div>

                  <div>
                    <Link to="/profile/edit" className="editBtn">
                      Editar perfil
                    </Link>
                  </div>
                </>

              )
          }
        </section>
      </div>
    );
  }
}

export default Profile;
