import * as types from '../constants/ActionTypes'

export default function tableName(state = 'all_documents', action) {
  switch(action.type) {
  case types.CHANGE_PLAYLIST:
    return action.tableName

  default:
    return state
  }
}
