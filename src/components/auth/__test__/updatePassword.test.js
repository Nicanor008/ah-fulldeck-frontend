import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UpdatePassword from '../UpdatePassword';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    updatePassword: jest.fn(),
  };
  const wrapper = shallow(<UpdatePassword {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('UpdatePassword elements tests', () => {
  it('renders a the password form elements', () => {
    const { wrapper } = setup();
  });
});
