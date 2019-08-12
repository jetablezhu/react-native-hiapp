import req from '@Network'
import types from '../Types'
import { createAction } from 'redux-actions'
import { convertJsonObj } from '@Utils'

export const initTimeline = createAction(types.INIT_TIMELINE)
export const appendTimeline = createAction(types.APPEND_TIMELINE)
export const prependTimeline = createAction(types.PREPEND_TIMELINE)
export const timeLineAddLike=createAction(types.TIMELINE_ADD_LIKE)
export const timeLineSetCurrent=createAction(types.TIMELINE_SET_CURRENT)

export function fetchTimeLine() {
  return (dispatch) => {
    return req.get('/timeline/all').then(res => {
    	const data=res.data
    	convertJsonObj(data)
      dispatch(initTimeline(data))
    })
  }
}

export function addTimeLine(data){
	return (dispatch)=>{
    return req.post('/timeline/add',{data:data}).then(res=>{
      const data=res.data
      convertJsonObj(data)
  		dispatch(prependTimeline([data]))
    })
	}
}

export function addLike(topicId){
  return (dispatch)=>{
    return req.post('/timeline/'+topicId+"/like").then(res=>{
      dispatch(timeLineAddLike(topicId))
    })
  }
}

export function setCurrentTimeline(timeline){
  return (dispatch)=>{
    dispatch(timeLineSetCurrent(timeline))
  }
}
