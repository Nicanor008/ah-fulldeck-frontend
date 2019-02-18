import React from 'react';
import Enzyme, { shallow } from "enzyme";
import App from './App';
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });


describe('App', () => {
	it('Should render without crashing', function() {
		const app = shallow(<App />);
		expect(app.length).toBe(1);
	});
});
