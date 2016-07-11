import React from "react";
import {View, Text, StyleSheet,Image,Platform, TouchableHighlight, TouchableNativeFeedback} from "react-native";
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
    row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },

    itemIcon: {
    backgroundColor: 'transparent',
    height: 22,
    marginRight: 10,
    width:22,
  },
   itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
     marginRight: 10,
  },
});


export default class TabView extends React.Component {

     constructor(props){
         if (typeof props == 'undefined')
            props = null;
            
        super(props);
       
    }
    render(){
       
    
       var TouchableElement = TouchableHighlight;
        if (Platform.OS === 'android') {
        TouchableElement = TouchableNativeFeedback;
        }

      
         var  imageSource = require('../assets/images/folder_icon.png'); 
      // var imageSource ={uri: this.props.icon}


        return (
            <View>
            <TouchableElement
                    onPress={this.props.onSelect}
                    onShowUnderlay={this.props.onHighlight}
                    onHideUnderlay={this.props.onUnhighlight}>
                    <View style={styles.row}>
                        <Image
                     
                        source = {imageSource}
                        style={styles.itemIcon}
                        />
                        <Text style={styles.itemTitle} >
                            {this.props.listItem.itemTitle}
                        </Text>
                         <Text style={styles.itemTitle}>
                            {this.props.listItem.itemCount}
                        </Text>
                    </View>
            </TouchableElement>
            </View>
            
        );
    }
    

}

