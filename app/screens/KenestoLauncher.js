import React, {View, Text, TextInput, StyleSheet, AsyncStorage, TouchableHighlight} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import NavigationDrawer from '../components/NavigationDrawer'
import config from '../utils/app.config';
import ModalPicker from 'react-native-modal-picker'
var stricturiEncode = require('strict-uri-encode');
import DropDown, {
  Select,
  Option,
  OptionList,
} from 'react-native-selectme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#532860',
  },
     button: {
        borderRadius: 4,
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "#B8C",
  },
});


class KenestoLauncher extends React.Component {
    
    
      constructor(props){
        super(props);
       // var isloggedIn = props != null && props.isLoggedIn != null? props.isLoggedIn : false;
     //   var sessionToken = props != null && props.sessionToken != null? props.sessionToken : "";
    //    this.state = { isVisible: false};
       this.state = {
            textInputValue: ''
        }
     
    
      
    }

    updateLoginInfo(isLoggedIn: boolean, sessionToken: string ){
      this.setState({ isLoggedIn: isLoggedIn, sessionToken: sessionToken});
    }
    
    
    
   componentWillMount(){
      
      
  
       
         this.setState({ isLoggedIn : false, sessionToken : "", env: "qa"});
         
        AsyncStorage.multiGet(["kenestoU", "kenestoP"]).then((res) => {
          var storedUserName = null; 
          var storedPassword = null;
          res.map( (result, i, res) => {
                let key = res[i][0];
                let val = res[i][1];
                if (key == "kenestoU")
                    storedUserName  = val;
                else
                    storedPassword = val;
            });

               if (storedPassword != null && storedUserName != null )
                    this._makeLogin(storedUserName, storedPassword);
         }).done();
       
      // if (this.state.isLoggedIn)
      //      Actions.tabbar();
            
   }
   
   _setEnv(_env){
    //alert(_env.id);
       this.setState({env: _env.id});
   }
   
 
  
  

  _renderModalPicker(){
        let index = 0;
        const data = [
            { key: index++, section: true, label: 'Environments' },
            { key: "dev", label: 'Local Dev' },
            { key: "qa", label: 'QA' },
            { key: "staging", label: 'Staging' },
            { key: "production", label: 'Production' },
        ];

        return (
            <View style={{flex:1, justifyContent:'space-around', padding:50}}>

                <ModalPicker
                    data={data}
                    initValue="Select Environment"
                    onChange={(option)=>{ this.setState({env: option.key }) }} />

            </View>
        );
  }



   
  
   
  _makeLogin(username, password){

        var {AuthUrlTemplate, LoginUrlTemplate} = config.dev;
          var {env} = this.state;
        
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
            
             Actions.error({data: 'authentication failed'})
        })
        .then( (responseData) => {
        
            if (responseData.AuthenticateJsonResult.ResponseStatus == "FAILED")
                 Actions.error({data: 'authentication failed'}); 
            else{
                    var organizationId = responseData.AuthenticateJsonResult.Organizations[0].OrganizationIdentifier; 
                    var Token = stricturiEncode(responseData.AuthenticateJsonResult.Token);
                    var loginUrl = LoginUrlTemplate.replace('{0}', organizationId).replace('{1}', Token);
                    
                    fetch(loginUrl).then((response) => response.json())
                    .catch((error) => {
                        Actions.error({data: 'Login failed'})
                    })
                    .then( (responseData) => {
                        
                        Actions.tabbar({ sessionToken: responseData.LoginJsonResult.Token, env: this.state.env});
                        
                    }).done();
            }
          
        }).done();
         
   
    }
    
   
    render(){
               
            return (
                <View {...this.props}  style={styles.container}>
                    <Text>Welcome to Kenesto</Text>
                    <Text>Current environment: {this.state.env}</Text>
                    <Text>select environment</Text>
                    {this._renderModalPicker()}
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        
                            <Button onPress={()=>Actions.login({isLoggnedIn: this.state.isLoggedIn, env: this.state.env, sessionToken: this.state.sessionToken, updateLoginInfo: this.updateLoginInfo.bind(this) })}>Go to login</Button>
                         </View>
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