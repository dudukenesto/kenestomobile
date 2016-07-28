import * as types from '../constants/ActionTypes'

export default function documentlist(state = {
  name: "All Documents",
  id: "all_documents",
  fId: "",
  parentId: "",
  parentName: ""
}, action) {
  switch (action.type) {
    case types.UPDATE_DOCUMENTS_LIST:
      return action;
    default:
      return state
  }
}
