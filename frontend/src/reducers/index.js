import { combineReducers } from 'redux';
import sortBy from 'sort-by'

export function postsHasErrored(state = false, action) {
    switch (action.type) {
        case 'POSTS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function postsIsLoading(state = false, action) {
    switch (action.type) {
        case 'POSTS_IS_LOADING':
            return action.isLoading; 

        default:
            return state;
    }
}

export function categoriesHasErrored(state = false, action) {
    switch (action.type) {
        case 'CATEGORIES_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function categoriesIsLoading(state = false, action) {
    switch (action.type) {
        case 'CATEGORIES_IS_LOADING':
            return action.isLoading; 

        default:
            return state;
    }
}

export function posts(state = {}, action) {
    switch (action.type) {
        case 'POSTS_FETCH_SUCCESS':
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

export function categories(state = {}, action) {
    switch (action.type) {
        case 'CATEGORIES_FETCH_SUCCESS':
        return action.categories;

        default:
            return state;
    }
}


export default combineReducers({
    posts,
    postsHasErrored,
    postsIsLoading,
    categories,
    categoriesHasErrored,
    categoriesIsLoading
});
