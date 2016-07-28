import React, { Component } from 'react'
import {View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Image,
  ListView,
  TouchableOpacity,
  ActivityIndicatorIOS,
  Platform,
  ProgressBarAndroid,
  RefreshControl
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import shallowEqual from 'react-pure-render/shallowEqual'

import InteractionManager from 'InteractionManager'
import ProgressBar from 'ProgressBarAndroid'
let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

var dismissKeyboard = require('dismissKeyboard');
var DocumentCell = require('../components/documentCell');

import {Actions} from "react-native-router-flux";
import {fetchTableIfNeeded, refreshTable, changeTable} from '../actions/documentlists'
import {updateDocumentList} from '../actions/documentlist'
import ViewContainer from '../components/ViewContainer';
import KenestoHelper from '../utils/KenestoHelper';
import Button from "react-native-button";
import Folder from '../models/Folder';
import ActionButton from 'react-native-action-button';


class Documents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetchingTail: false
    }

    this.onEndReached = this.onEndReached.bind(this)
    this.selectItem = this.selectItem.bind(this)
    this._onRefresh = this._onRefresh.bind(this)
    this._onGoBack = this._onGoBack.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const shouldUpdate =
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    return shouldUpdate
  }

  componentWillMount() {
    const {dispatch, env, sessionToken, documentlist} = this.props
    dispatch(fetchTableIfNeeded(env, sessionToken, documentlist))
  }

  componentWillReceiveProps(nextProps) {
    const {dispatch, env, sessionToken, documentlist, documentlists} = this.props
    if (documentlist.id !== nextProps.documentlist.id) {
      dispatch(changeTable(env, sessionToken, nextProps.documentlist));
    }
  }

  onEndReached() {
    this.props.dispatch(this.props.scrollFunc())
  }


  selectItem(document) {
    if (document.FamilyCode == 'FOLDER') {
      const {dispatch, env, sessionToken, documentlist} = this.props

      var newId;
      var newName = document.Name;
      var fId = document.Id;
      var parentId = documentlist.id;
      var parentName = documentlist.name;
      var splitChars = '|';
      if (documentlist.id.indexOf(splitChars) >= 0) {
        var dtlStr = documentlist.id.split(splitChars);
        var newId = `${dtlStr[0]}${splitChars}${document.Id}`//i.e all_docuemnts|{folderID}
      }
      else {
        var newId = `${documentlist.id}${splitChars}${document.Id}`
      }

      dispatch(updateDocumentList(newId, newName, fId, parentId, parentName))
    }
    else {
      Actions.documentView({ sessionToken: this.props.sessionToken, viewerUrl: document.ViewerUrl });
    }

  }

  onSearchChange(event) {
    var filter = event.nativeEvent.text.toLowerCase();

    this.clearTimeout(this.timeoutID);
    this.timeoutID = this.setTimeout(() => this.searchDocuments(filter), 100);
  }

  renderSeparator(
    sectionID,
    rowID,
    adjacentRowHighlighted
  ) {
    var style = styles.rowSeparator;
    if (adjacentRowHighlighted) {
      style = [style, styles.rowSeparatorHide];
    }
    return (
      <View key={'SEP_' + sectionID + '_' + rowID}  style={style}/>
    );
  }


  _onGoBack() {
    const {dispatch, env, sessionToken, documentlist, documentlists} = this.props

    var fId = "";
    var id = documentlists[documentlist.id].parentId;
    var name = documentlists[documentlist.id].parentName;
    var parentId = documentlists[id].parentId;
    var parentName = documentlists[id].parentName;
    var splitChars = '|';

    if (id.indexOf(splitChars) >= 0) {
      var dtlStr = id.split(splitChars);
      fId = dtlStr[1];
    }

    dispatch(updateDocumentList(id, name, fId, parentId, parentName))
  }

  _onRefresh(type, message) {
    const {dispatch, env, sessionToken, documentlist} = this.props
    console.log("_onRefresh" + dispatch)
    dispatch(refreshTable(env, sessionToken, documentlist))
  }

  _renderBreadCrums() {
    const {dispatch, env, sessionToken, documentlist, documentlists} = this.props
    var splitChars = '|';
    const isFetching = documentlist.id in documentlists ? documentlists[documentlist.id].isFetching : false;
    const showBreadCrums = documentlist.id in documentlists && documentlists[documentlist.id].parentName != undefined ? true : false;
    if (!isFetching && showBreadCrums) {
      var parentName = documentlists[documentlist.id].parentName;
      return (
        <View>
          <TouchableOpacity style={styles.backButton} onPress={this._onGoBack.bind(this) }>
            <Text style={styles.backLabel}>Go to {parentName} Page</Text>
          </TouchableOpacity>
        </View>)
    }
    else {
      return null;
    }
  }

  _renderTableContent(dataSource, isFetching) {
    if (dataSource.getRowCount() === 0) {
      return (<NoDocuments
        filter={this.state.filter}
        isLoading={isFetching}
        onRefresh={this._onRefresh.bind(this) }
        />)
    }
    else {
      return (
        <ListView
          ref="listview"
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={this._onRefresh.bind(this) }
              />
          }
          renderSeparator={this.renderSeparator}
          dataSource={dataSource}
          renderRow={(document, sectionID, rowID, highlightRowFunc) => {
            return (<DocumentCell
              key={document.Id}
              onSelect={this.selectItem.bind(this, document) }
              //onHighlight={this.highlightRowFunc(sectionID, rowID)}
              //onUnhighlight={this.highlightRowFunc(null, null)}
              document={document}/>
            )
          } }
          onEndReached={this.onEndReached}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={true}
          showsVerticalScrollIndicator={false}
          />
      )
    }
  }


  render() {
    const {dispatch, documentlists, documentlist } = this.props

    const isFetching = documentlist.id in documentlists ? documentlists[documentlist.id].isFetching : false
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    let dataSource = documentlist.id in documentlists ? ds.cloneWithRows(documentlists[documentlist.id].items) : ds.cloneWithRows([])
    var additionalStyle = {};

    return (
      <ViewContainer  ref="masterView" style={[styles.container, additionalStyle]}>
        {this._renderBreadCrums() }
        <View style={styles.separator} />

        { isFetching &&
          <View style={styles.progressbar}>
            <ProgressBar styleAttr='Small' />
          </View>
        }

        {this._renderTableContent(dataSource, isFetching) }
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => this._onRefresh('info', 'wawa ziba and his group') }>
            <Icon name="folder" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Upload" onPress={() => Actions.animated() }>
            <Icon name="folder" style={styles.actionButtonIcon} />
          </ActionButton.Item>

          <ActionButton.Item buttonColor='#1abc9c' title="New Folder" onPress={() => Actions.createFolder({ env: this.state.env, currentFolderId: this.state.folderId, sessionToken: this.props.sessionToken, afterCreateCallback: this._onRefresh, updateLoading: this.updateLoadingState }) }>
            <Icon name="folder" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </ViewContainer>
    )
  }
}



var NoDocuments = React.createClass({
  render: function () {
    var text = '';
    if (this.props.filter) {
      text = `No results for "${this.props.filter}"`;
    } else if (!this.props.isLoading) {
      // If we're looking at the latest documents, aren't currently loading, and
      // still have no results, show a message
      text = 'No documents found';
    }

    return (
      <View style={[styles.container, styles.centerText]}>
        <Text style={styles.noDocumentsText}>{text}</Text>
        <Button onPress={this.props.onRefresh}>refresh</Button>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 40
  },
  centerText: {
    alignItems: 'center',
  },
  noDocumentsText: {
    marginTop: 80,
    color: '#888888',
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  scrollSpinner: {
    marginVertical: 20,
  },
  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginLeft: 4,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
  backButton: {
    marginTop:15,
    padding: 15,
    backgroundColor: '#3C5773',
    alignSelf: 'stretch'
  },
  backLabel: {
    color: '#F4F4E9',
    textAlign: 'center'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default Documents
