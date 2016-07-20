import React from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";
import {Actions} from "react-native-router-flux";
import Tcomb from "tcomb-form-native";
import Button from "react-native-button";
import config from '../utils/app.config';
import ProggressBar from "../components/ProgressBar";

var stricturiEncode = require('strict-uri-encode');

var Form = Tcomb.form.Form;
var Email = Tcomb.refinement(Tcomb.String, function (s) {
  return /\S+@\S+\.\S+/.test(s);
});
Email.getValidationErrorMessage = function (value, path, context) {
  return 'Email Address (Username) is not valid';
};

var User = Tcomb.struct({      
  username: Email,  //required email
});
var options = {
    fields: {
    username: {
    placeholder: 'Username',
    label: ' ',
    autoFocus: true
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
    buttons: {
         flex: 1,
        flexDirection: "row",
        justifyContent: 'space-around',
   },
   input:{
       padding:4,
       height:40,
       borderColor:'gray',
       borderWidth:1,
       borderRadius:6,
       margin:5,
       width:200,
       alignSelf:'center'
   }
  
});


 class ForgotPassword  extends React.Component { 
     
    // componentDidMount() {
    //     // give focus to the name textbox
    //     this.refs.form.getComponent('username').refs.input.focus();
    // }
      constructor(props) {
         
            super(props)
            console.log("props:"+props.username+","+props.env)
            this.state = {
             value:{
                username: props.username,
                password: "",
            },   
            env: props.env, 
            isLoading: false,
           responseStatus:''
         }
      }
    onChange(value) {
        this.setState({value});
    }
    _makeForgotPassword(){
       
        var value = this.refs.form.getValue();
       
        if (value == null) { // if validation fails, value will be null
            return false; // value here is an instance of Person
        }
        this.setState({isLoading: true});
        
        var env = this.state.env; 
        var { username} = this.state.value;
         
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

        var forgotPasswordUrl = `${ApiBaseUrl}Access.svc/ForgotPassword/json?u=${username}`;
        
        fetch(forgotPasswordUrl)
        .then((response) => response.json())
        .catch((error) => {
            this._updateIsLoading(false);
             Actions.error({data: 'Failed to reset password'})
        })
        .then( (responseData) => {
        
            if (responseData.ForgotPasswordResult.ResponseStatus == "FAILED")
            {
                  this._updateIsLoading(false);
                 Actions.error({data: responseData.ForgotPasswordResult.ErrorMessage}); 
            }

            this._updateIsLoading(false);
            this.setState({responseStatus: responseData.ForgotPasswordResult.ResponseStatus}); 
        }).done();
    }
    
    _updateIsLoading(_isLoading){
        this.setState({isLoading: _isLoading})
    }
    
   _navigate(){
        // this.props.navigator.push({
        //     name: 'login', // Matches route.name
        // })
        this.props.navigator.pop(0);
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
   
    
    _renderForgotPassword(){
        if ( this.state.responseStatus == "" || this.state.responseStatus == "FAILED") {
            return(  <View>
                        <View style={styles.container}>
                            <Text>Forgot Password</Text>
                            {this._renderProgressBar()}
                            <Text>Enter your email address to request a password reset</Text>
                       </View>
                        <Form
                            ref="form"
                            type={User}
                            value={this.state.value}
                            onChange={this.onChange.bind(this)}
                            options={options}
                        />
                        <View style={styles.buttons}>
                            <Button onPress={ () => this._navigate() }>Cancel</Button>
                            <Button onPress={this._makeForgotPassword.bind(this)}>Reset Password</Button>
                        </View>
                    </View>)
        }
        else
        {
        return( <View>
                <View style={styles.container}>
                    <Text>Email was sent successfully</Text>
                    <Text> Please check your email for further instructions...</Text>
                </View>
                <Button onPress={ () => this._navigate()}>Back to login screen</Button>
            </View>)
        }
    }

    render(){
        return (
          <View style={[styles.container, this.props.style]}>
            {this._renderForgotPassword()}
          </View>
       
        );
    }
}

module.exports = ForgotPassword;