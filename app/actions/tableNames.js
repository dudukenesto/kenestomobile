import * as types from '../constants/ActionTypes'
import {constructRetrieveDocumentsUrl} from '../utils/DocumentsUtils'
let React = require('react-native')
let {
Alert
} = React

function fetchDocuments(url, tableName,actionType) {
  return (dispatch, getState) => {
    dispatch(requestDocuments(tableName))
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        const nextUrl = json.ResponseData.next_href

        switch(actionType) {
          
              case types.RECEIVE_DOCUMENTS:
                dispatch(receiveDocuments(json.ResponseData.DocumentsList, nextUrl, tableName))
                break
              case types.INITIALIZE_DOCUMENTS:
                  dispatch(initializeDocuments(json.ResponseData.DocumentsList, nextUrl, tableName))
                  break
            }   
      })
       .catch((error) => {
                        //Actions.error({data: 'get documents faliled failed'})
                        Alert('Failed to get documents')
                    })
                    .then( (responseData) => {

                      //  if (responseData.ResponseStatus == 'FAILED')
                      //  {
                      //    Alert('Action failed')
                      //  }
                    })
  }
}

export function fetchDocumentsIfNeeded(env, sessionToken, fId, tableName) {
  return (dispatch, getState) => {
    const {tableNames} = getState()
    if (shouldFetchDocuments(tableNames, tableName)) {
      const nextUrl = getNextUrl(env, sessionToken, fId ,tableNames, tableName)
      return dispatch(fetchDocuments(nextUrl, tableName,types.RECEIVE_DOCUMENTS))
    }
  }
}

export function refreshDocuments(env, sessionToken, fId, tableName) {
    return (dispatch, getState) => {
      const url = constructRetrieveDocumentsUrl(env, sessionToken, fId)
      return dispatch(fetchDocuments(url, tableName, types.INITIALIZE_DOCUMENTS))
  }
}

function getNextUrl(env, sessionToken, fId, tableNames, tableName) {
  
  const activePlaylist = tableNames[tableName]
  if (!activePlaylist || activePlaylist.nextUrl === false) {
    return constructRetrieveDocumentsUrl(env, sessionToken, fId)
  }
  console.log(activePlaylist.nextUrl)
  return activePlaylist.nextUrl
}

function receiveDocuments(documents, nextUrl, tableName) {
        
  return {
    type: types.RECEIVE_DOCUMENTS,
    nextUrl,
    tableName,
    documents
  }
}

function initializeDocuments(documents, nextUrl, tableName) {
       
  return {
    type: types.INITIALIZE_DOCUMENTS,
    nextUrl,
    tableName,
    documents
  }
}

function requestDocuments(tableName) {
  return {
    type: types.REQUEST_DOCUMENTS,
    tableName: tableName
  }
}

function shouldFetchDocuments(tableNames, tableName) {
  const activePlaylist = tableNames[tableName]
  if (!activePlaylist || !activePlaylist.isFetching && (activePlaylist.nextUrl !== null) && (activePlaylist.nextUrl !== "")) {
    return true
  }

  return false
}

export function changePlaylist(tableName) {
  return {
    type: types.CHANGE_PLAYLIST,
    tableName: tableName
  }
}
