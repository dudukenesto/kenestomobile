import React from "react";
import {View, Text, StyleSheet, WebView} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";




export default class extends React.Component {
    render(){

        return (
            <View style={styles.container}>
                <Text>Login2 page: {this.props.data}</Text>
                <Button onPress={Actions.pop}>Back</Button>
                
                <WebView
            
                    automaticallyAdjustContentInsets={false}
                    style={{flex: 1 }}
                    source={{uri: 'https://m.facebook.com'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                   // onNavigationStateChange={this.onNavigationStateChange}
                   // onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                    startInLoadingState={true}
                    scalesPageToFit={true}
             />
       
            </View>
        );
    }
}


var HEADER = '#3b5998';
var BGWASH = 'rgba(255,255,255,0.8)';
var DISABLED_WASH = 'rgba(255,255,255,0.25)';

var TEXT_INPUT_REF = 'urlInput';
var WEBVIEW_REF = 'webview';


var styles = StyleSheet.create({
  container: {
    flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
  },
  addressBarRow: {
    flexDirection: 'row',
    padding: 8,
  },
  webView: {
  //  backgroundColor: BGWASH,
    height: 700
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

