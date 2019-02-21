import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DisplayRating from '../DisplayRating';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    article: {
      article: {
        title: 'title',
        description: 'description',
        body: 'body',
        slug: 'test-slug',
        image_url: 'url',
        count: 12,
        author: {
          username: 'test',
          image: 'https://placehold.it/20x20',
        },
        avg_rating: { avg_rating: 5 },
      },
    },
  };
  const wrapper = shallow(<DisplayRating {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('Article rating on the single article page element test', () => {
  it('renders a rating for an article on the single article page', () => {
    const { wrapper } = setup();
  });
  it('render a star rating component', () => {
    const { wrapper } = setup();
    expect(wrapper.find('StarRatingComponent').length).toBe(1);
  });
});
