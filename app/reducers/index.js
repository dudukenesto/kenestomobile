import {combineReducers} from 'redux'
import documentlists from '../reducers/documentlists'
import documentlist from '../reducers/documentlist'

const rootReducer = combineReducers({
  documentlists,
  documentlist
})

export default rootReducer
