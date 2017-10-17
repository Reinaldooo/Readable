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

        case 'RATE_UP': {
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

        case 'RATE_DOWN': {
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
          
        
          
//         case 'RATEUP':
//         return {
//             ...state,
//             posts: [...state.posts,
//             [action.index]: ...state.posts[action.index],
//             voteScore: voteScore + 1
//             ]
//         }

//         var projects = [
//             {
//                 value: "jquery",
//                 label: "jQuery",
//                 desc: "the write less, do more, JavaScript library",
//                 icon: "jquery_32x32.png"
//             },
//             {
//                 value: "jquery-ui",
//                 label: "jQuery UI",
//                 desc: "the official user interface library for jQuery",
//                 icon: "jqueryui_32x32.png"
//             },
//             {
//                 value: "sizzlejs",
//                 label: "Sizzle JS",
//                 desc: "a pure-JavaScript CSS selector engine",
//                 icon: "sizzlejs_32x32.png"
//             }
//         ];

// // using higher-order functions to avoiding mutation
// index = projects.findIndex(x => x.value === 'jquery-ui');
// [... projects.slice(0,index), {'x': 'xxxx'}, ...projects.slice(index + 1, projects.length)];

        default:
            return state;
    }
}


export default combineReducers({
    posts,
    itemsHasErrored,
    itemsIsLoading
});
