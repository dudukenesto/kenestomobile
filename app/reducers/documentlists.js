import * as types from '../constants/ActionTypes'

let React = require('react-native')
function documentlist(state = {
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

export default function documentlists(state = {}, action) {
  switch(action.type) {
  case types.RECEIVE_DOCUMENTS:
    return Object.assign({}, state, {
      [action.id]: documentlist(state[action.id], action)
    })

  case types.REQUEST_DOCUMENTS:
  console.log("REQUEST_DOCUMENTS"+JSON.stringify(action))
    return Object.assign({}, state, {
      [action.id]: documentlist(state[action.id], action)
    })
  
  case types.INITIALIZE_DOCUMENTS:
    return Object.assign({}, state, {
      [action.id]: documentlist(state[action.id], action),
    })
  
  default:
    return state
  }
}
