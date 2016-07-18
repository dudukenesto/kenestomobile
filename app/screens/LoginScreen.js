import React from "react";
import {View, Text, TextInput, StyleSheet, TouchableHighlight, AsyncStorage, } from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import config from '../utils/app.config';
import ProggressBar from "../components/ProgressBar";


var stricturiEncode = require('strict-uri-encode');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    },
     spinner: {
        width: 30,
        height: 30,
   },
});


 class Login  extends React.Component { 
  
      constructor(props) {
         
            super(props)

            this.state = {
            username: "",
            password: "",
            env: props.env, 
            isLoading: false, 
            mode: "login"
         }


      }
      
      
 _ClearCredentials(){
        console.log("Login9")
        AsyncStorage.multiRemove(["kenestoU","kenestoP", "env"]); 
    }
   
    _makeLogin(){


        this.setState({isLoading: true});
         var { username, password, env } = this.state; 
         

        var {AuthUrlTemplate, LoginUrlTemplate} = config.dev;
        
       //  username = "scott@kenestodemo.com"; 
       //  password = "!QAZ@WSX";

     //    const {curEnv} = config.env;
         
         switch (env) {
             case 'qa':
                
                  AuthUrlTemplate = config.qa.AuthUrlTemplate; 
                  LoginUrlTemplate = config.qa.LoginUrlTemplate; 
                 break;
            case 'staging':
                  AuthUrlTemplate = config.staging.AuthUrlTemplate; 
                  LoginUrlTemplate = config.staging.LoginUrlTemplate; 
                     break;
            case 'production':
                  AuthUrlTemplate = config.production.AuthUrlTemplate; 
                  LoginUrlTemplate = config.production.LoginUrlTemplate; 
             default:
                 break;
         }

       
    
        var authUrl = AuthUrlTemplate.replace('{0}', username).replace('{1}', password); 
    
        fetch(authUrl)
        .then((response) => response.json())
        .catch((error) => {
            this.updateIsLoading(false);
             Actions.error({data: 'authentication failed'})
        })
        .then( (responseData) => {
        
            if (responseData.AuthenticateJsonResult.ResponseStatus == "FAILED")
            {
                  this.updateIsLoading(false);
                 Actions.error({data: 'authentication failed'}); 
                  this._ClearCredentials();
            }
                
            else{
                    var organizationId = responseData.AuthenticateJsonResult.Organizations[0].OrganizationIdentifier; 
                    var Token = stricturiEncode(responseData.AuthenticateJsonResult.Token);
                    var loginUrl = LoginUrlTemplate.replace('{0}', organizationId).replace('{1}', Token);
                    
         
                    fetch(loginUrl).then((response) => response.json())
                    .catch((error) => {
                         this._ClearCredentials();
                         this.updateIsLoading(false);
                         Actions.error({data: 'Login failed'})
                    })
                    .then( (responseData) => {
                        AsyncStorage.setItem("kenestoU", username); 
                        AsyncStorage.setItem("kenestoP", password); 
                        AsyncStorage.setItem("env", this.state.env); 
                        Actions.tabbar({ sessionToken: responseData.LoginJsonResult.Token, env: this.state.env, loggedUser: username});
                        
                    }).done();
            }
          
        }).done();
         
   
    }
    
    updateIsLoading(_isLoading){
        this.setState({isLoading: _isLoading})
    }
    
    
    renderProgressBar(){
        if (this.state.isLoading){
            return(
            <ProggressBar isLoading={true} />
            )
        }
        else{
            return(
                <ProggressBar isLoading={false} />
            )
            
            }
        
        }
   

    
    render(){

      
      if (this.state.mode == "login")
        return (
            <View style={[styles.container, this.props.style]}>
          {this.renderProgressBar()}
                 <TextInput
          autoFocus={true}
          value={this.state.username}
          onChangeText={username => this.setState({username})}
        
        />
        
        <TextInput
          ref="password"
          value={this.state.password} secureTextEntry={true}
          onChangeText={password => this.setState({password})}
       
        />
        
         <Button onPress={this._makeLogin.bind(this)}>Login</Button>

              
            </View>
        ); 
    }
}


/**
        <TouchableHighlight onPress={this._makeLogin.bind(this)}>
          <Text>Submit</Text>
        </TouchableHighlight>
 */    

module.exports = Login;