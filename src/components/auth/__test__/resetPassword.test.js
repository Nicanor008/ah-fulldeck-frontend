import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ResetPassword from "../ResetPassword";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    addEmail: jest.fn()
  };
  const wrapper = shallow(<ResetPassword {...props} />);

  return {
    props,
    wrapper
  };
}

describe("ResetPassword elements tests", () => {
  it("renders a the email form elements", () => {
    const { wrapper } = setup();
  });
});