import { likeDislike } from '../likeDislikeReducer';
import { LIKE_ARTICLE_REQUEST } from '../../actions/types';

describe('likeDislike', () => {
	let payload = '';

	beforeEach(() => {
		payload = 'kinara-is-here';
	});
	it('should return the initial state', () => {
		expect(likeDislike({ isLiking: true }, {})).toEqual({
			isLiking: true
		});
	});

	it('should handle LIKE_ARTICLE_REQUEST', () => {
		expect(
			likeDislike(
				{ isLiking: true },
				{
					type: LIKE_ARTICLE_REQUEST,
					payload
				}
			)
		).toEqual({
			isLiking: true
		});
	});
});
