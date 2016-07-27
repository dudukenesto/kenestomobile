import * as types from '../constants/ActionTypes'

export default function documentlist(state = {
  name: "All Documents",
  id:"all_documents",
  fId: "",
  parentId: "",
  parentName: ""
}, action) {
  switch(action.type) {
  case types.CHANGE_TABLE_NAME:
   return  action;
  default:
    return state
  }
}
