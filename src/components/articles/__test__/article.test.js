import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Article from '../Article';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    registerUser: jest.fn(),
  };
  const wrapper = shallow(<Article {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('Article contents', () => {
  it('renders all data of an article', () => {
    const { wrapper } = setup();
  });
});
