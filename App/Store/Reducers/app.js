import { handleActions } from 'redux-actions'
import types from '../Types'

export default handleActions({
  [types.INIT_USER_INFO] (state, action) {
    return {
      ...state,
      user: action.payload
    }
  },
  [types.SET_MODAL_VISIBLE_STATUS] (state, action) {
    const { name, status, type } = action.payload
    const { modalVisible } = state
    modalVisible[name] = status
    modalVisible.type=type
    return {
      ...state,
      modalVisible: {
        ...modalVisible
      }
    }
  }
}, {
  user: {},
  modalVisible: {
    publisher: false,
    type:1, // 1：timeline  2：comment
  }
})
