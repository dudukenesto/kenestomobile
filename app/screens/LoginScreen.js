import React, {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

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


export default class extends React.Component { 
    
    componentDidMount(){
        debugger;
          this.props.updateLoginInfo(true, "zzaaa");
          this.props.sessionState = "jee";
    }
    render(){
      
        return (
            <View style={[styles.container, this.props.style]}>
                <Text>Login pageis logged in: {this.props.sessionState}</Text>
                <Button onPress={Actions.loginModal2}>Login 2</Button>
                <Button onPress={() => Actions.refresh({title:"Changed title"})}>Change title</Button>
                <Button onPress={Actions.pop}>Back</Button>
            </View>
        );
    }
}
