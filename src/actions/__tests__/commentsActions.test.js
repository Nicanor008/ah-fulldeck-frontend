import configureStore from 'redux-mock-store';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';

import {
  addComment,
  getComments,
} from '../commentsActions';

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});


describe('Test comments actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  it('send fetch comments request actions', () => {
    store.dispatch(getComments());
    expect(store.getActions()[0].type).toBe('COMMENT_REQUEST');
  });

  it('send add comments request actions', () => {
    store.dispatch(addComment());
    expect(store.getActions()[0].type).toBe('COMMENT_REQUEST');
  });
});
