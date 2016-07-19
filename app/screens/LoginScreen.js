import React from "react";
import {View, Text, TextInput, StyleSheet, TouchableHighlight,Navigator, AsyncStorage, } from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import config from '../utils/app.config';
import ProggressBar from "../components/ProgressBar";
import ForgotPassword from "../components/ForgotPassword";
import Login from "../components/Login";

var stricturiEncode = require('strict-uri-encode');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    }
});


 class LoginScreen  extends React.Component { 
     
      constructor(props) {
            super(props)
            this.state = {
            env: props.env, 
         }
      }
      
    _configureScene(route) {
        return Navigator.SceneConfigs.FloatFromRight
    }

    _renderScene(route,navigator)
    {

         switch(route.name) {
            case 'login':
                    route.passProps=  {
                        env: this.state.env
                    }       
                return <Login navigator={navigator}  route ={route}  {...route.passProps} />;
            case 'forgotPassword':
                return <ForgotPassword navigator={navigator}  route ={route} {...route.passProps}/>;
            default:
                throw new Error('No route found for name ' + route.name);
        }
    }
    
    render(){
         
        return (
               <Navigator
                     initialRoute={{name: 'login'}}
                     configureScene={this._configureScene}
                    renderScene={this._renderScene.bind(this)}
                />
            
              );
    }
    
}


module.exports = LoginScreen;