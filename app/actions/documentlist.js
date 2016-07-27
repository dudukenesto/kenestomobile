import * as types from '../constants/ActionTypes'
import {constructRetrieveDocumentsUrl} from '../utils/DocumentsUtils'
let React = require('react-native')
let {
Alert
} = React

export function changeTable(id, name, fId, parentId,   parentName) {
  return {
    type: types.CHANGE_TABLE_NAME,
    id:id,
    name: name,
    fId:fId,
    parentId:parentId,
    parentName:  parentName
  }
}
