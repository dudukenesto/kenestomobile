import React, {AppRegistry, Navigator, StyleSheet, Text, View} from 'react-native'
import Launch from './components/Launch'
import Register from '../screens/Register'

import Login from './components/Login'
import Login2 from './components/Login2'
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'
import Error from './components/Error'
import Home from './components/Home'
import TabView from './components/TabView'
import EchoView from './components/EchoView'
import NavigationDrawer from './components/NavigationDrawer'
import  MoviesApp from '../screens/MoviesApp.android'; 
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

export default class Example extends React.Component {
    render() {
        return <Router createReducer={reducerCreate}>
            <Scene key="modal" component={Modal} >
                <Scene key="root" hideNavBar={true}>
              
                    <Scene key="echo" clone component={EchoView} />
                    <Scene key="movies" component={MoviesApp} title="Register"/>
                    <Scene key="register" component={Register} title="Register"/>
                    <Scene key="register2" component={Register} title="Register2" duration={1}/>
                    <Scene key="home" component={Home} title="Replace" type="replace"/>
                    <Scene key="launch" component={Launch} title="Launch" initial={true} />
                    <Scene key="login" direction="vertical"  >
                        <Scene key="loginModal" component={Login} title="Login"/>
                        <Scene key="loginModal2" hideNavBar={true} component={Login2} title="Login2" panHandlers={null} duration={1}/>
                    </Scene>
                    <Scene key="tabbar" component={NavigationDrawer}>
                        <Scene key="main" tabs={true} >
                            <Scene key="tab1"  title="Tab #1" icon={TabIcon} navigationBarStyle={{backgroundColor:"red"}} titleStyle={{color:"white"}}>
                                <Scene key="tab1_1" component={TabView} title="Tab #1_1" onRight={()=>alert("Right button")} rightTitle="Right" />
                                <Scene key="tab1_2" component={MoviesApp} title="Tab #1_2" titleStyle={{color:"black"}}/>
                            </Scene>
                            <Scene key="tab2" initial={true} title="Tab #2" icon={TabIcon}>
                                <Scene key="tab2_1" component={TabView} title="Tab #2_1"/>
                                <Scene key="tab2_2" component={TabView} title="Tab #2_2" onLeft={()=>alert("Left button!")} leftTitle="Left" duration={1} panHandlers={null}/>
                            </Scene>
                            <Scene key="tab3" component={MoviesApp} title="Tab #3" hideTabBar={false} icon={TabIcon}/>
                            <Scene key="tab4" component={MoviesApp} title="Tab #4" hideNavBar={true} icon={TabIcon}/>
                            <Scene key="tab5" component={MoviesApp} title="Tab #5" icon={TabIcon} renderRightButton={()=><Right/>}/>
                        </Scene>
                    </Scene>
                </Scene>
                <Scene key="error" component={Error}/>
            </Scene>
        </Router>;
    }
}
