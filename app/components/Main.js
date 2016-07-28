let React = require('react-native')
let {
  StyleSheet,
  View,
} = React
import {connect} from 'react-redux/native'
import {fetchTableIfNeeded} from '../actions/documentlists'
import Documents from './Documents'

class Main extends React.Component {
  constructor (props) {
    super(props)

  }

  renderContent () {
    const { env, sessionToken, fId, documentlist } = this.props
  
    return (
      <Documents
        {...this.props}
        scrollFunc={fetchTableIfNeeded.bind(null, env, sessionToken, documentlist)} />
    )
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderContent()}
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
})


export default Main
