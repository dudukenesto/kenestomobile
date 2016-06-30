'use strict'
import {Actions} from "react-native-router-flux";
const React = require('react');
const ReactNative = require('react-native');
import Button from "react-native-button";

    const {
  LayoutAnimation,
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  UIManager
} = ReactNative;

var {
  height: deviceHeight
} = Dimensions.get("window");

export default class AnimationTest extends React.Component{
    constructor(){
        super(); 
        this.state = {
            viewStyle: {
                height: 5
            }
        }

        if (Platform.OS === 'android') {  // enables layout animation for android
            UIManager.setLayoutAnimationEnabledExperimental(true);

      
}
    }
    animateView(){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({
            viewStyle: {
                height: 250
            }
        })
    }

    componentWillMount(){
        this.animateView();
      //  Actions.error();
    }

    closeModal() {

        Actions.pop()
        // Animated.timing(this.state.viewStyle.height, {
        //     duration: 150
        // }).start(Actions.pop);
    }


    render(){
        let viewStyle = [styles.view, this.state.viewStyle]
        return(
            <View style={styles.container}>
            <Button onPress={this.closeModal.bind(this)}>Close</Button>
                <TouchableWithoutFeedback  onPress={this.animateView.bind(this)}>
                    <View style={viewStyle} >
                    </View>
                </TouchableWithoutFeedback>
                
            </View> 
        )
    }

}

var styles = StyleSheet.create({
    container:{
        flex: 1, 
        justifyContent: 'flex-end', 
        backgroundColor:"rgba(52,52,52,0.5)"
    },
    view: {
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'black', 
        margin: 1,
        
    },
    viewText: {
            color: 'white'
    },
});

// 'use strict';

// var React = require('react-native');
// var {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   LayoutAnimation,
// } = React;

// var App = React.createClass({
//   componentWillMount() {
//     // Animate creation
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
//   },

//   getInitialState() {
//     return { w: 100, h: 100 }
//   },

//   _onPress() {
//     // Animate the update
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
//     this.setState({w: this.state.w + 15, h: this.state.h + 15})
//   },

//   render: function() {
//     return (
//       <View style={styles.container}>
//         <View style={[styles.box, {width: this.state.w, height: this.state.h}]} />
//         <TouchableOpacity onPress={this._onPress}>
//           <View style={styles.button}>
//             <Text style={styles.buttonText}>Press me!</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// });

// var styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   box: {
//     backgroundColor: 'red',
//   },
//   button: {
//     marginTop: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: 'black',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// module.exports = App;