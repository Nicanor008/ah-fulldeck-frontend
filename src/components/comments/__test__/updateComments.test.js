import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UpdateComment from '../UpdateComment';
import Comment from '../Comment';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const comment =
    {
      body: 'andela',
      author: 'andelan',
      created_at: 'andela',
      author_image: 'url',
    }
  const updatedComment =
  {
      body: 'This is my andela',
      author: 'andelan',
      created_at: 'andela',
      author_image: 'url',
    }
  const props = {
    updateComment: jest.fn().mockImplementation(() => Promise.resolve()),
    getComment: jest.fn().mockImplementation(() => Promise.resolve()),
    id: 1,
    slug: 'this-is-a-slug',
    body: 'This is a comment',
    comment: { comment, updatedComment },
  };
  const wrapper = shallow(<UpdateComment {...props} />);
  return {
    props,
    wrapper,
  };
}

describe('Comments elements tests', () => {
  it('renders the updated comments elements', () => {
    const { wrapper, props } = setup()
    wrapper.setState({
      fetched: true,
    });
    expect(props.updateComment.mock.calls.comment).toBe(props.updatedComment)
  });
});


