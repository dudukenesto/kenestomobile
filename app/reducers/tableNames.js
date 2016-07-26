import * as types from '../constants/ActionTypes'

let React = require('react-native')
function tableName(state = {
  isFetching: false,
  items: [],
  nextUrl: false
}, action) {
  switch(action.type) {
  case types.RECEIVE_DOCUMENTS:
    return Object.assign({}, state, {
      isFetching: false,
      items: [...state.items,...action.documents],
      nextUrl: action.nextUrl
    })

  case types.REQUEST_DOCUMENTS:
    return Object.assign({}, state, {
      isFetching: true,
      nextUrl: null
    })
  
    case types.INITIALIZE_DOCUMENTS:
    return Object.assign({}, state, {
      isFetching: false,
      items: [...action.documents],
      nextUrl: action.nextUrl
    })

  default:
    return state
  }
}

export default function tableNames(state = {}, action) {
  switch(action.type) {
  case types.RECEIVE_DOCUMENTS:
    return Object.assign({}, state, {
      [action.tableName]: tableName(state[action.tableName], action)
    })

  case types.REQUEST_DOCUMENTS:
    return Object.assign({}, state, {
      [action.tableName]: tableName(state[action.tableName], action)
    })
  
  case types.INITIALIZE_DOCUMENTS:
    return Object.assign({}, state, {
      [action.tableName]: tableName(state[action.tableName], action)
    })


  default:
    return state
  }
}
