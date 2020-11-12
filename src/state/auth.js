import Auth from '../api/auth';

export const AUTH_LOGIN = 'auth login';
export const AUTH_REGISTER = 'auth register';
export const AUTH_GET_PROFILE = 'auth get profile'
export const AUTH_UPDATE_PROFILE = 'auth update profile fetching';
export const AUTH_CHECK_TOKEN = 'auth check token';
export const AUTH_LOGOUT = 'auth logout'

export function authLogin(email, password) {
  return (dispatch) => {
    dispatch({
      type: AUTH_LOGIN,
      payload: {
        userLogin: Auth.login(email, password)
      }
    });
  }
}

export function authRegister(email, password, profile = {}) {
  return (dispatch) => {
    dispatch({
      type: AUTH_REGISTER,
      payload: {
        userRegister: Auth.register(email, password, profile)
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
        updateProfile: Auth.updateProfile(profile, auth.user.uid)
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
          getProfile: Auth.getProfile(auth.user.uid)
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
        userFromToken: Auth.isAuthenticated()
      }
    })
  }
}

export function authLogout() {
  return (dispatch) => {
    dispatch({ type: AUTH_LOGOUT });
    Auth.logout();
  }
}

const initialState = {
  authenticated: {
    guest: true,
    user: {},
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
    case AUTH_LOGIN:
      localStorage.setItem('authenticated', JSON.stringify(action.payload.userLogin));
      return {
        ...state,

        authenticated: {
          ...state.authenticated,
          guest: false,
          user: action.payload.userLogin
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