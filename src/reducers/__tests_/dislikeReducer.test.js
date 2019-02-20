import { likeDislike } from '../likeDislikeReducer';
import { DISLIKE_ARTICLE_REQUEST } from '../../actions/types';

describe('likeDislike', () => {
	let payload = '';

	beforeEach(() => {
		payload = 'kinara-is-here';
	});
	it('should return the initial state', () => {
		expect(likeDislike({ isDisliking: true }, {})).toEqual({
			isDisliking: true
		});
	});

	it('should handle DISLIKE_ARTICLE_REQUEST', () => {
		expect(
			likeDislike(
				{ isDisliking: true },
				{
					type: DISLIKE_ARTICLE_REQUEST,
					payload
				}
			)
		).toEqual({
			isDisliking: true
		});
	});
});
