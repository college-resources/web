import { status } from './authSlice'

export function handleAuthResponse(slice, dispatch, res) {
  if (res.ok) {
    res.json().then((user) => {
      dispatch(slice.actions.updateUser(user))
      dispatch(slice.actions.updateStatus(status.AUTHENTICATED))
    })
  }

  if (!res.ok) {
    res.json().then((error) => {
      const newStatus =
        error.statusCode === 401 ? status.UNAUTHENTICATED : status.FAILURE
      dispatch(slice.actions.updateStatus(newStatus))
      dispatch(slice.actions.updateError(error))
    })
  }

  return res.ok
}

export function handleAuthError(slice, dispatch, error) {
  dispatch(slice.actions.updateStatus(status.FAILURE))
  dispatch(slice.actions.updateError({ message: error }))
}
