import { likeArticleSuccess, likeArticleRequest, likeArticleFailure } from '../likeDislikeActions';
import { LIKE_ARTICLE_FAILURE, LIKE_ARTICLE_SUCCESS, LIKE_ARTICLE_REQUEST } from '../types';

describe('likeDislikeActions', () => {
	it('Should return correct request action', () => {
		const expectedAction = {
			type: LIKE_ARTICLE_REQUEST
		};
		const result = likeArticleRequest('remmy');
		expect(expectedAction).toEqual(result);
	});

	it('Should create an action for like article success', () => {
		const expectedAction = {
			type: LIKE_ARTICLE_SUCCESS,
			payload: {}
		};
		const result = likeArticleSuccess({});
		expect(expectedAction).toEqual(result);
	});

	it('Should create an action for like article error', () => {
		const expectedAction = {
			type: LIKE_ARTICLE_FAILURE,
			payload: {}
		};
		const result = likeArticleFailure({});
		expect(expectedAction).toEqual(result);
	});
});
