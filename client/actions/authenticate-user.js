import api from '../middleware/api'
import appLoading from './loading'
// import userAuthenticated from './user-authenticated'
// import setFormErrors from './set-form-errors'
// import resetFormErrors from './reset-form-errors'
// import userSignedOut from './user-signed-out'

export default function authenticateUser(user) {
  return dispatch => {
    dispatch(resetFormErrors())
    // We're loading (communicating with the API asynchronously)
    dispatch(appLoading(true))
    console.log("Loading!")

    // Here's the new user data, create a User with it
    api.authenticate(user).then((response) => {
      // response.data has the currentUser...
      dispatch(userAuthenticated(response.data))
      dispatch(appLoading(false))
      console.log("Loading done!")

    }).catch((error) => {
      console.error('Error authenticating!', error);
      dispatch(setFormErrors({ email: error.message }))
      dispatch(userSignedOut())
      dispatch(appLoading(false))
      console.log("Loading done!")
    })
  }
}
