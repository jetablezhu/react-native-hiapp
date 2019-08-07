import req from '@Network'
import types from '../Types'
import { createAction } from 'redux-actions'

export const initComment = createAction(types.INIT_COMMENT)
export const appendComment = createAction(types.APPEND_COMMENT)

export function fetchComment() {
  return (dispatch) => {
    return req.get('comments.json').then(res => {
      const data = res.data
      dispatch(initComment(data))
    })
  }
}