import React, {View, StyleSheet, Platform, ProgressBarAndroid, ActivityIndicatorIOS} from "react-native";

var styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a9a9a9',
    height: 56,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    height: 50,
    padding: 0,
    backgroundColor: 'transparent'
  },
  spinner: {
    width: 30,
    height: 30,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
});

export default class extends React.Component {
    
    render(){
        
        if (Platform.OS === 'ios') 
            return (
               <ActivityIndicatorIOS
                animating={this.props.isLoading}
                style={styles.spinner}
                />
            );
         else{
             if (this.props.isLoading) {
                  return (
                        <ProgressBarAndroid
                            styleAttr="Large"
                            style={styles.spinner}
                            />
                  )
             }
             else{
                  return (
                        <View style={styles.spinner} />
                  )
             }

         }
    }
}
