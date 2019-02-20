import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AllArticles from '../AllArticles';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    registerUser: jest.fn(),
  };
  const wrapper = shallow(<AllArticles {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('Get all articles', () => {
  it('render all articles', () => {
    const { wrapper } = setup();
  });
});
