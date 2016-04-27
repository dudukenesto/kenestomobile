 import React, { Component, View, Text, AppRegistry, StyleSheet, AsyncStorage, TextInput }  from 'react-native';

class DemoAsyncStorage extends Component {

componentDidMount(){
    AsyncStorage.getItem("myKey").then((value) => {
        this.setState({"myKey" : value});
    }).done();
}

    
  render() {
      var retText = this.state != null && this.state.myKey != null? this.state.myKey: "nothing";
      
      
    return (
      <View style={styles.container}>
        <Text style={styles.saved}>
         { retText}
        </Text>
      <View>
        <TextInput
            style={styles.formInput}
            onChangeText={(text) => this.saveData(text)}
            value={retText} />
      </View> 
      <Text style={styles.instructions}>
        Tep something into the vox and restart your application to see if if still there.
      </Text>
      </View>
    );
  }
  
  saveData(value){

      AsyncStorage.setItem("myKey", value); 
      this.setState({"myKey": value});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  formInput:{
      flex: 1, 
      height: 50, 
      fontSize: 13, 
      borderWidth: 1, 
      borderColor: "#555555"
      
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    marginTop: 5, 
  },
  saved: {
      fontSize: 20,
      textAlign: 'center', 
      margin: 10,
  }
});

module.exports = DemoAsyncStorage

