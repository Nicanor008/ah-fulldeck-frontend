import { dislikeArticleSuccess, dislikeArticleFailure, dislikeArticleRequest } from '../likeDislikeActions';
import { DISLIKE_ARTICLE_FAILURE, DISLIKE_ARTICLE_REQUEST, DISLIKE_ARTICLE_SUCCESS } from '../types';

describe('likeDislikeActions', () => {
	it('Should return correct request action', () => {
		const expectedAction = {
			type: DISLIKE_ARTICLE_REQUEST
		};
		const result = dislikeArticleRequest('remmy');
		expect(expectedAction).toEqual(result);
	});

	it('Should create an action for like article success', () => {
		const expectedAction = {
			type: DISLIKE_ARTICLE_SUCCESS,
			payload: {}
		};
		const result = dislikeArticleSuccess({});
		expect(expectedAction).toEqual(result);
	});

	it('Should create an action for like article error', () => {
		const expectedAction = {
			type: DISLIKE_ARTICLE_FAILURE,
			payload: undefined
		};
		const result = dislikeArticleFailure({});
		expect(expectedAction).toEqual(result);
	});
});
