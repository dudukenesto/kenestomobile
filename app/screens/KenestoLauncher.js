import React, {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import NavigationDrawer from '../components/NavigationDrawer'

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
    }
});

class KenestoLauncher extends React.Component {
    
      constructor(props){
        super(props);
       // var isloggedIn = props != null && props.isLoggedIn != null? props.isLoggedIn : false;
     //   var sessionToken = props != null && props.sessionToken != null? props.sessionToken : "";
     //   this.state = { isLoggedIn : isloggedIn, sessionToken : sessionToken};
     
     
      this.state = { isLoggedIn : false, sessionToken : "", env: "qa"};
      
    }

    updateLoginInfo(isLoggedIn: boolean, sessionToken: string ){
      this.setState({ isLoggedIn: isLoggedIn, sessionToken: sessionToken});
    }
    
   componentWillMount(){
       if (this.state.isLoggedIn)
            Actions.tabbar();
   }
   
   _setEnv(_env){
    //alert(_env.id);
       this.setState({env: _env.id});
   }
   
     _getOptionList() {
    return this.refs['OPTIONLIST'];
  }
   
   
   _renderDeopdown(){
       return ( <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Select
            width={250}
            ref="SELECT1"
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="Select environment..."
            onSelect={this._setEnv.bind(this)}>
            <Option value = {{id : "localDev"}}>Local Dev</Option>
            <Option value = {{id : "qa"}}>QA</Option>
            <Option value = {{id : "staging"}}>Staging</Option>
            <Option value = {{id : "production"}}>Production</Option>
            
          </Select>

          <OptionList ref="OPTIONLIST"/>
      </View>);
   }
   
  
   

    
   
    render(){
               
            return (
                <View {...this.props}  style={styles.container}>
                    <Text>Welcome to Kenesto</Text>
                    <Text>Current environment: {this.state.env}</Text>
                    <Text>select environment</Text>
                  
                        {this._renderDeopdown()}
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