'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  WebView
} = React;

var HEADER = '#3b5998';
var BGWASH = 'rgba(255,255,255,0.8)';
var DISABLED_WASH = 'rgba(255,255,255,0.25)';

var TEXT_INPUT_REF = 'urlInput';
var WEBVIEW_REF = 'webview';
var DEFAULT_URL = 'www.one.co.il';

class DocumentView extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {  
      sessionToken : props.sessionToken,
      viewerUrl: props.viewerUrl,
      url: DEFAULT_URL,
     // status: 'No Page Loaded',
     // backButtonEnabled: false,
     // forwardButtonEnabled: false,
     // loading: true,
      scalingEnabled: true};
  }
  
  render(){
    var sessionToken = this.state.sessionToken;
     debugger;
    return(
     
 
          <View style={{ flex: 1}}>
        <WebView
          style={{ backgroundColor: BGWASH, position: 'absolute',top: 0, bottom: 0, left: 0, right: 0}}
      //    style = {{height: 700}}
         source={{uri: this.state.viewerUrl}}
        //  source={{uri: 'http://localhost/PLMPlus.UI.Client/UserExternal/GetViewerUrl?isExternal=True&token=MDEwL1NvYXZhSzNqUVpWajlkSmE5alFkbTNhMXREaXB5NC9sVXEraUNFcUFPN2RFZjd1UVlxNnhicmF2OVQxdDYxK2hWVEkxWlRsQ1BGNlh6SE16cVQ0Rk9MSlR5YjZBclVmdFdRKzBaTUZMUEc2WU1Ca1FqbncwS3BkdXg2K2ZhdE1yeDl0NjNvY1ZCYUlpVnEvL3o0UVN6YW9ENTNLWTd5RElJSWJVWWlZPQ2&assetId=8cd8b1bb-5528-40e2-99c8-779bf951d100&AssetFamilyCode=GENERAL&useInternalToken=False&useItemVersion=True&isSessionToken=True&mobile=True'}}
          
            javaScriptEnabled={true}
            domStorageEnabled={true}
         
          scalesPageToFit={true}
        />
       
      </View>
    )
  }
  
  
  
  
}

var Button = React.createClass({
  _handlePress: function() {
    if (this.props.enabled !== false && this.props.onPress) {
      this.props.onPress();
    }
  },
  render: function() {
    return (
      <TouchableWithoutFeedback onPress={this._handlePress}>
        <View style={[styles.button, this.props.enabled ? {} : styles.buttonDisabled]}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEADER,
  },
  addressBarRow: {
    flexDirection: 'row',
    padding: 8,
  },
  webView: {
    backgroundColor: BGWASH,
    height: 350,
  },
  addressBarTextInput: {
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
    borderWidth: 1,
    height: 24,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    flex: 1,
    fontSize: 14,
  },
  navButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  disabledButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DISABLED_WASH,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  goButton: {
    height: 24,
    padding: 3,
    marginLeft: 8,
    alignItems: 'center',
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
    alignSelf: 'stretch',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    height: 22,
  },
  statusBarText: {
    color: 'white',
    fontSize: 13,
  },
  spinner: {
    width: 20,
    marginRight: 6,
  },
  buttons: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.5,
    width: 0,
    margin: 5,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'gray',
  },
});

module.exports = DocumentView;