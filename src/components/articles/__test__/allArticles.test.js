import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AllArticles from "../AllArticles";
import { checkPropTypes } from "prop-types";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import Pagination from "react-js-pagination";
import { MemoryRouter } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunk];
const fakeStore = configureStore(middlewares);

function setup() {
  const article = {
    title: "title",
    description: "description",
    body: "body",
    slug: "test-slug",
    image_url: "url",
    count: 12,
    author: {
      username: "test",
      image: "https://placehold.it/20x20"
    }
  };
  const props = {
    articles: article
  };

  const wrapper = shallow(<AllArticles {...props} />);

  return {
    wrapper,
    article,
    props
  };
}

const { wrapper, article } = setup();
describe("Articles component", () => {
  it("render all articles", () => {
    wrapper;
  });
  it("should render the article component as expected", () => {
    const component = shallow(<AllArticles debug />);
    expect(component).toMatchSnapshot();
  });
  describe("render the component and check if all items exist", () => {
    const store = fakeStore({
      getAllArticles: jest.fn(),
      articles: article
    });
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <AllArticles />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.exists(<div className="container" />)).toBe(false);
  });
  it("Pagination should render without throwing an error", () => {
    const store = fakeStore({
      registerUser: jest.fn(),
      getAllArticles: jest.fn(),
      articles: setup().article
    });
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <AllArticles />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find(Pagination).length).toBe(0);
  });
  describe("Check proptypes", () => {
    it("Should not throw a warning", () => {
      const expectedProptypes = {
        articles: setup.articles
      };
      const propError = checkPropTypes(
        AllArticles.propTypes,
        expectedProptypes,
        "props",
        AllArticles.name
      );
      expect(propError).toBeUndefined;
    });
  });
});
