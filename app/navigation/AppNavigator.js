'use strict'
import React, { Component, Navigator, Text } from 'react-native'
import LoginScreen from '../screens/LoginScreen'
import DocumentScreen from '../screens/DocumentScreen'
import DocumentsScreen from '../screens/DocumentsScreen'

class AppNavigator extends Component {

  _renderScene(route, navigator) {
    var globalNavigatorProps = { navigator }

    switch(route.ident) {
      case "LoginScreen":
        return (
          <LoginScreen
            {...globalNavigatorProps} />
        )

      case "DocumentScreen":
        return (
          <DocumentScreen
            {...globalNavigatorProps}/>
        )
      case "DocumentsScreen":
        return (
          <DocumentsScreen
            {...globalNavigatorProps}/>
        )

      default:
        return (
          <Text>{`YO YOU MESSED SOMETHING UP ${route}`}</Text>
        )
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={this.props.initialRoute}
        ref="appNavigator"
        style={styles.navigatorStyles}
        renderScene={this._renderScene}
        configureScene={(route) => ({
          ...route.sceneConfig || Navigator.SceneConfigs.FloatFromRight })} />
    )
  }

}

const styles = React.StyleSheet.create({

  navigatorStyles: {

  }

})

module.exports = AppNavigator
