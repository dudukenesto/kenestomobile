import React from "react";
import {View, Text, TextInput, StyleSheet, TouchableHighlight,Navigator, AsyncStorage, } from "react-native";
import Button from "react-native-button";
import Tcomb from "tcomb-form-native";
import config from '../utils/app.config';
import {Actions} from "react-native-router-flux";
import ProggressBar from "../components/ProgressBar";


var stricturiEncode = require('strict-uri-encode');

var Form = Tcomb.form.Form;

var Email = Tcomb.refinement(Tcomb.String, function (s) {
  return /\S+@\S+\.\S+/.test(s);
});
Email.getValidationErrorMessage = function (value, path, context) {
  return 'Email Address (Username) is not valid';
};

var Password = Tcomb.refinement(Tcomb.String, function (s) {
  return s.length >= 0;
});

Password.getValidationErrorMessage = function (value, path, context) {
  return 'Field is required!';
};


var User = Tcomb.struct({      
  username: Email,  //required email
  password: Password,
});

var options = {
    fields: {
    username: {
    placeholder: 'Username',
    label: ' ',
    autoFocus: true
    },
     password: {
     placeholder: 'Password',
     label: ' ',
     secureTextEntry:true
    }
 }
};

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
    //   componentDidMount() {
    //     // give focus to the name textbox
    //     this.refs.form.getComponent('username').refs.input.focus();
    // }
      constructor(props) {
         
            super(props)
            console.log("log in props.env:"+props.env)
            this.state = {
            value:{
                username: "",
                password: ""
            },    
            env: props.env, 
            isLoading: false
         }
         
      }
    
    onChange(value) {
        this.setState({value});
    }
    _navigate(){
    this.props.navigator.push({
        name: 'forgotPassword', // Matches route.name
        passProps: {
            username: this.state.value.username,
            env:this.state.env
    }
  })}

   _ClearCredentials(){
        AsyncStorage.multiRemove(["kenestoU","kenestoP", "env"]); 
    }
    

    _makeLogin(){
       var value = this.refs.form.getValue();
       
        if (value == null) { // if validation fails, value will be null
            return false; // value here is an instance of Person
        }
        this.setState({isLoading: true});
        
         var { env } = this.state; 
         var { username, password } = this.state.value;

        var {AuthUrlTemplate, LoginUrlTemplate} = config.dev;
        
       //  username = "scott@kenestodemo.com"; 
       //  password = "!QAZ@WSX";

     //    const {curEnv} = config.env;
          
         switch (env) {
             case 'devDudu':
                  AuthUrlTemplate = config.devDudu.AuthUrlTemplate; 
                  LoginUrlTemplate = config.devDudu.LoginUrlTemplate; 
                 break;
            case 'devAdam':
                  AuthUrlTemplate = config.devAdam.AuthUrlTemplate; 
                  LoginUrlTemplate = config.devAdam.LoginUrlTemplate; 
                 break;
            case 'devKonstya':
                  AuthUrlTemplate = config.devKonstya.AuthUrlTemplate; 
                  LoginUrlTemplate = config.devKonstya.LoginUrlTemplate; 
                 break;
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
    console.log(authUrl)
        fetch(authUrl)
        .then((response) => response.json())
        .catch((error) => {
            this._updateIsLoading(false);
             Actions.error({data: 'Failed to Login'})
        })
        .then( (responseData) => {
        
            if (responseData.AuthenticateJsonResult.ResponseStatus == "FAILED")
            {
                  this._updateIsLoading(false);
                 Actions.error({data: responseData.AuthenticateJsonResult.ErrorMessage}); 
                  this._ClearCredentials();
            }
                
            else{
                    var organizationId = responseData.AuthenticateJsonResult.Organizations[0].OrganizationIdentifier; 
                    var Token = stricturiEncode(responseData.AuthenticateJsonResult.Token);
                    var loginUrl = LoginUrlTemplate.replace('{0}', organizationId).replace('{1}', Token);
                    
         
                    fetch(loginUrl).then((response) => response.json())
                    .catch((error) => {
                         this._ClearCredentials();
                         this._updateIsLoading(false);
                         Actions.error({data: 'Failed to Login'})
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


    _updateIsLoading(_isLoading){
        this.setState({isLoading: _isLoading})
    }
    
    _renderProgressBar(){
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
   
    
    _renderLogin(){
       
            return(<View style={[styles.container, this.props.style]}>
                {this._renderProgressBar()}

            <Form
                ref="form"
                type={User}
                value={this.state.value}
                onChange={this.onChange.bind(this)}
                options={options}
            />
            
            <Button onPress={this._makeLogin.bind(this)}>Login</Button>

            <TouchableHighlight
                onPress={ () => this._navigate() }
                 >
                <Text>Forgot Password?</Text>
                </TouchableHighlight>
            </View>
              )
    }

    render(){
        
        return (
          <View style={[styles.container, this.props.style]}>
            {this._renderLogin()}
          </View>
       
        );
    }
}

module.exports = Login;