import { handleAuthError, handleAuthResponse } from './helpers'
import Router from 'next/router'
import { createSlice } from '@reduxjs/toolkit'

export const status = {
  AUTHENTICATED: 'AUTHENTICATED',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  FAILURE: 'FAILURE'
}

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
    status: status.LOGIN_SUCCESS
  },
  reducers: {
    updateUser: (state, action) => ({
      ...state,
      user: action.payload
    }),
    updateError: (state, action) => ({
      ...state,
      error: action.payload
    }),
    updateStatus: (state, action) => ({
      ...state,
      status: action.payload
    })
  }
})

export default slice.reducer

export function setUser (user) {
  return (dispatch) => {
    if (user) {
      dispatch(slice.actions.updateUser(user))
      dispatch(slice.actions.updateStatus(status.AUTHENTICATED))
    }

    if (!user) {
      dispatch(slice.actions.updateStatus(status.UNAUTHENTICATED))
      dispatch(slice.actions.updateUser(null))
    }
  }
}

export function session () {
  return (dispatch) => {
    fetch('/session/profile')
      .then((res) => handleAuthResponse(
        slice,
        dispatch,
        res
      ))
      .catch((error) => handleAuthError(
        slice,
        dispatch,
        error
      ))
  }
}

export function login (email, password) {
  return (dispatch, getState) => {
    const stateBefore = getState()
    if (stateBefore.status === status.AUTHENTICATED) {
      /* eslint-disable-next-line no-console */
      console.log(status.AUTHENTICATED)
      return
    }

    fetch(
      '/auth/login',
      {
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )
      .then((res) => handleAuthResponse(
        slice,
        dispatch,
        res
      ))
      .then((ok) => ok && Router.push('/'))
      .catch((error) => handleAuthError(
        slice,
        dispatch,
        error
      ))
  }
}

export function register (email, givenName, familyName, password) {
  return (dispatch, getState) => {
    const stateBefore = getState()
    if (stateBefore.status === status.AUTHENTICATED) {
      /* eslint-disable-next-line no-console */
      console.log(status.AUTHENTICATED)
      return
    }

    fetch(
      '/auth/register',
      {
        body: JSON.stringify({
          email,
          family_name: familyName,
          given_name: givenName,
          password
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )
      .then((res) => handleAuthResponse(
        slice,
        dispatch,
        res
      ))
      .then((ok) => ok && Router.push('/'))
      .catch((error) => handleAuthError(
        slice,
        dispatch,
        error
      ))
  }
}

export function logout () {
  return (dispatch, getState) => {
    dispatch(slice.actions.updateStatus(status.UNAUTHENTICATED))
    dispatch(slice.actions.updateUser(null))
    Router.push('/auth/logout')
  }
}

export function selectUser (state) {
  return state.auth.user
}

export function selectError (state) {
  return state.auth.error
}

export function selectStatus (state) {
  return state.auth.status
}
