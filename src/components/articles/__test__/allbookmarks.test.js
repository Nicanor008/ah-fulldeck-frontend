import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Bookmarks from '../boomarks/AllBookmarks';
import Article from '../../articles/Article';
import App from '../../../App'


Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunk];
const fakeStore = configureStore(middlewares);

describe('Bookmarks Component snapshot', () => {
    it('should render the Login component as expected', () => {
      const component = shallow(<Bookmarks />);
      expect(component.find(Article)); 
      expect(component.length).toBe(1);
    });
  });

test('valid path to bookmarks should not redirect to 404', () => {
    const store = fakeStore({
        bookmark: {
          bookmarks: {'title' : 'Charity'}
        },
        articles: {
            nofetching: ''
          }
      });
    const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={[ '/articles/bookmarks' ]}>
        <App/>
      </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(Bookmarks));
  });
