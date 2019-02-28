import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FollowersComponent from '../FollowersComponent';
import FollowingComponent from '../FollowingComponent';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    getFollowers: jest.fn(),
    getFollowing: jest.fn(),
  };
  return {
    props,
  };
}

describe('Followers component tests', () => {
  const { props } = setup();
  const wrapper = shallow(<FollowersComponent {...props} />);
  it('renders the followers component', () => {
    expect(wrapper.find('div').length).toBe(0);
  });
});
describe('Following component tests', () => {
  const { props } = setup();
  const wrapper = shallow(<FollowingComponent {...props} />);
  it('renders the following component', () => {
    expect(wrapper.find('div').length).toBe(0);
  });
});
