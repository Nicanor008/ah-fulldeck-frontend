import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Input from '../InputFields';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
	const props = {
		registerUser: jest.fn()
	};
	const wrapper = shallow(<Input {...props} />);

	return {
		props,
		wrapper
	};
}

describe('Signup elements tests', () => {
	it('renders a the signup form elements', () => {
		const { wrapper } = setup();
	});
});
