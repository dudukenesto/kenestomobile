/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ActivityIndicatorIOS,
  ListView,
  Platform,
  ProgressBarAndroid,
  StyleSheet,
  Text,
  View,
  RefreshControl
} = ReactNative;
var TimerMixin = require('react-timer-mixin');

var invariant = require('fbjs/lib/invariant');
var dismissKeyboard = require('dismissKeyboard');


var DocumentCell = require('../components/documentCell'); 
import BreadCrumbs from '../components/BreadCrumbs';
import SampleDocuments from '../utils/GetSampleDocuments';
import config from '../utils/app.config';
var SearchBar = require('SearchBar');
import {Actions} from "react-native-router-flux";
import Button from "react-native-button";
import Folder from '../models/Folder';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import ViewContainer from '../components/ViewContainer';
import KenestoHelper from '../utils/KenestoHelper';

//var MessageBarAlert = require('react-native-message-bar').MessageBar;
//var MessageBarManager = require('react-native-message-bar').MessageBarManager;


/**
 * This is for demo purposes only, and rate limited.
 * In case you want to use the Rotten Tomatoes' API on a real app you should
 * create an account at http://developer.rottentomatoes.com/
 */
// var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/';
// var API_KEYS = [
//   '7waqfqbprs7pajbz28mqf6vz',
//   // 'y4vwv8m33hed9ety83jmv52f', Fallback api_key
// ];

// Results should be cached keyed by the query
// with values of null meaning "being fetched"
// and anything besides null and undefined
// as the result of a valid query
var resultsCache = {
  dataForQuery: {},
  nextPageNumberForQuery: {},
  totalForQuery: {},
};

var LOADING = {};

var DocumentsScreen = React.createClass({
  mixins: [TimerMixin],

  timeoutID: (null: any),

  getInitialState: function() {
 
    return {
      isLoading: false,
      isLoadingTail: false,
      folderId: null,
      folderName: "",
      foldersTrail : [],
      parentFolderId : null,
      refreshing: false,
      env: this.props.env,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      filter: '',
      queryNumber: 0,
    };
  },

  componentDidMount: function(){
  //  MessageBarManager.registerMessageBar(this.refs.alert);
  },

  componentWillMount: function() {
    
    //  MessageBarManager.unregisterMessageBar();
  //  this.setState({folderId: this.props.folderId, parentFolderId: this.props.parentFolderId, parentFolderName: this.props.parentFolderName });
   
    this.searchDocuments('');
  },



_urlForQueryAndPage: function(query: string, pageNumber: number) : string{
    return "http://localhost/kenest.webApi/something";
},

updateLoadingState: function(isLoading: boolean){
    this.setState({isLoading: isLoading, isLoadingTail: isLoading})
},

  searchDocuments: function(query: string) {
    this.timeoutID = null;


     
     var fId = this.state.folderId == null? '00000000-0000-0000-0000-000000000000' :this.state.folderId;

    var cachedResultsForQuery = resultsCache.dataForQuery[query];
    if (cachedResultsForQuery && 1 == 2) {
     
      if (!LOADING[query]) {
        this.setState({
          dataSource: this.getDataSource(cachedResultsForQuery),
          isLoading: false
        });
      } else {
        this.setState({isLoading: true});
      }
      return;
    }

    LOADING[query] = true;
    resultsCache.dataForQuery[query] = null;
    this.setState({
      isLoading: true,
      queryNumber: this.state.queryNumber + 1,
      isLoadingTail: false,
    });
    const sessionToken  = encodeURIComponent(this.props.sessionToken)
    var env = this.state.env; 
    //const {curEnv} = config.env;
    
     var {ApiBaseUrl} = config.dev 
     
     switch (env) {
           case 'devDudu':
                    ApiBaseUrl = config.devDudu.ApiBaseUrl;  
                    break;
                case 'devAdam':
                    ApiBaseUrl = config.devAdam.ApiBaseUrl; 
                    break;
                case 'devKonstya':
                    ApiBaseUrl = config.devKonstya.ApiBaseUrl; 
                     break;
                case 'qa':
                    ApiBaseUrl = config.qa.ApiBaseUrl; 
                    break;
                case 'staging':
                    ApiBaseUrl = config.staging.ApiBaseUrl; 
                        break;
                case 'production':
                    ApiBaseUrl = config.production.ApiBaseUrl; 
             default:
                 break;
         }
         
    
    var docsUrl = `${ApiBaseUrl}/KDocuments.svc/RetrieveDocuments?t=${sessionToken}&fid=${fId}`;
    var folderName = '';

     var responseData =  fetch(docsUrl).then((response) => response.json())
                    .catch((error) => {
                        //Actions.error({data: 'get documents faliled failed'})
                         Actions.error({data: 'Failed to get documents'})
                           this.setState({ isLoading: false,
  	                                        refreshing: false});
                          return;
                    })
                    .then( (responseData) => {

                       if (responseData.ResponseStatus == 'FAILED')
                       {
                          Actions.error({data: 'Action failed'})
                            this.setState({ isLoading: false,
  	                        refreshing: false});
                           return;
                       }
                       
                          LOADING[query] = false;
                          resultsCache.totalForQuery[query] = typeof responseData.ResponseData.DocumentsList == 'undefined'? 0 :  responseData.ResponseData.DocumentsList.length;
                          resultsCache.dataForQuery[query] = responseData.ResponseData.DocumentsList;
                          folderName = responseData.ResponseData.FolderName;
                          resultsCache.nextPageNumberForQuery[query] = 2;
                          if (this.state.filter !== query) {
                              return;
                          }
                      
                         
                          this.setState({
                            folderName: folderName,
                            filter: query,
                            isLoading: false,
                            refreshing: false,
                            dataSource: this.getDataSource(responseData.ResponseData.DocumentsList) 
                          });
                    }).done(
               
                    );
  },

  hasMore: function(): boolean {
    var query = this.state.filter;
    if (!resultsCache.dataForQuery[query]) {
      return true;
    }
    return (
      resultsCache.totalForQuery[query] !==
      resultsCache.dataForQuery[query].length
    );
  },

  onEndReached: function() {
  
    var query = this.state.filter;
    if (!this.hasMore() || this.state.isLoadingTail) {
      // We're already fetching or have all the elements so noop
     
      return;
    }

    if (LOADING[query]) {
      return;
    }

    LOADING[query] = true;
    this.setState({
      queryNumber: this.state.queryNumber + 1,
      isLoadingTail: true,
    });

    var page = resultsCache.nextPageNumberForQuery[query];
    invariant(page != null, 'Next page number for "%s" is missing', query);

    fetch(this._urlForQueryAndPage(query, page))
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
        LOADING[query] = false;
        this.setState({
          isLoadingTail: false,
        });
      })
      .then((responseData) => {
        var documentsForQuery = resultsCache.dataForQuery[query].slice();

        LOADING[query] = false;
        // We reached the end of the list before the expected number of results
        if (!responseData.documents) {
          resultsCache.totalForQuery[query] = documentsForQuery.length;
        } else {
          for (var i in responseData.documents) {
            documentsForQuery.push(responseData.documents[i]);
          }
          resultsCache.dataForQuery[query] = documentsForQuery;
          resultsCache.nextPageNumberForQuery[query] += 1;
        }

        if (this.state.filter !== query) {
          // do not update state if the query is stale
          return;
        }

        this.setState({
          isLoadingTail: false,
          dataSource: this.getDataSource(resultsCache.dataForQuery[query]),
        });
      })
      .done();
  },

  getDataSource: function(documents: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(documents);
  },

  selectDocument: function(document: Object) {
 
  if (document.FamilyCode == 'FOLDER')
  {
    var folderT = new Object(); 
    folderT.Id = document.Id;
    folderT.Name = document.Name;
   this.state.foldersTrail.push(folderT);
    this.setState({ folderId : document.Id});
    this.searchDocuments(this.state.filter);
  }
    
  else
    Actions.documentView({sessionToken: this.props.sessionToken, viewerUrl: document.ViewerUrl});

  },

  onSearchChange: function(event: Object) {
    var filter = event.nativeEvent.text.toLowerCase();

    this.clearTimeout(this.timeoutID);
    this.timeoutID = this.setTimeout(() => this.searchDocuments(filter), 100);
  },

  renderFooter: function() {
    if (!this.hasMore() || !this.state.isLoadingTail) {
      return <View style={styles.scrollSpinner} />;
    }
    if (Platform.OS === 'ios') {
      return <ActivityIndicatorIOS style={styles.scrollSpinner} />;
    } else {
      return (
        <View  style={{alignItems: 'center'}}>
          <ProgressBarAndroid styleAttr="Large"/>
        </View>
      );
    }
  },

  renderSeparator: function(
    sectionID: number | string,
    rowID: number | string,
    adjacentRowHighlighted: boolean
  ) {
    var style = styles.rowSeparator;
    if (adjacentRowHighlighted) {
        style = [style, styles.rowSeparatorHide];
    }
    return (
      <View key={'SEP_' + sectionID + '_' + rowID}  style={style}/>
    );
  },

  renderRow: function(
    document: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
  ) {
 

    return (
      <DocumentCell
        key={document.Id}
        onSelect={() => this.selectDocument(document)}
        onHighlight={() => highlightRowFunc(sectionID, rowID)}
        onUnhighlight={() => highlightRowFunc(null, null)}
        document={document}
      />
    );
  },
  GoBack: function(){
     this.state.foldersTrail.pop();  
     var fid = this.state.foldersTrail.length > 0 ? this.state.foldersTrail[this.state.foldersTrail.length-1].Id: null;
     this.setState({folderId: fid });
     this.searchDocuments('')
  },
   _onRefresh: function(type: string, message: string){

  this.setState({refreshing: true});
      this.searchDocuments('');
      
      
    if (!KenestoHelper.isNullOrEmpty(type) && !KenestoHelper.isNullOrEmpty(message))
        this.refs.masterView.showMessage(type, message);
    
    
    },

  render: function() {
    var   breadCrums = this.state.folderId != null ?    <View style={{flexDirection:"row"}}>
        <Button onPress={ (()=> this.GoBack())} style={styles.backButton}>     ...  </Button>
          <Text style={styles.backButton}>  {this.state.folderName}</Text>
     </View> : null;
    
  
   
        
    var content = this.state.dataSource.getRowCount() === 0 ?
      <NoDocuments
        filter={this.state.filter}
        isLoading={this.state.isLoading}
        onRefresh={this._onRefresh}
      /> :
      <ListView
        ref="listview"
         refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        renderSeparator={this.renderSeparator}
        dataSource={this.state.dataSource}
        renderFooter={this.renderFooter}
        renderRow={this.renderRow}
        onEndReached={this.onEndReached}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={false}
      />
      ;

            // <StatusBarAlert
      //   visible={true}
      //   message="Silent Switch ON"
      //   backgroundColor="#3CC29E"
      //   color="blue"
      // />
      var additionalStyle = { };

    return (
      <ViewContainer  ref="masterView" style={[styles.container, additionalStyle]}>

     
     <SearchBar
          onSearchChange={this.onSearchChange}
          isLoading={this.state.isLoading}
          onFocus={() =>
            this.refs.listview && this.refs.listview.getScrollResponder().scrollTo({ x: 0, y: 0 })}
        />
        {breadCrums}
        <View style={styles.separator} />
        {content}
         <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => this._onRefresh('info', 'wawa ziba and his group')}>
            <Icon name="android-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Upload" onPress={() => Actions.animated()}>
            <Icon name="android-upload" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          
          <ActionButton.Item buttonColor='#1abc9c' title="New Folder" onPress={() => Actions.createFolder({env: this.state.env, currentFolderId: this.state.folderId, sessionToken: this.props.sessionToken, afterCreateCallback: this._onRefresh, updateLoading: this.updateLoadingState })}>
            <Icon name="folder" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        
      </ViewContainer>
    );
  },
});

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

module.exports = DocumentsScreen;
