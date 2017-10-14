import sortBy from 'sort-by'

const headers = {
    'Accept': 'application/json',
    'Authorization': 'User',
    'Content-Type': 'application/json'
  }

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

export function postsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch(url, {
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
            .then((posts) => dispatch(postsFetchDataSuccess(posts.sort(sortBy('-voteScore')))))
            .catch(() => dispatch(itemsHasErrored(true)));
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
