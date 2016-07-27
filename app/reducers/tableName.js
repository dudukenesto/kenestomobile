import * as types from '../constants/ActionTypes'

export default function tableName(state = {
  name: "all_documents",
  fId: "",
  parentfId: ""
}, action) {
  switch(action.type) {
  case types.CHANGE_TABLE_NAME:
   return  action;
  default:
    return state
  }
}
