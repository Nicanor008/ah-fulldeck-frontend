import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  bookmark,
  bookmarkingFailed,
  unbookmark,
  getBookmarkSuccess,
  getBookmarkFail,
} from '../../actions/bookmarkActions';
import {
  BOOKMARK_ARTICLE,
  BOOKMARK_ARTICLE_FAILURE,
  UNBOOKMARK_ARTICLE,
  GET_ALL_BOOKMARKS_SUCCESS,
  GET_ALL_BOOKMARKS_FAIL,
} from '../types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const bookmarked = "Article bookmarked successfully.";
const bookmarkfailed = "Bookmarking failed";
const unbookmarked = "Article was unbookmarked successfully.";	
const allBookmarks = [
  {
    bookmark: "first bookmark"
  },
  {
    bookmark: "second bookmark"
  }
];

describe('action creators', () => {
  it('should dispatch BOOKMARK_ARTICLE type', () => {
    expect(bookmark({}).type).toEqual(BOOKMARK_ARTICLE);
  });
  it('should dispatch BOOKMARK_ARTICLE_FAILURE type', () => {
    expect(bookmarkingFailed({}).type).toEqual(BOOKMARK_ARTICLE_FAILURE);
  });
  it('should dispatch UNBOOKMARK_ARTICLE type', () => {
    expect(unbookmark({}).type).toEqual(UNBOOKMARK_ARTICLE);
  });
  it('should dispatch GET_ALL_BOOKMARKS_SUCCESS type', () => {
    expect(getBookmarkSuccess({}).type).toEqual(GET_ALL_BOOKMARKS_SUCCESS);
  });
  it('should dispatch GET_ALL_BOOKMARKS_FAIL type', () => {
    expect(getBookmarkFail({}).type).toEqual(GET_ALL_BOOKMARKS_FAIL);
  });
});

describe("bookmarking actions", () => {
  const store = mockStore({});
  it("returns all bookmarks ", () => {
    const expectedAction = {
      type: GET_ALL_BOOKMARKS_SUCCESS,
      allBookmarks
    };
    const actionsDispatched = store.dispatch(
      getBookmarkSuccess(allBookmarks)
    );
    expect(actionsDispatched.data).toEqual(expectedAction.allBookmarks);
  });
});
