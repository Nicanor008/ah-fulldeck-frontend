import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditArticle from '../EditArticle';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    EditArticle: jest.fn()
  };
  const wrapper = shallow(<EditArticle {...props} />);

  return {
    props,
    wrapper
  };
}

describe('Edit article', () => {
  it('renders a the edit article form elements', () => {
    const { wrapper } = setup();
  });
});
