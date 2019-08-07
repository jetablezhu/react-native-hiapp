import { handleActions } from 'redux-actions'
import types from '../Types'

export default handleActions({
	[types.INIT_COMMENT] (state, action){
	    return {
	      ...state,
	      comment:action.payload
	    }
	},
	[types.APPEND_COMMENT] (state, action){
	    return {
	      ...state,
	      comment:[...state.comment, ...action.payload]
	    }
	}
},{
	comment:[]
})