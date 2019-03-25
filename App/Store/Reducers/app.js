import { handleActions } from 'redux-actions'
import types from '../Types'

export default handleActions({
  [types.INIT_USER_INFO] (state, action) {
    return {
      ...state,
      user: action.payload
    }
  }
}, {
  user: {}
})
