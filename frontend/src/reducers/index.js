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

export function postsAreLoading(state = false, action) {
    switch (action.type) {
        case 'POSTS_ARE_LOADING':
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

export function categoriesAreLoading(state = false, action) {
    switch (action.type) {
        case 'CATEGORIES_ARE_LOADING':
            return action.isLoading; 

        default:
            return state;
    }
}

export function postsCount(state = {}, action) {
    switch (action.type) {
        case 'POSTS_COUNT':
            return action.posts;

        default:
            return state;
}
}


export function posts(state = {}, action) {
    switch (action.type) {
        case 'POSTS_FETCH_SUCCESS':
        return action.posts;

        case 'CATEGORIZED_FETCH_SUCCESS':
        return action.posts;
        
        case 'DELETE_POST':
        return state.filter((post) => post.id !== action.id);

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
        case 'CATEGORY_CHANGER':
        return state.filter((post) => post.category === action.category);

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
    postsAreLoading,
    categories,
    categoriesHasErrored,
    categoriesAreLoading,
    postsCount
});
