import req from '@Network'
import types from '../Types'
import { createAction } from 'redux-actions'
import { convertJsonObj } from '@Utils'
import storage from '@Utils/storage'

export const initUserInfo = createAction(types.INIT_USER_INFO)
export const setModalVisibleStatus = createAction(types.SET_MODAL_VISIBLE_STATUS)

export function fetchUserInfo() {
  return (dispatch) => {
		storage.get('login_user').then(user=>{
			if(user){
				dispatch(initUserInfo(user))
			}else{
				req.get('/user/1').then(res => {
		    	const data=res.data
		    	convertJsonObj(data)
		      dispatch(initUserInfo(data))
		      storage.save('login_user',data)
	    	})
			}
		})
  }
}
