import PostApi from '../api/posts';
import { postsList } from '../common/config';

export const POST_CREATE = 'post create';
export const POST_UPDATE = 'post update';
export const POST_LISTS = 'posts lists';
export const POST_LISTS_LOAD_MORE = 'post load more';
export const POST_VIEW = 'post view';
export const POST_EDIT = 'post edit';
export const POST_DELETE = 'post delete';
export const POST_RESET = 'post reset';

export function createPost(post) {
  return (dispatch, getState) => {
    dispatch({
      type: POST_CREATE,
      payload: {
        createPost: PostApi.createPost(post, getState().auth.authenticated.user.uid)
      }
    });
  }
}

export function updatePost(post, post_id) {
  return (dispatch) => {
    dispatch({
      type: POST_UPDATE,
      payload: {
        updatePost: PostApi.updatePost(post, post_id)
      }
    })
  }
}

export function getPostsList() {
  return (dispatch) => {
    dispatch({
      type: POST_LISTS,
      payload: {
        getPosts: PostApi.getPostsList()
      }
    });
  }
}

export function getPostView(id) {
  return (dispatch) => {
    dispatch({
      type: POST_VIEW,
      payload: {
        getPost: PostApi.getPost(id)
      }
    })
  }
}

export function deletePost(id) {
  return (dispatch) => {
    dispatch({
      type: POST_DELETE,
      payload: {
        deletePost: PostApi.deletePost(id)
      }
    })
  }
}

export function loadMorePosts(loadMore = postsList.perPage) {
  return (dispatch) => {
    dispatch({
      type: POST_LISTS_LOAD_MORE,
      loadMore: loadMore
    })
  }
}

export function resetCurrentPost() {
  return (dispatch) => {
    dispatch({
      type: POST_RESET
    })
  }
}

const initialState = {
  lists: [],
  currentItems: postsList.perPage, //pagination
  currentPost: {
    user: {}
  }
}

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LISTS:
      return {
        ...state,
        lists: action.payload.getPosts
      };
    case POST_CREATE:
      return {
        ...state,
        currentPost: action.payload.createPost
      }
    case POST_VIEW:
      return {
        ...state,
        currentPost: action.payload.getPost
      }

    case POST_RESET:
      return {
        ...state,
        currentPost: { user: {} }
      }

    case POST_LISTS_LOAD_MORE:
      var getCurrentItems = () => {
        let num = state.currentItems + action.loadMore
        if (num < state.lists.length) return num
        else return state.lists.length
      }

      return {
        ...state, currentItems: getCurrentItems()
      }

    default:
      return state;
  }
}

export default postsReducer
