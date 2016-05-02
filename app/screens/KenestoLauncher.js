import React, {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import NavigationDrawer from '../components/NavigationDrawer'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    }
});

class KenestoLauncher extends React.Component {
    
      constructor(props){
        super(props);
       // var isloggedIn = props != null && props.isLoggedIn != null? props.isLoggedIn : false;
     //   var sessionToken = props != null && props.sessionToken != null? props.sessionToken : "";
     //   this.state = { isLoggedIn : isloggedIn, sessionToken : sessionToken};
     
     
      this.state = { isLoggedIn : false, sessionToken : ""};
      
    }

    updateLoginInfo(isLoggedIn: boolean, sessionToken: string ){
      this.setState({ isLoggedIn: isLoggedIn, sessionToken: sessionToken});
    }
    
   componentWillMount(){
       if (this.state.isLoggedIn)
            Actions.tabbar();
   }
   
  
   

    
   
    render(){
               
            return (
                <View {...this.props}  style={styles.container}>
                    <Text>Welcome to Kenesto</Text>
                    <Button onPress={()=>Actions.login({isLoggnedIn: this.state.isLoggedIn, sessionToken: this.state.sessionToken, updateLoginInfo: this.updateLoginInfo.bind(this) })}>Go to login</Button>
                 <Button onPress={this.testState}>text state</Button>
                </View>
            );
   
    }
}

//  <Text>Launch page</Text>
//                 <Button onPress={Actions.documents}>DocumentsPage</Button>
               
//                 <Button onPress={Actions.register}>Go to Register page</Button>
//                 <Button onPress={()=>Actions.error("Error message")}>Popup error</Button>
//                 <Button onPress={Actions.tabbar}>Go to TabBar page</Button>
module.exports = KenestoLauncher;