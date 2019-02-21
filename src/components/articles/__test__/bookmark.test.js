import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BookmarkArticle from '../boomarks/Bookmark';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    bookmark: jest.fn(),
  };
  const wrapper = shallow(<BookmarkArticle {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('Bookmark article elements', () => {
  it('render elements to bookmark articles', () => {
    const { wrapper } = setup();
    expect(wrapper).toBeDefined();
  });
  it('render bookmark icon ', () => {
    const { wrapper } = setup();
    const icon = wrapper.find('#bookmark');
    expect(icon).toBeDefined();
  });
});
