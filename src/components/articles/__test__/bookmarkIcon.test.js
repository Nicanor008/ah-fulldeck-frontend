import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BookmarkIcon from '../boomarks/bookmarkButton';


Enzyme.configure({ adapter: new Adapter() });

  function setup() {
    const props = {
        onBookmarkClick: jest.fn(),
    };
    const wrapper = shallow(<BookmarkIcon {...props} />);
  
    return {
      props,
      wrapper,
    };
  }
  
  describe('Bookmark icon elements', () => {
    it('render elements for bookmark icon', () => {
      const { wrapper } = setup();
    });
  });
