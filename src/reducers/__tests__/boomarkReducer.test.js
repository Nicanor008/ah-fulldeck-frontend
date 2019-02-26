import bookmarkArticlesReducer, { initialState } from '../bookmarkReducer';
import {
  BOOKMARK_ARTICLE,
  UNBOOKMARK_ARTICLE,
  BOOKMARK_ARTICLE_FAILURE,
  GET_ALL_BOOKMARKS_SUCCESS,
} from '../../actions/types';

const action = {
  action: {
    isBookmarked: '',
  },
};
const allBookmarks = [
  {
    bookmark: "bookmark one"
  },
  {
    bookmark: "Another bookmark"
  }
];

const bookmark = action.action.isBookmarked;

describe('Bookmark reducers', () => {
  it('should provide the initial state', () => {
    expect(bookmarkArticlesReducer(undefined, {})).toEqual(initialState);
  });

  it('should add data to the state', () => {
    expect(
      bookmarkArticlesReducer(initialState, {
        type: BOOKMARK_ARTICLE,
        isBookmarked: bookmark,
      }).isBookmarked,
    ).toEqual(true);
  });
  it('should add data to the state', () => {
    expect(
      bookmarkArticlesReducer(initialState, {
        type: UNBOOKMARK_ARTICLE,
        isBookmarked: bookmark,
      }).isBookmarked,
    ).toEqual(false);
  });

  it('should add data to the state', () => {
    expect(
      bookmarkArticlesReducer(initialState, {
        type: BOOKMARK_ARTICLE_FAILURE,
        isBookmarked: bookmark,
      }).isBookmarked,
    ).toEqual(false);
  });
  it("should return all bookmarked articles", () => {
    expect(
      bookmarkArticlesReducer(initialState, {
        type: GET_ALL_BOOKMARKS_SUCCESS,
        data: allBookmarks
      }).bookmarks
    ).toEqual(allBookmarks);
  });
});
 
