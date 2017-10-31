import sortBy from 'sort-by'
// import axios from 'axios'

const headers = {
    'Accept': 'application/json',
    'Authorization': 'User',
    'Content-Type': 'application/json'
  }

const api = "http://localhost:3001"

export function postsHasErrored(bool) {
    return {
        type: 'POSTS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function postsAreLoading(bool) {
    return {
        type: 'POSTS_ARE_LOADING',
        isLoading: bool
    };
}

export function categoriesHasErrored(bool) {
    return {
        type: 'CATEGORIES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function categoriesAreLoading(bool) {
    return {
        type: 'CATEGORIES_ARE_LOADING',
        isLoading: bool
    };
}

export function sortPosts(sortBy) {
    return {
        type: 'SORT_POSTS',
        sortFactor: sortBy
    };
}

export function getPosts() {
    return dispatch => {
        dispatch(postsAreLoading(true));
        
                fetch("http://localhost:3001/posts", {
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
                        fetch(`${api}/posts/${post.id}/comments`, {
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
            .then((posts) => dispatch({ type: 'POSTS_FETCH_SUCCESS', posts }))
            .then(() => dispatch(postsAreLoading(false)))
    };
}


export function getCategories() {
    return (dispatch) => {
        dispatch(categoriesAreLoading(true));

        fetch("http://localhost:3001/categories", {
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
            .then((response) => dispatch({ type: 'CATEGORIES_FETCH_SUCCESS', categories: response.categories }))
            .catch(() => dispatch(categoriesHasErrored(true)));
    };
}

/* export function Example() {
    return dispatch => {
        ReadableAPI
            .getPosts()
            .then(posts =>
                Promise.all(
                    posts.map(post =>
                        ReadableAPI
                            .getComments(post.id)
                            .then(comments => post.comments = comments)
                            .then(() => post)
                    )
                )
            )
            .then(posts =>
                dispatch({ type: GET_POSTS, posts })
            );
    };
} */

export function ratePost(rate, id, index, sortFactor) {
    return (dispatch) => {
        fetch(`${api}/posts/${id}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(rate)
          })
            .then((response) => response.json())
            .then((post) => dispatch({ type: 'RATE', newScore: post.voteScore, index, sortFactor }))
            .catch(() => dispatch(postsHasErrored(true)));
    };
}

export function rateComment(rate, id, indexComment, indexPost) {
    return (dispatch) => {
        fetch(`${api}/comments/${id}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(rate)
          })
            .then((response) => response.json())
            .then((comment) => dispatch({ type: 'RATE_COMMENT', comment, indexComment, indexPost }))
            .catch(() => dispatch(postsHasErrored(true)));
    };
}

export function deletePost(id) {
    return (dispatch) => {
        fetch(`${api}/posts/${id}`, {
            method: 'DELETE',
            headers
          })
            .then((response) => response.json())
            .then((post) => dispatch({ type: 'DELETE_POST', id: post.id }))
            .catch(() => dispatch(postsHasErrored(true)));
    };
}

export function deleteComment(id, indexComment, indexPost) {
    return (dispatch) => {
        fetch(`${api}/comments/${id}`, {
            method: 'DELETE',
            headers
          })
            .then((response) => response.json())
            .then((comment) => dispatch({ type: 'DELETE_COMMENT', id: comment.id, indexPost }))
            .catch(() => dispatch(postsHasErrored(true)));
    };
}

export function getPostsCategorized(category) {
    return dispatch => {
        dispatch(postsAreLoading(true));
        
                fetch(`http://localhost:3001/${category}/posts`, {
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
                        fetch(`${api}/posts/${post.id}/comments`, {
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
            .then((posts) => dispatch({ type: 'CATEGORIZED_FETCH_SUCCESS', posts: posts.sort(sortBy('-voteScore')) }))
            .then(() => dispatch(postsAreLoading(false)));
    };
}

export function addPost(post) {
    return (dispatch) => {
        fetch(`${api}/posts/`, {
            method: 'POST',
            headers,
            body: JSON.stringify(post)
          })
            .then((response) => response.json())
            .then((post) => dispatch({ type: 'ADD_POST', post }))
            .catch(() => dispatch(postsHasErrored(true)));
    };
}

export function editPost(post, id, indexPost) {
    return (dispatch) => {
        fetch(`${api}/posts/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(post)
          })
            .then((response) => response.json())
            .then((response) => console.log(response))
    };
}