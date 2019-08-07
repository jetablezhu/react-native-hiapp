import { combineReducers } from 'redux'
import app from './app'
import home from './home'
import contacts from './contacts'
import comment from './comment'

export default combineReducers({
  app,
  home,
  contacts,
  comment
})
