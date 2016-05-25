import React, {View, Text, TextInput, StyleSheet, TouchableHighlight} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import config from '../utils/app.config';
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
});


 class Login  extends React.Component { 
     

      constructor(props) {
         
            super(props)

            this.state = {
            username: "",
            password: "",
         }
      }
   
    _makeLogin(){
     
       
        // var { username, password } = this.state; 
         
       
         username = "scott@kenestodemo.com"; 
         password = "!QAZ@WSX";
        
         
        var {AuthUrlTemplate, LoginUrlTemplate} = config;
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
                        
                      // Actions.tabbar({ sessionToken: 'kuku'});
                      
                        Actions.tabbar({ sessionToken: responseData.LoginJsonResult.Token});
                        
                    }).done();
            }
          
        }).done();
         
   
//    fetch(this._urlForQueryAndPage(query, 1))
//       .then((response) => response.json())
//       .catch((error) => {
//         LOADING[query] = false;
//         resultsCache.dataForQuery[query] = undefined;

//         this.setState({
//           dataSource: this.getDataSource([]),
//           isLoading: false,
//         });
//       })
//       .then((responseData) => {
//         LOADING[query] = false;
//         resultsCache.totalForQuery[query] = responseData.total;
//         resultsCache.dataForQuery[query] = responseData.documents;
//         resultsCache.nextPageNumberForQuery[query] = 2;

//         if (this.state.filter !== query) {
//           // do not update state if the query is stale
//           return;
//         }

//         this.setState({
//           isLoading: false,
//           dataSource: this.getDataSource(responseData.documents),
//         });
//       })
//       .done();

   
    }
    render(){
      
        return (
            <View style={[styles.container, this.props.style]}>
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
        
         <Button onPress={this._makeLogin.bind(this)}>call makeLogina</Button>

        <TouchableHighlight onPress={this._makeLogin.bind(this)}>
          <Text>Submit</Text>
        </TouchableHighlight>
        
              
            </View>
        );
    }
}

module.exports = Login;