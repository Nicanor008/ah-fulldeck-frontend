import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CreateArticle from "../CreateArticle";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
    const props = {
        registerUser: jest.fn()
    };
    const wrapper = shallow(<CreateArticle {...props} />);

    return {
        props,
        wrapper
    };
}

describe("Create article elements", () => {
    it("render elements to create article", () => {
        const { wrapper } = setup();
    });
});
