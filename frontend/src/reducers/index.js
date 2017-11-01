import { combineReducers } from 'redux';
import sortBy from 'sort-by'
import { 
POSTS_HAS_ERRORED, 
POSTS_ARE_LOADING,
CATEGORIES_HAS_ERRORED,
CATEGORIES_ARE_LOADING,
SORT_POSTS,
POSTS_FETCH_SUCCESS,
CATEGORIES_FETCH_SUCCESS,
RATE,
RATE_COMMENT,
DELETE_POST,
DELETE_COMMENT,
CATEGORIZED_FETCH_SUCCESS,
ADD_POST,
EDIT_POST,
ADD_COMMENT,
EDIT_COMMENT 
} from '../actions'

export function postsHasErrored(state = false, action) {
    switch (action.type) {
        case POSTS_HAS_ERRORED:
            return action.hasErrored;

        default:
            return state;
    }
}

export function postsAreLoading(state = false, action) {
    switch (action.type) {
        case POSTS_ARE_LOADING:
            return action.isLoading; 

        default:
            return state;
    }
}

export function categoriesHasErrored(state = false, action) {
    switch (action.type) {
        case CATEGORIES_HAS_ERRORED:
            return action.hasErrored;

        default:
            return state;
    }
}

export function categoriesAreLoading(state = false, action) {
    switch (action.type) {
        case CATEGORIES_ARE_LOADING:
            return action.isLoading; 

        default:
            return state;
    }
}

export function posts(state = {}, action) {
    switch (action.type) {
        case POSTS_FETCH_SUCCESS:
        return action.posts.sort(sortBy('-voteScore'));

        case CATEGORIZED_FETCH_SUCCESS:
        return action.posts;
        
        case DELETE_POST:
        return state.slice().filter((post) => post.id !== action.id);

        case DELETE_COMMENT: {
            const {id, indexPost} = action;
            const posts = state;        
            const updatedPost = posts[indexPost];
            const updatedVotedPost = {
              ...updatedPost,
              comments: updatedPost.comments.filter(comment => comment.id !== id) 
            };          
            const updatedPosts = [
              ...posts.slice(0, indexPost),
              updatedVotedPost,
              ...posts.slice(indexPost + 1, posts.length),
            ];          
            return updatedPosts
        }            

        case RATE: {
            const {index, newScore, sortFactor} = action;
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
            return updatedPosts.sort(sortBy(sortFactor))
        }

        case RATE_COMMENT: {
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

        case SORT_POSTS: 
        return state.slice().sort(sortBy(action.sortFactor));
        
        case ADD_POST: {
            const post = action.post
            post.comments = [];
            return state.slice().concat(post)
        }

        case EDIT_POST: {
            const {indexPost, post} = action;
            const posts = state;
            const editedPost = posts[indexPost];
            editedPost.body = post.body;                
            editedPost.title = post.title;                
            editedPost.edited = true;                
            const updatedPosts = [
              ...posts.slice(0, indexPost),
              editedPost,
              ...posts.slice(indexPost + 1, posts.length),
            ];          
            return updatedPosts.sort(sortBy('-voteScore'))
        }

        case ADD_COMMENT: {
            const { comment, indexPost } = action;
            const posts = state;
            const updatedPost = posts[indexPost];
            updatedPost.comments = updatedPost.comments.concat(comment);
            const updatedPosts = [
                ...posts.slice(0, indexPost),
                updatedPost,
                ...posts.slice(indexPost + 1, posts.length),
              ];
            return updatedPosts;
        }

        case EDIT_COMMENT: {
            const {indexPost, comment, indexComment } = action;
            const posts = state;
            const editedPost = posts[indexPost];
            editedPost.comments[indexComment].body = comment.body;                
            editedPost.comments[indexComment].timestamp = comment.timestamp;
            editedPost.comments = editedPost.comments.sort(sortBy('-voteScore'));
            const updatedPosts = [
              ...posts.slice(0, indexPost),
              editedPost,
              ...posts.slice(indexPost + 1, posts.length),
            ];          
            return updatedPosts
        }

        default:
            return state;
    }
}

export function categories(state = {}, action) {
    switch (action.type) {
        case CATEGORIES_FETCH_SUCCESS:
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
    categoriesAreLoading
});
