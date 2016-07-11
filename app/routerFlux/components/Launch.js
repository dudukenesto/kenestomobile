import React from "react";
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    }
});

class Launch extends React.Component {
    render(){
       
        return (
            <View {...this.props}  style={styles.container}>
                <Text>Launch page</Text>
                <Button onPress={Actions.movies}>Go to movies</Button>
                <Button onPress={()=>Actions.login({isLoggnedIn: this.props.isLoggnedIn, sessionToken: this.props.sessionToken })}>Go to Login page</Button>
                <Button onPress={Actions.register}>Go to Register page</Button>
                <Button onPress={Actions.register2}>Go to Register page without animation</Button>
                <Button onPress={()=>Actions.error("Error message")}>Popup error</Button>
                <Button onPress={Actions.tabbar}>Go to TabBar page</Button>
            </View>
        );
    }
}

module.exports = Launch;