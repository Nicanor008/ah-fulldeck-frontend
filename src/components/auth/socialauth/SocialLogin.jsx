import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import * as loginActions from '../../../actions/socialAuth';
import {
  auth,
  GoogleProvider,
  FacebookProvider,
  TwitterProvider,
} from '../../../config/firebase';
import { FACEBOOK, GOOGLE, TWITTER } from '../../../actions/types';
import SocialButton from './SocialButton';
import './SocialLogin.scss';
import Loader from '../../layout/Loader';
import launchToast from '../../../helpers/toaster';

class SocialLoginComponent extends React.Component {
  state = {
    providers: [
      {
        provider: FacebookProvider,
        type: FACEBOOK,
        name: 'facebook',
        button_class: 'facebook',
        class_name: 'fa-facebook-square facebook',
      },
      {
        provider: TwitterProvider,
        type: TWITTER,
        name: 'twitter',
        button_class: 'twitter',
        class_name: 'fa-twitter-square twitter',
      },
      {
        provider: GoogleProvider,
        type: GOOGLE,
        name: 'google-oauth2',
        button_class: '',
        class_name: 'google',
      },
    ],
  };

  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.fetchSocialData = this.fetchSocialData.bind(this);
    this.onclickHandler = this.onclickHandler.bind(this);
  }

  onclickHandler(access) {
    let accesstoken = null;
    if (access.provider === 'twitter') {
      accesstoken = {
        provider: access.provider,
        access_token: access.accessToken,
        access_token_secret: access.accessSecret,
      };
    } else {
      accesstoken = {
        provider: access.provider,
        access_token: access.accessToken,
      };
    }
    this.getData(accesstoken);
  }

  getData(accesstoken) {
    const dataFetch = this.props;
    const url = 'http://127.0.0.1:8000/api/v1/social/login/';
    dataFetch.fetchUsers();
    axios
      .post(url, accesstoken, {
        headers: {
          Accept: 'application/json',
        },
        crossDomain: true,
      })
      .then(response => {
        localStorage.setItem('user', response.data.user);
        dataFetch.receivedUsers(response.data);
      })
      .catch(err => {
        dataFetch.getError(err);
      });
  }

  switch = (response, dataFetch) => {
    switch (response.type) {
      case FACEBOOK:
        dataFetch.FacebookAuth(response);
        break;
      case GOOGLE:
        dataFetch.GoogleAuth(response);
        break;
      case TWITTER:
        dataFetch.TwitterAuth(response);
        break;
      default:
        break;
    }
  };

  fetchSocialData(oauthprovider, platform, authType) {
    const dataFetch = this.props;
    dataFetch.fetchUsers();
    auth
      .signInWithPopup(oauthprovider)
      .then(result => ({
        type: authType,
        payload: {
          authData: {
            provider: platform,
            accessToken: result.credential.accessToken,
            accessSecret: result.credential.secret,
          },
          userDetails: {
            name: result.additionalUserInfo.profile.name,
            photo: result.user.photoURL,
            email: result.user.email,
          },
        },
      }))
      .then(response => {
        localStorage.setItem('username', response.payload.userDetails.name);
        this.switch(response, dataFetch);
        this.onclickHandler(response.payload.authData);
      });
  }

  renderButton = providers => (
    <div className="btn-group">
      {providers.map(providerName => (
        <SocialButton
          key={providerName.name}
          Provider={providerName.provider}
          providerName={providerName.name}
          type={providerName.type}
          className={providerName.class_name}
          buttonClass={providerName.button_class}
          fetchSocialData={() => {
            this.fetchSocialData(
              providerName.provider,
              providerName.name,
              providerName.type,
            );
          }}
        />
      ))}
    </div>
  );

  render() {
    const { msg } = this.props;
    const { providers } = this.state;

    return (
      <div>
        {msg === 'success'
          ? launchToast(
            `${localStorage.getItem('username')} logged in successfully`,
            'toastSuccess',
            'descSuccess',
            'success',
          )
          : null}
        {msg === 'success' ? <Redirect to="/" /> : null}
        {msg === 'fetching' ? <Loader /> : null}

        {this.renderButton(providers)}
      </div>
    );
  }
}
export function mapStateToProps(state, myProps) {
  if (state.socialAuth) {
    return {
      socialAuth: state.socialAuth,
      msg: state.socialAuth.message,
      myProps,
    };
  }
  return {};
}

export function mapDispatchToProps(dispatch) {
  return {
    FacebookAuth: data => dispatch(loginActions.FacebookAuth(data)),
    GoogleAuth: data => dispatch(loginActions.GoogleAuth(data)),
    TwitterAuth: data => dispatch(loginActions.TwitterAuth(data)),

    fetchUsers: data => dispatch(loginActions.fetchUsers(data)),
    getError: data => dispatch(loginActions.getError(data)),
    receivedUsers: data => dispatch(loginActions.receivedUsers(data)),
  };
}
SocialLoginComponent.defaultProps = {
  msg: '',
};

SocialLoginComponent.propTypes = {
  msg: PropTypes.string,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SocialLoginComponent);
