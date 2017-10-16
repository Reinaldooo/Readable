import sortBy from 'sort-by'

const headers = {
    'Accept': 'application/json',
    'Authorization': 'User',
    'Content-Type': 'application/json'
  }
const api = "http://localhost:3001"

export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function postsFetchDataSuccess(posts) {
    return {
        type: 'POSTS_FETCH_DATA_SUCCESS',
        posts
    };
}

export function postsFetchData() {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch("http://localhost:3001/posts", {
            method: 'GET',
            headers
          })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                //dispatch(itemsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((posts) => dispatch(postsFetchComments(posts.sort(sortBy('-voteScore')))))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function postsFetchComments(posts) {
    return (dispatch) => {
        posts.forEach((p) => 
        fetch(`${api}/posts/${p.id}/comments`, {
            method: 'GET',
            headers
          })
          .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
            })
            .then((response) => response.json())
            .then((response) => p.comments = response)
            .then(() => dispatch(postsFetchDataSuccess(posts.sort(sortBy('-voteScore')))))
            .then(() => dispatch(itemsIsLoading(false))))
    };
}

export function getPosts() {
    return dispatch => {
        dispatch(itemsIsLoading(true));
        
                fetch("http://localhost:3001/posts", {
                    method: 'GET',
                    headers
                  })
                    .then((posts) => {
                        if (!posts.ok) {
                            throw Error(posts.statusText);
                        }
        
                        //dispatch(itemsIsLoading(false));
        
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
            .then((posts) => dispatch(postsFetchDataSuccess(posts.sort(sortBy('-voteScore')))))
            .then(() => dispatch(itemsIsLoading(false)));
    };
}


export function categoryChanger(category) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch("http://localhost:3001/posts", {
                method: 'GET',
                headers
            })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((posts) => dispatch(postsFetchDataSuccess(posts.filter((p) => p.category === category).sort(sortBy('-voteScore')))))
            .catch(() => dispatch(itemsHasErrored(true)));
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

export function rateUp(rate, id, index) {
    return (dispatch) => {

        fetch(`${api}/posts/${id}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(rate)
          })
            .then(() => dispatch(rateUpSuccess(rate, index)))
            .catch(() => dispatch(itemsHasErrored(true)));
            
    };
}
export function rateUpSuccess(rate, index) {
    return {
        type: 'RATEUP',
        index
    };
}

