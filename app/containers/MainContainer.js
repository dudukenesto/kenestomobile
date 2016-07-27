import React from 'react-native'
let {
  View,
  Component
} = React
import {connect} from 'react-redux/native'

import Main from '../components/Main'

class MainContainer extends Component {
  render() {
    return (
      <Main {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  const { documentlist, documentlists } = state
  
  return {
    documentlist,
    documentlists,
  }
}

export default connect(mapStateToProps)(MainContainer)
