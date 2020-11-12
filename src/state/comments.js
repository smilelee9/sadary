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

// thunks
export const createPost = (post) =>
  (dispatch, getState) => {
    dispatch({ type: 'POST_CREATE' });
    PostApi.createPost(post, getState().auth.authenticated.user.uid)
      .then(post => dispatch({ type: 'POST_CREATE_SUCCESS', payload: post }))
      .catch(e => dispatch({ type: 'POST_CREATE_ERROR', error: e }));
  }

export const updatePost = (post, post_id) =>
  (dispatch) => {
    dispatch({ type: 'POST_UPDATE' });
    PostApi.updatePost(post, post_id)
      .then(post => dispatch({ type: 'POST_UPDATE_SUCCESS', payload: post }))
      .catch(e => dispatch({ type: 'POST_UPDATE_ERROR', error: e }));
  }

export const deletePost = (id) =>
  (dispatch) => {
    dispatch({ type: 'POST_DELETE' });
    PostApi.deletePost(id)
      .then(res => dispatch({ type: 'POST_DELETE_SUCCESS', payload: res }))
      .catch(e => dispatch({ type: 'POST_DELETE_ERROR', error: e }));
  }


export const getPostsList = () =>
  (dispatch) => {
    dispatch({ type: 'POST_LISTS' });
    PostApi.getPostsList()
      .then(posts => dispatch({ type: 'POST_LISTS_SUCCESS', payload: posts }))
      .catch(e => dispatch({ type: 'POST_LISTS_ERROR', error: e }));
  }


export const loadMorePosts = (loadMore = postsList.perPage) =>
  (dispatch) => {
    dispatch({
      type: POST_LISTS_LOAD_MORE,
      loadMore: loadMore
    })
  }

export function resetCurrentPost() {
  return (dispatch) => {
    dispatch({
      type: POST_RESET
    })
  }
}

export const goToHome = () => (dispatch, getState, { history }) => {
  history.push('/');
};

const initialState = {
  lists: {
    loading: false,
    data: null,
    error: null
  },
  currentItems: postsList.perPage, //pagination
  currentPost: {
    loading: false,
    data: null,
    error: null
  }
}

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_LISTS':
      return {
        ...state,
        lists: {
          loading: true,
          data: null,
          error: null
        }
      };

    case 'POST_CREATE':
    case 'POST_UPDATE':
      return {
        ...state,
        currentPost: {
          loading: true,
          data: null,
          error: null
        }
      }

    case 'POST_CREATE_SUCCESS':
    case 'POST_UPDATE_SUCCESS':
      return {
        ...state,
        currentPost: {
          loading: false,
          data: action.payload,
          error: null,
        }
      }
    case 'POST_LISTS_SUCCESS':
      return {
        ...state,
        lists: {
          loading: false,
          data: action.payload,
          error: null,
        }
      };

    case 'POST_CREATE_FAILURE':
    case 'POST_UPDATE_FAILURE':
      return {
        ...state,
        currentPost: {
          loading: false,
          data: null,
          error: action.error,
        }
      }

    case 'POST_LISTS_FAILURE':
      return {
        ...state,
        lists: {
          loading: false,
          data: null,
          error: action.error,
        }
      }

    case 'POST_DELETE_SUCCESS':
    case 'POST_RESET':
      return {
        ...state,
        currentPost: {
          loading: false,
          data: null,
          error: null
        }
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
