import sortBy from 'sort-by'
// import axios from 'axios'

export const POSTS_HAS_ERRORED = 'POSTS_HAS_ERRORED';
export const POSTS_ARE_LOADING = 'POSTS_ARE_LOADING';
export const CATEGORIES_HAS_ERRORED = 'CATEGORIES_HAS_ERRORED';
export const CATEGORIES_ARE_LOADING = 'CATEGORIES_ARE_LOADING';
export const SORT_POSTS = 'SORT_POSTS';
export const FILTER_POSTS = 'FILTER_POSTS';
export const POSTS_FETCH_SUCCESS = 'POSTS_FETCH_SUCCESS';
export const CATEGORIES_FETCH_SUCCESS = 'CATEGORIES_FETCH_SUCCESS';
export const RATE = 'RATE';
export const RATE_COMMENT = 'RATE_COMMENT';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const CATEGORIZED_FETCH_SUCCESS = 'CATEGORIZED_FETCH_SUCCESS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';


const headers = {
    'Accept': 'application/json',
    'Authorization': 'User',
    'Content-Type': 'application/json'
}

export function postsHasErrored(bool) {
    return {
        type: POSTS_HAS_ERRORED,
        hasErrored: bool
    };
}

export function postsAreLoading(bool) {
    return {
        type: POSTS_ARE_LOADING,
        isLoading: bool
    };
}

export function categoriesHasErrored(bool) {
    return {
        type: CATEGORIES_HAS_ERRORED,
        hasErrored: bool
    };
}

export function categoriesAreLoading(bool) {
    return {
        type: CATEGORIES_ARE_LOADING,
        isLoading: bool
    };
}

export function sortPosts(sortBy) {
    return {
        type: SORT_POSTS,
        sortFactor: sortBy
    };
}

export function getPosts() {
    return dispatch => {
        dispatch(postsAreLoading(true));
        
        fetch("/posts", {
            method: 'GET',
            headers
          })
            .then((posts) => {
                if (!posts.ok) {
                    throw Error(posts.statusText);
                }        
                return posts;
            })
            .then((posts) => posts.json())
            .then(posts =>
                Promise.all(
                    posts.map(post =>
                        fetch(`/posts/${post.id}/comments`, {
                            method: 'GET',
                            headers
                        })
                        .then((comments) => {
                            if (!comments.ok) {
                                throw Error(comments.statusText);
                            }
                            return comments;
                            })
                            .then((comments) => comments.json())
                            .then(comments => {
                                post.comments = comments.sort(sortBy('-voteScore'));
                                post.commentsNumber = comments.length;
                            })
                            .then(() => post)
                    )
                )
            )
            //.then(posts => dispatch({ type: 'POSTS_FETCH_DATA_SUCCESS', posts }))
            .then((posts) => dispatch({ type: POSTS_FETCH_SUCCESS, posts }))
            .then(() => dispatch(postsAreLoading(false)))
    };
}


export function getCategories() {
    return (dispatch) => {
        dispatch(categoriesAreLoading(true));

        fetch("/categories", {
                method: 'GET',
                headers
            })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(categoriesAreLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((response) => dispatch({ type: CATEGORIES_FETCH_SUCCESS, categories: response.categories }))
            .catch(() => dispatch(categoriesHasErrored(true)));
    };
}

export function ratePost(rate, id, index, sortFactor, newScore) {
    return (dispatch) => {
        dispatch({ type: RATE, newScore, index, sortFactor })
        //dispatch before fetch so the state update without waiting for the resolve
        fetch(`/posts/${id}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(rate)
          }).catch(() => dispatch(postsHasErrored(true)));
    };
}

export function rateComment(rate, id, indexComment, indexPost, newScore) {
    return (dispatch) => {
        dispatch({ type: RATE_COMMENT, indexComment, indexPost, newScore })
        //dispatch before fetch so the state update without waiting for the resolve
        fetch(`/comments/${id}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(rate)
          })
            .catch(() => dispatch(postsHasErrored(true)));
    };
}

export function deletePost(id) {
    return (dispatch) => {
        fetch(`/posts/${id}`, {
            method: 'DELETE',
            headers
          })
            .then((response) => response.json())
            .then((post) => dispatch({ type: DELETE_POST, id: post.id }))
            .catch(() => dispatch(postsHasErrored(true)));
    };
}

export function deleteComment(id, indexComment, indexPost) {
    return (dispatch) => {
        fetch(`/comments/${id}`, {
            method: 'DELETE',
            headers
          })
            .then((response) => response.json())
            .then((comment) => dispatch({ type: DELETE_COMMENT, id: comment.id, indexPost }))
            .catch(() => dispatch(postsHasErrored(true)));
    };
}

export function getPostsCategorized(category) {
    return dispatch => {
        dispatch(postsAreLoading(true));
        
        fetch(`/${category}/posts`, {
            method: 'GET',
            headers
          })
            .then((posts) => {
                if (!posts.ok) {
                    throw Error(posts.statusText);
                }
                return posts;
            })
            .then((posts) => posts.json())
            .then(posts =>
                Promise.all(
                    posts.map(post =>
                        fetch(`/posts/${post.id}/comments`, {
                            method: 'GET',
                            headers
                        })
                        .then((comments) => {
                            if (!comments.ok) {
                                throw Error(comments.statusText);
                            }
                            return comments;
                            })
                            .then((comments) => comments.json())
                            .then(comments => {
                                post.comments = comments.sort(sortBy('-voteScore'));
                                post.commentsNumber = comments.length;
                            })
                            .then(() => post)
                    )
                )
            )
            //.then(posts => dispatch({ type: 'POSTS_FETCH_DATA_SUCCESS', posts }))
            .then((posts) => dispatch({ type: CATEGORIZED_FETCH_SUCCESS, posts: posts.sort(sortBy('-voteScore')) }))
            .then(() => dispatch(postsAreLoading(false)));
    };
}

export function addPost(post) {
    return (dispatch) => {
        fetch(`/posts/`, {
            method: 'POST',
            headers,
            body: JSON.stringify(post)
          })
            .then((response) => response.json())
            .then((post) => dispatch({ type: ADD_POST, post }))
            .catch(() => dispatch(postsHasErrored(true)));
    };
}

export function editPost(post, id, indexPost) {
    return (dispatch) => {
        fetch(`/posts/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(post)
          })
            .then((response) => response.json())
            .then((post) => dispatch({ type: EDIT_POST, post, indexPost }))
            .catch(() => dispatch(postsHasErrored(true)));
    };
}

export function addComment(comment, indexPost) {
    return (dispatch) => {
        fetch(`/comments`, {
            method: 'POST',
            headers,
            body: JSON.stringify(comment)
          })
            .then((response) => response.json())
            .then((comment) => dispatch({ type: ADD_COMMENT, comment, indexPost }))
            .catch(() => dispatch(postsHasErrored(true)));
    };
}

export function editComment(id, indexPost, indexComment, comment) {
    return (dispatch) => {
        fetch(`/comments/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(comment)
          })
            .then((response) => response.json())
            .then((comment) => dispatch({ type: EDIT_COMMENT, comment, indexPost, indexComment }))
            .catch(() => dispatch(postsHasErrored(true)));
    };
}