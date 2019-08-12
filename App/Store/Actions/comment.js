import req from '@Network'
import types from '../Types'
import { createAction } from 'redux-actions'
import { convertJsonObj } from '@Utils'

export const initComment = createAction(types.INIT_COMMENT)
export const appendComment = createAction(types.APPEND_COMMENT)
export const timeLineAddComment=createAction(types.TIMELINE_ADD_COMMENT)

export function fetchComment(topicId) {
  return (dispatch) => {
    return req.get('/comment/all/'+topicId).then(res => {
      const data = res.data
      convertJsonObj(data)
      dispatch(initComment(data))
    })
  }
}

export function addComment(data){
	return (dispatch)=>{
		return req.post("/comment/add",{data:data}).then(res=>{
			const data=res.data
			convertJsonObj(data)
			dispatch(appendComment([data]))
			dispatch(timeLineAddComment(data.timelineId))
		})
	}
}