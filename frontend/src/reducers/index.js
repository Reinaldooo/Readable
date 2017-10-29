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
        return action.posts.sort(sortBy('-voteScore'));

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

        case 'RATE_COMMENT': {
            const {indexPost, indexComment, comment} = action;
            const posts = state;        
            const votedPost = posts[indexPost];
            votedPost.comments[indexComment] = comment;
            votedPost.comments = votedPost.comments.sort(sortBy('-voteScore'));                      
            const updatedPosts = [
              ...posts.slice(0, indexPost),
              votedPost,
              ...posts.slice(indexPost + 1, posts.length),
            ];          
            return updatedPosts.sort(sortBy('-voteScore'))
        }

        case 'SORT_POSTS': {
        console.log(state.sort(sortBy(action.sortBy)));
        return state.sort(sortBy(action.sortBy));
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
    postsAreLoading,
    categories,
    categoriesHasErrored,
    categoriesAreLoading,
    postsCount
});
