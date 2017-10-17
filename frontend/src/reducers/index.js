import { combineReducers } from 'redux';
import sortBy from 'sort-by'

export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return action.isLoading; 

        default:
            return state;
    }
}

export function posts(state = {}, action) {
    switch (action.type) {
        case 'POSTS_FETCH_DATA_SUCCESS':
        return action.posts;

        case 'RATE': {
            const {index, newScore} = action;
            const posts = state;        
            const votedPost = posts[index];
            const updatedVotedPost = {
              ...votedPost,
              voteScore: newScore
            };          
            const updatedPosts = [
              ...posts.slice(0, index),
              updatedVotedPost,
              ...posts.slice(index + 1, posts.length),
            ];          
            return updatedPosts.sort(sortBy('-voteScore'))
        }

        default:
            return state;
    }
}


export default combineReducers({
    posts,
    itemsHasErrored,
    itemsIsLoading
});
