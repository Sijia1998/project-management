import { combineReducers } from 'redux'
import { reducer as loginReducer } from '@/component/Login/store'
import { reducer as businessReducer } from './businessStore'
import { reducer as customReducer } from './customStore'

export default combineReducers({
  login: loginReducer,
  bussiness: businessReducer,
  custom: customReducer
})

