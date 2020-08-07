export function handleAuthResponse (slice, dispatch, res) {
  if (res.ok) {
    res.json().then((user) => {
      dispatch(slice.actions.updateStatus(status.AUTHENTICATED))
      dispatch(slice.actions.updateUser(user))
    })
  }

  if (!res.ok) {
    res.text().then((resText) => {
      dispatch(slice.actions.updateStatus(status.FAILURE))
      dispatch(slice.actions.updateError({
        message: resText,
        statusCode: res.statusCode
      }))
    })
  }

  return res.ok
}

export function handleAuthError (slice, dispatch, error) {
  dispatch(slice.actions.updateStatus(status.FAILURE))
  dispatch(slice.actions.updateError({ message: error }))
}
