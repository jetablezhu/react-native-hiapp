import req from '@Network'
import types from '../Types'
import { createAction } from 'redux-actions'

export const initTimeline = createAction(types.INIT_TIMELINE)
export const appendTimeline = createAction(types.APPEND_TIMELINE)
export const prependTimeline = createAction(types.PREPEND_TIMELINE)

export function fetchTimeLine() {
  return (dispatch) => {
    return req.get('timeline.json').then(res => {
      const data = res.data
      dispatch(initTimeline(data))
    })
  }
}

export function addTimeLine(data){
	return (dispatch)=>{
		dispatch(prependTimeline(data))
	}
}
