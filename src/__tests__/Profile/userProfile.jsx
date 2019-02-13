import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import UserProfileComponent from "../../components/Users/UserProfileComponent";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    registerUser: jest.fn()
  };
  const wrapper = shallow(<UserProfileComponent {...props} />);

  return {
    props,
    wrapper
  };
}

describe("User profile elements tests", () => {
  it("renders a the user profile", () => {
    const { wrapper } = setup();
  });
});
