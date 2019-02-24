import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RatingArticle from '../RatingArticle';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    allArticles: jest.fn(),
  };
  const wrapper = shallow(<RatingArticle {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('Rating an article test', () => {
  it('Rate an article on the single article page', () => {
    const { wrapper } = setup();
  });
});
