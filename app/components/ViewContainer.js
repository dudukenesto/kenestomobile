'use strict'
import React, { Component, View } from 'react-native'


var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

class ViewContainer extends Component {

  componentDidMount(){
MessageBarManager.registerMessageBar(this.refs.alert);
  }

  componentWillMount(){

 MessageBarManager.unregisterMessageBar();



  }


  showMessage(type: string, message: string, title: string){
     MessageBarManager.showAlert({
        title: title,
        message: message,
        alertType: type,
        viewTopOffset: 20,
        messageStyle:  {textAlign: 'center'}
        // See Properties section for full customization
        // Or check `index.ios.js` or `index.android.js` for a complete example
});
  }

  render() {
    return (
      <View style={[styles.viewContainer, this.props.style || {}]}>
        {this.props.children}
         <MessageBarAlert ref="alert" />
      </View>
    )
  }
}

const styles = React.StyleSheet.create({

  viewContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
  }

})

module.exports = ViewContainer
