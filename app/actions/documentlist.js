import * as types from '../constants/ActionTypes'
import {constructRetrieveDocumentsUrl} from '../utils/DocumentsUtils'
let React = require('react-native')
let {
  Alert
} = React

export function updateDocumentList(id, name, fId, parentId, parentName) {
  return {
    type: types.UPDATE_DOCUMENTS_LIST,
    id: id,
    name: name,
    fId: fId,
    parentId: parentId,
    parentName: parentName
  }
}
