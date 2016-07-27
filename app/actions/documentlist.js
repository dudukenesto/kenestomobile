import * as types from '../constants/ActionTypes'
import {constructRetrieveDocumentsUrl} from '../utils/DocumentsUtils'
let React = require('react-native')
let {
Alert
} = React

export function changeTable(name , fId, parentfId) {
  return {
    type: types.CHANGE_TABLE_NAME,
    name: name,
    fId:fId,
    parentfId:parentfId
  }
}
