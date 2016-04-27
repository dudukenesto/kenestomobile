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
import TabView from './app/components/TabView'
// import Login from './components/Login'
// import Login2 from './components/Login2'

// import Error from './components/Error'
// import Home from './components/Home'
// import TabView from './components/TabView'
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
    container: {flex:1, backgroundColor:"transparent",justifyContent: "center",
        alignItems: "center",}

});

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

export default class KenestoRouter extends React.Component {
    render() {
        return <Router createReducer={reducerCreate}>
            <Scene key="modal" component={Modal} >
                <Scene key="root" hideNavBar={true}>
                <Scene key="launch" component={KenestoLauncher} title="Launch" initial={true} />
                <Scene key="register" component={RegisterScreen} title="Register"/>
                <Scene key="login" component={LoginScreen} title="Login"/>
                <Scene key="loginSplit" direction="vertical" >
                    <Scene key="loginModal" component={LoginScreen} title="Login"/>
                    <Scene key="loginModal2" hideNavBar={true} component={LoginScreen} title="Login2" panHandlers={null} duration={1}/>
                </Scene>
                <Scene key="tabbar" component={NavigationDrawer}>
                  <Scene key="main" tabs={true} >   
                        <Scene key="documents" component={DocumentsScreen} title="Documents tab" hideTabBar={false} icon={TabIcon}/>
                        <Scene key="data" component={DataScreen} title="data tab" hideTabBar={false} icon={TabIcon}/>
                         <Scene key="tasks" component={TasksScreen} title="tasks tab" hideTabBar={false} icon={TabIcon}/>
                    </Scene>
                </Scene>
                   
                </Scene>
                <Scene key="error" component={Error}/>
            </Scene>
        </Router>;
    }
}
