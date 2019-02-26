import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserProfileComponent from '../../components/Users/UserProfileComponent';
import FollowersComponent from '../../components/Users/FollowersComponent';
import FollowingComponent from '../../components/Users/FollowingComponent';
import UsersProfilesComponent from '../../components/Users/UsersProfilesComponent';
import EditUserProfileComponent from '../../components/Users/EditUserProfileComponent';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    registerUser: jest.fn(),
  };
  const wrapper = shallow(<UserProfileComponent {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('User profile elements tests', () => {
  it('renders a the user profile', () => {
    const { wrapper } = setup();
  });
});

describe('Followers component', () => {
  const props = {
    getFollowers: jest.fn(),
    getAllUsers: jest.fn(),
    followUser: jest.fn(),
    getLoggedInUserFollowing: jest.fn(),
    match: {},
    profile: {},
    followers: {},
  };

  it('renders Followers component', () => {
    const wrapper = shallow(<FollowersComponent {...props} />);
    wrapper;
  });
  it('renders Following component', () => {
    const wrapper = shallow(<FollowingComponent {...props} />);
    wrapper;
  });
  it('renders Profiles component', () => {
    const wrapper = shallow(<UsersProfilesComponent {...props} />);
    wrapper;
  });
  it('renders Profile component', () => {
    const wrapper = shallow(<EditUserProfileComponent {...props} />);
    wrapper;
  });
});
