import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SingleArticle from '../SingleArticle';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    registerUser: jest.fn(),
  };
  const wrapper = shallow(<SingleArticle {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('fetch a single article', () => {
  it('renders a single article', () => {
    const { wrapper } = setup();
  });
});
