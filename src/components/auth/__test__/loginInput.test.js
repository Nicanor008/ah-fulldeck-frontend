import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextInputGroup from '../../layout/TextInputGroup';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    loginUser: jest.fn(),
    name: 'andela',
    placeholder: 'this is andela',
    type: 'andela',
    value: "",
    onChange: () => {},
    spin: Symbol(),
  };
  const wrapper = shallow(<TextInputGroup {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('TextInputGroup elements tests', () => {
  it('renders a the login form elements', () => {
    const { wrapper } = setup();
    expect(wrapper.find({ name: 'andela' }).length).toBe(1);
  });
});
