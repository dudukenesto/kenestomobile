import React from 'react-native'

let {
  StyleSheet,
} = React

import MainContainer from './MainContainer'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <MainContainer {...this.props} />
    )
  }
}

let styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
})

export default App
