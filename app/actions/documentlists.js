import * as types from '../constants/ActionTypes'
import {constructRetrieveDocumentsUrl} from '../utils/DocumentsUtils'
let React = require('react-native')
let {
Alert
} = React

function fetchDocuments(url, documentlist ,actionType) {
  return (dispatch, getState) => {
    dispatch(requestDocuments(documentlist))
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        const nextUrl = json.ResponseData.next_href

        switch(actionType) {
          
              case types.RECEIVE_DOCUMENTS:
                dispatch(receiveDocuments(json.ResponseData.DocumentsList, nextUrl, documentlist))
                break
              case types.INITIALIZE_DOCUMENTS:
                  dispatch(initializeDocuments(json.ResponseData.DocumentsList, nextUrl, documentlist))
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

export function fetchDocumentsIfNeeded(env, sessionToken, documentlist) {
  return (dispatch, getState) => {
    const {documentlists} = getState()
    if (shouldFetchDocuments(documentlists, documentlist)) {
      const nextUrl = getNextUrl(env, sessionToken ,documentlists, documentlist)
      return dispatch(fetchDocuments(nextUrl, documentlist, types.RECEIVE_DOCUMENTS))
    }
  }
}


export function refreshDocuments(env, sessionToken, documentlist) {
    return (dispatch, getState) => {
      const url = constructRetrieveDocumentsUrl(env, sessionToken, fId)
      return dispatch(fetchDocuments(url, documentlist, types.INITIALIZE_DOCUMENTS))
  }
}

function getNextUrl(env, sessionToken, documentlists, documentlist) {
  
  const activePlaylist = documentlists[documentlist.name]
  if (!activePlaylist || activePlaylist.nextUrl === false) {
    return constructRetrieveDocumentsUrl(env, sessionToken, documentlist.fId)
  }
  console.log(activePlaylist.nextUrl)
  return activePlaylist.nextUrl
}

function receiveDocuments(documents, nextUrl, documentlist) {
        
  return {
    type: types.RECEIVE_DOCUMENTS,
    nextUrl,
    name: documentlist.name,
    documents
  }
}

function initializeDocuments(documents, nextUrl, documentlist) {
       
  return {
    type: types.INITIALIZE_DOCUMENTS,
    nextUrl,
     name: documentlist.name,
    documents
  }
}

function requestDocuments(documentlist) {
   console.log(JSON.stringify(documentlist))
  return {
    type: types.REQUEST_DOCUMENTS,
    name: documentlist.name
  }
}

function shouldFetchDocuments(documentlists, documentlist) {
  const activePlaylist = documentlists[documentlist.name]
  if (!activePlaylist || !activePlaylist.isFetching && (activePlaylist.nextUrl !== null) && (activePlaylist.nextUrl !== "")) {
    return true
  }

  return false
}

