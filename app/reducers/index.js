import {combineReducers} from 'redux'
import tableNames from '../reducers/tableNames'
import tableName from '../reducers/tableName'

const rootReducer = combineReducers({
  tableNames,
  tableName
})

export default rootReducer
