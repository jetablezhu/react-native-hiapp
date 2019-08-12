import { handleActions } from 'redux-actions'
import types from '../Types'

export default handleActions({
  [types.INIT_TIMELINE] (state, action) {
    return {
      ...state,
      timeline: action.payload,
    }
  },
  [types.PREPEND_TIMELINE] (state, action) {
    return {
      ...state,
      timeline: [...action.payload, ...state.timeline]
    }
  },
  [types.APPEND_TIMELINE] (state, action) {
    return {
      ...state,
      timeline: [...state.timeline, ...action.payload]
    }
  },
  [types.TIMELINE_ADD_LIKE] (state, action){
    state.timeline.forEach(item=>{
      if(item.id===action.payload){
        item.likeCount++  
      }
    })
    return {
      ...state,
      timeline: [...state.timeline]
    }  
  },
  [types.TIMELINE_SET_CURRENT] (state,action){
    return {
      ...state,
      current:action.payload
    }
  },
  [types.TIMELINE_ADD_COMMENT] (state, action){
    state.current.commentCount++
    return {
      ...state,
      timeline:[...state.timeline],
      current:state.current
    }  
  }
}, {
  timeline: [],
  current:{}
})
