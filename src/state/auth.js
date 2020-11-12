import AuthApi from '../api/auth';

export const AUTH_LOGIN = 'auth login';
export const AUTH_REGISTER = 'auth register';
export const AUTH_GET_PROFILE = 'auth get profile'
export const AUTH_UPDATE_PROFILE = 'auth update profile fetching';
export const AUTH_CHECK_TOKEN = 'auth check token';
export const AUTH_LOGOUT = 'auth logout'

export function authLogin(email, password) {
  return (dispatch) => {
    dispatch({ type: 'AUTH_LOGIN' })
    AuthApi.login(email, password)
      .then(user => dispatch({ type: 'AUTH_LOGIN_SUCCESS', payload: user }))
      .catch(e => dispatch({ type: 'AUTH_LOGIN_ERROR', error: e }));
  }
}

export function authRegister(email, password, profile = {}) {
  return (dispatch) => {
    dispatch({
      type: AUTH_REGISTER,
      payload: {
        userRegister: AuthApi.register(email, password, profile)
      }
    });
  }
}

export function updateProfile(profile) {
  return (dispatch, getState) => {
    let auth = getState().auth.authenticated;
    dispatch({
      type: AUTH_UPDATE_PROFILE,
      payload: {
        updateProfile: AuthApi.updateProfile(profile, auth.user.uid)
      }
    });
  }
}

export function getProfile() {
  return (dispatch, getState) => {
    let auth = getState().auth.authenticated;
    if (!auth.profile.updated_at) {
      dispatch({
        type: AUTH_GET_PROFILE,
        payload: {
          getProfile: AuthApi.getProfile(auth.user.uid)
        }
      });
    }
  }
}

export function checkToken() {
  return (dispatch) => {
    dispatch({
      type: AUTH_CHECK_TOKEN,
      payload: {
        userFromToken: AuthApi.isAuthApienticated()
      }
    })
  }
}

export function authLogout() {
  return (dispatch) => {
    dispatch({ type: AUTH_LOGOUT });
    AuthApi.logout();
  }
}

const initialState = {
  authenticated: {
    guest: true,
    user: {
      loading: false,
      data: null,
      error: null
    },
    profile: {
      updated_at: '',
    }
  },
  register: {
    email: '',
    password: ''
  },
  logout: {
    isFetching: false,
  }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN':
      return {
        ...state,

        authenticated: {
          ...state.authenticated,
          guest: false,
          user: {
            loading: true,
            data: null,
            error: null
          }
        },
      }

    case 'AUTH_LOGIN_SUCCESS':
      localStorage.setItem('authenticated', JSON.stringify(action.payload.userLogin));
      return {
        ...state,

        authenticated: {
          ...state.authenticated,
          guest: false,
          user:
          {
            loading: false,
            data: action.payload.userLogin,
            error: null
          }
        },
      }
      
    case 'AUTH_LOGIN_FAILURE':
      return {
        ...state,
        authenticated: {
          ...state.authenticated,
          guest: false,
          user:
          {
            loading: false,
            data: null,
            error: action.error
          }
        },
      }

    case AUTH_REGISTER:
      return { ...state, register: action.payload.userRegister }

    case AUTH_GET_PROFILE:
      return {
        ...state,
        authenticated: {
          ...state.authenticated,
          profile: { ...action.payload.getProfile, updated_at: new Date().getTime() }
        },
      }

    case AUTH_UPDATE_PROFILE:
      return {
        ...state,
        authenticated: {
          ...state.authenticated,
          profile: { ...action.payload.updateProfile, updated_at: new Date().getTime() }
        },
      }

    case AUTH_CHECK_TOKEN:
      return {
        ...state,

        authenticated: {
          ...state.authenticated,
          guest: false,
          user: action.payload.userFromToken
        },
      }

    case AUTH_LOGOUT:
      return initialState

    default:
      return state;
  }
}

export default authReducer