import React from 'react'
import { Text as RNText } from 'react-native'
import S from '../styles'

class Index extends React.Component {
  render () {
    return (
      <RNText
        {...this.props}
        style={[S.text, this.props.style]}
      >
        {this.props.children}
      </RNText>
    )
  }
}

export default Index
