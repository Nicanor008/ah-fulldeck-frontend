import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LikesDislikes from '../LikeDislikeArticle';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
	const props = {
		LikesDislikes: jest.fn()
	};
	const wrapper = shallow(<LikesDislikes {...props} />);

	return {
		props,
		wrapper
	};
}

describe('Likes dislikes elements tests', () => {
	it('renders a the likes dislikes form elements', () => {
		const { wrapper } = setup();
	});
});
