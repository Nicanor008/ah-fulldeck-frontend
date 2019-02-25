import configureStore from 'redux-mock-store';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});

import {
    getAllArticles,
    postArticle
} from '../articleActions';


describe('Test articles actions', () => {
    beforeEach(() => {
        store.clearActions();
    });
    it('Should fetch first article first request actions', () => {
        store.dispatch(getAllArticles());
        expect(store.getActions()[0].type).toBe('ISFETCHING');
    });
});
