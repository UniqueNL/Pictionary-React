import api from '../middleware/api'
import appLoading from './loading'
import authenticateUser from './authenticate-user'
// import setFormErrors from './set-form-errors'
// import resetFormErrors from './reset-form-errors'

export default function registerUser(user) {
  return dispatch => {
    dispatch(resetFormErrors())
    // We're loading (communicating with the API asynchronously)
    dispatch(appLoading(true))
    console.log("Loading!")

    // Here's the new user data, create a User with it
    api.service('users').create(user)
      .then((response) => {
        // We're done creating the User, now authenticate
        dispatch(authenticateUser(user))
      }).catch((error) => {
        console.error('Error registering!', error);
        if (error.code === 409) {
          const emailError = {
            email: 'This email address already exists!'
          }
          dispatch(setFormErrors(emailError))
        }
        dispatch(appLoading(false))
        console.log("Loading false!")
      })
  }
}
