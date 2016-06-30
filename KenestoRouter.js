import React, {AppRegistry, Navigator, StyleSheet, Text, View} from 'react-native'
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'
import KenestoLauncher from './app/screens/KenestoLauncher'
import RegisterScreen from './app/screens/RegisterScreen'
import LoginScreen from './app/screens/LoginScreen'
import DocumentScreen from './app/screens/DocumentScreen'
import DocumentsScreen from './app/screens/DocumentsScreen'
import TasksScreen from './app/screens/TasksScreen'
import DataScreen from './app/screens/DataScreen'
import NavigationDrawer from './app/components/NavigationDrawer'
import CreateFolder from './app/components/CreateFolder'

import DocumentView from './app/screens/DocumentView'
import ImagePickerExample from './app/screens/ImagePickerExample'
import RNFSApp from './app/screens/test-fs'
// import Login from './components/Login'
 import Login2 from'./app/screens/login2'

 import Error from './app/components/Error'

 import animated from './app/components/animated'; 
 
 import PanResponderExample from './app/components/PanResponderExample'; 

  import AnimationTest from './app/components/AnimationTest'; 

// import Home from './components/Home'
// import EchoView from './components/EchoView'
// import NavigationDrawer from './components/NavigationDrawer'
// import  MoviesApp from '../screens/MoviesApp.android'; 
class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? "red" :"black"}}>{this.props.title}</Text>
        );
    }
}

class Right extends React.Component {
    render(){
        return <Text style={{
        width: 80,
        height: 37,
        position: "absolute",
        bottom: 4,
        right: 2,
        padding: 8,
    }}>Right</Text>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
    },
   leftButtonIconStyle: {
       height: 37,
       width: 37,
       padding: 0,
   },
   leftButtonStyle: {
       alignItems: "center",
       flexDirection: "row",
   }   

});

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

const drawerImage = require('./app/assets/images/menu-icon2.png'); // Kenesto side-menu button
const backButtonImage = require('./app/assets/images/arrow-orange-th.png'); // Kenesto go-back button



export default class KenestoRouter extends React.Component {
      
    // getInitialState(){
    //     return{
    //         isLoggedIn : false, 
    //         sessionToken: ""
    //     }
    // },
    
    // constructor(){
    //     super();
    //     this.state = { isLoggedIn : false, sessionToken : ""};
    // }

   
    render() {
        return <Router createReducer={reducerCreate}>
            <Scene key="modal" component={Modal} >
                <Scene key="root" hideNavBar={true}>
                <Scene key="launch" component={KenestoLauncher} title="Launch"  initial={true} />
               
                <Scene key="imagePicker" component={ImagePickerExample}  hideTabBar={true} icon={TabIcon}  />
                <Scene key="testfs" component={RNFSApp}  hideTabBar={true} icon={TabIcon}  />
                <Scene key="register" component={RegisterScreen} title="Register"/>
                <Scene key="login" component={LoginScreen} title="Login" />
                <Scene key="loginbaba" component={Login2} title="Loginbaba" />
                <Scene key="loginSplit" direction="vertical" >
                    <Scene key="loginModal" component={LoginScreen} title="Login"/>
                    <Scene key="loginModal2" hideNavBar={true} component={LoginScreen} title="Login2" panHandlers={null} duration={1}/>
                </Scene>
                <Scene key="tabbar" component={NavigationDrawer} >
                  <Scene key="main" tabs={true} >   
                  
                  
                  
                  <Scene key="documents" direction="vertical" navigationBarStyle={{ }} drawerImage={drawerImage} leftButtonIconStyle={styles.leftButtonIconStyle} backButtonImage={backButtonImage} leftButtonIconStyle={styles.leftButtonIconStyle} leftButtonStyle={styles.leftButtonStyle}>
                        <Scene key="documentsList" component={DocumentsScreen} title="All Documents" hideTabBar={false} icon={TabIcon}/>
                         <Scene key="login2" component={Login2} title="Login2"/>
                        <Scene key="documentView" component={DocumentView}  hideTabBar={false} icon={TabIcon}/>
                  </Scene>
                
                    
                        
               
               
                    </Scene>
                       
                        <Scene key="data" component={DataScreen} title="data tab" hideTabBar={false} icon={TabIcon}/>
                         <Scene key="tasks" component={TasksScreen} title="tasks tab" hideTabBar={false} icon={TabIcon}/>
                    </Scene>
               
                   
                </Scene>
                 <Scene key="animated" component={animated} title="animated"   />
                  <Scene key="PanResponderExample" component={PanResponderExample} title="PanResponderExample" />
                  <Scene key="AnimationTest" component={AnimationTest} title="AnimationTest"    />
                  
                 <Scene key="createFolder" component={CreateFolder}/>
                <Scene key="error" component={Error}/>
            </Scene>
        </Router>;
    }
}
