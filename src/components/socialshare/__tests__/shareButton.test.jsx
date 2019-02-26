import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SocialButton from '../ShareContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('Test socialMediaButton', () => {
  const props = {
    icon: 'faFacebook',
    text: 'facebook',
    link: '/facebook',
  };

  it('has only one anchor attribute', () => {
    const wrapper = shallow(<SocialButton {...props} />);
    const button = wrapper.find('a');
    expect(button).toHaveLength(1);
  });
});
