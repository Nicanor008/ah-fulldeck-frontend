import configureStore from 'redux-mock-store';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});

import reportArticle from '../reportArticleAction';

describe('Test rate an article actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  it('send rate article request actions', () => {
    const slug = 'test-article';
    const value = 5;
    store.dispatch(reportArticle(slug, value));
    expect(store.getActions()[0].type).toBe('REPORT_ARTICLE_REQUEST');
  });
});
