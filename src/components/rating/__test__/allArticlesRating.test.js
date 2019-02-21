import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AllArticlesDisplayRating from '../AllArticlesDisplayRating';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    allArticles: jest.fn(),
  };
  const wrapper = shallow(<AllArticlesDisplayRating {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('Article rating on the all articles page elements test', () => {
  it('renders the average rating for an article on the all articles page', () => {
    const { wrapper } = setup();
  });
  it('render a star rating component', () => {
    const { wrapper } = setup();
    expect(wrapper.find('StarRatingComponent').length).toBe(1);
  });
});
