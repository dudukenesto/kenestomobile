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
import {fetchDocumentsIfNeeded,refreshDocuments} from '../actions/tableNames'
import ViewContainer from '../components/ViewContainer';
import KenestoHelper from '../utils/KenestoHelper';
import Button from "react-native-button";
import Folder from '../models/Folder';
import ActionButton from 'react-native-action-button';


class Documents extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isFetchingTail: false
    }

    this.onEndReached = this.onEndReached.bind(this)
    this.selectDocument = this.selectDocument.bind(this)
     this._onRefresh = this._onRefresh.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const shouldUpdate =
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    return shouldUpdate
  }

  componentWillMount() {
    const {dispatch, env, sessionToken, fId, tableName} = this.props
    dispatch(fetchDocumentsIfNeeded(env, sessionToken, fId, tableName))
  }

   componentWillReceiveProps(nextProps) {
    const {dispatch, env, sessionToken, fId, tableName} = this.props
    if (tableName !== nextProps.tableName) {
      if (!(nextProps.tableName in tableNames) || tableNames[nextProps.tableName].items.length === 0) {
       dispatch(fetchDocumentsIfNeeded(env, sessionToken, fId, tableName))
      }
    }
  }

  onEndReached() {
    this.props.dispatch(this.props.scrollFunc())
  }


  selectDocument(document) {
    if (document.FamilyCode == 'FOLDER')
    {
      var folderT = new Object(); 
      folderT.Id = document.Id;
      folderT.Name = document.Name;
      this.state.foldersTrail.push(folderT);
      this.setState({ folderId : document.Id});
    }
    else
    {
      Actions.documentView({sessionToken: this.props.sessionToken, viewerUrl: document.ViewerUrl});
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


  GoBack(){
     this.state.foldersTrail.pop();  
     var fid = this.state.foldersTrail.length > 0 ? this.state.foldersTrail[this.state.foldersTrail.length-1].Id: null;
     this.setState({folderId: fid });
     this.searchDocuments('')
  }
  
  _onRefresh(type, message){
    const {dispatch, env, sessionToken, fId, tableName} = this.props
   console.log("_onRefresh"+dispatch)
   dispatch(refreshDocuments(env, sessionToken, fId, tableName))
  }


_renderTableContent(dataSource, isFetching){
       if ( dataSource.getRowCount() === 0 ) {
            return( <NoDocuments
                      filter={this.state.filter}
                      isLoading={isFetching}
                      onRefresh={this._onRefresh.bind(this)}
                    /> )
        }
        else
        {
          return(
                <ListView
                    ref="listview"
                    refreshControl={
                    <RefreshControl
                      refreshing={isFetching}
                      onRefresh={this._onRefresh.bind(this)}
                    />
                  }
                  renderSeparator={this.renderSeparator}
                  dataSource={dataSource}
                  renderRow={(document,sectionID,rowID, highlightRowFunc) => {
                              return (<DocumentCell
                                        key={document.Id}
                                        onSelect={this.selectDocument.bind(this, document)}
                                        //onHighlight={this.highlightRowFunc(sectionID, rowID)}
                                        //onUnhighlight={this.highlightRowFunc(null, null)}
                                        document={document}/>
                                                      )}}
                  onEndReached={this.onEndReached}
                  automaticallyAdjustContentInsets={false}
                  keyboardDismissMode="on-drag"
                  keyboardShouldPersistTaps={true}
                  showsVerticalScrollIndicator={false}
                />
           )
          }
    }


  render () {
    const {dispatch, tableName, tableNames} = this.props
   
    const isFetching =tableName in tableNames ? tableNames[tableName].isFetching : false
console.log("render:"+isFetching)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    let dataSource = tableName in tableNames ? ds.cloneWithRows(tableNames[tableName].items) : ds.cloneWithRows([])

    var breadCrums = this.state.folderId != null ?    <View style={{flexDirection:"row"}}>
    <Button onPress={ (()=> this.GoBack())} style={styles.backButton}>     ...  </Button>
          <Text style={styles.backButton}>  {this.state.folderName}</Text>
     </View> : null;

    var additionalStyle = { };
    
    return (
      <ViewContainer  ref="masterView" style={[styles.container, additionalStyle]}>
        <View style={styles.separator} />

        { isFetching &&
          <View style={styles.progressbar}>
            <ProgressBar styleAttr='Small' />
          </View>
        }

        {this._renderTableContent(dataSource, isFetching)}
         <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => this._onRefresh('info', 'wawa ziba and his group')}>
            <Icon name="folder" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Upload" onPress={() => Actions.animated()}>
            <Icon name="folder" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          
          <ActionButton.Item buttonColor='#1abc9c' title="New Folder" onPress={() => Actions.createFolder({env: this.state.env, currentFolderId: this.state.folderId, sessionToken: this.props.sessionToken, afterCreateCallback: this._onRefresh, updateLoading: this.updateLoadingState })}>
            <Icon name="folder" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        
      </ViewContainer>
    )
  }
}



var NoDocuments = React.createClass({
  render: function() {
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
    color: "#0a3a60",
    fontWeight:"normal",
    fontSize:20
  },
   actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default Documents
