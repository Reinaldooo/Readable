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

export function postsIsLoading(bool) {
    return {
        type: 'POSTS_IS_LOADING',
        isLoading: bool
    };
}

export function categoriesHasErrored(bool) {
    return {
        type: 'CATEGORIES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function categoriesIsLoading(bool) {
    return {
        type: 'CATEGORIES_IS_LOADING',
        isLoading: bool
    };
}

export function getPosts() {
    return dispatch => {
        dispatch(postsIsLoading(true));
        
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
                            .then(comments => post.comments = comments.sort(sortBy('-voteScore')))
                            .then(() => post)
                    )
                )
            )
            //.then(posts => dispatch({ type: 'POSTS_FETCH_DATA_SUCCESS', posts }))
            .then((posts) => dispatch({ type: 'POSTS_FETCH_SUCCESS', posts: posts.sort(sortBy('-voteScore')) }))
            .then(() => dispatch(postsIsLoading(false)));
    };
}


export function getCategories() {
    return (dispatch) => {
        dispatch(categoriesIsLoading(true));

        fetch("http://localhost:3001/categories", {
                method: 'GET',
                headers
            })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(categoriesIsLoading(false));
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

export function ratePost(rate, post, index) {
    return (dispatch) => {
        fetch(`${api}/posts/${post.id}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(rate)
          })
            .then((response) => response.json())
            .then((post) => dispatch({ type: 'RATE', newScore: post.voteScore, index }))
            .catch(() => dispatch(postsHasErrored(true)));
    };
}

