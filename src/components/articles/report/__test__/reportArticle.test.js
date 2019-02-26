import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReportArticle from '../Report';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    reportArticles: jest.fn(),
  };
  const wrapper = shallow(<ReportArticle {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('Reporting an article component test', () => {
  it('Reporting an article on the single article page', () => {
    const { wrapper } = setup();
  });
});
