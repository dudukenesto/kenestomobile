'use strict';
import React from 'react';
import {View, Text, StyleSheet,TouchableHighlight,
  TouchableNativeFeedback} from "react-native";


class BreadCrumbs extends React.Component {
    
    constructor(props){
         if (typeof props == 'undefined')
            props = null;
            
        super(props);
       
    }
    
   WholeCrumbs() {
       
        
        var TouchableElement = TouchableHighlight;
        if (Platform.OS === 'android') {
            TouchableElement = TouchableNativeFeedback;
        }
        
        return this.state.BreadCrumbs.map(function(breadCrumb, i){
            return(
             <TouchableElement fid={this.props.Id}  onPress={this.props.onSelect}>
                <Text>{this.props.Text}</Text>
            </TouchableElement>
            );
        });
    }
    
    render(){
        return (
           <View>
                <Text>hahah</Text>
           </View>
        );
    }
      
}

module.exports = BreadCrumbs;