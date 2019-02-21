import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Comments } from '../Comments';
import Comment from '../Comment';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const comments = [
    {
      body: 'andela',
      author: 'this is andela',
      created_at: 'andela',
      author_image: 'url',
    },
    {
      body: 'andela',
      author: 'this is andela',
      created_at: 'andela',
      author_image: 'url',
    },
  ];

  const props = {
    getComments: jest.fn().mockImplementation(() => Promise.resolve()),
    match: {
      params: 'som',
    },
    comments: { comments },
  };
  const wrapper = shallow(<Comments {...props} />);
  return {
    props,
    wrapper,
  };
}

describe('Comments elements tests', () => {
  it('renders the comments elements', () => {
    const { wrapper } = setup();

    wrapper.setState({
      fetched: true,
    });

    expect(wrapper.find(Comment).length).toBe(2);
  });
});
