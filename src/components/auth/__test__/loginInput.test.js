import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TextInputGroup from "../../layout/TextInputGroup";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    registerUser: jest.fn()
  };
  const wrapper = shallow(<TextInputGroup {...props} />);

  return {
    props,
    wrapper
  };
}

describe("TextInputGroup elements tests", () => {
  it("renders a the login form elements", () => {
    const { wrapper } = setup();
  });
});
