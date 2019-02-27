import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BookmarkArticle from '../boomarks/Bookmark';
import SingleArticle from '../SingleArticle';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
    const props = {
        article: jest.fn(),
    };
    const wrapper = shallow(<SingleArticle />);

    return {
        props,
        wrapper,
    };
}

describe('Articles', () => {
    it('render elements to a single articles', () => {
        const { wrapper } = setup();
        expect(wrapper).toBeDefined();
    });
    it('render the aricle view icon', () => {
        const { wrapper } = setup();
        const icon = wrapper.find('.article-views');
        expect(icon).toBeDefined();
    });
});
