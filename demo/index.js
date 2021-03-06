import React from 'react'
import {
  View
} from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { Util, Cells, Cell, CellBody, CellFooter } from '../src'
import _ from 'lodash'

console.disableYellowBox = true

const { importComponent } = Util

const pages = {
  button: import('./pages/button')
}

_.forEach(pages, (v, k) => {
  pages[k] = {
    screen: importComponent(() => v)
  }
})

class Home extends React.Component {
  handlePress = (page) => {
    this.props.navigation.navigate(page)
  }

  render () {
    return (
      <View>
        <Cells>
          {_.map(pages, (v, k) =>
            <Cell key={k} access onPress={this.handlePress.bind(this, k)}>
              <CellBody>{k}</CellBody>
              <CellFooter/>
            </Cell>
          )}
        </Cells>
      </View>
    )
  }
}

const Navigator = createStackNavigator({
  home: {
    screen: Home
  },
  ...pages
}, {
  initialRouteName: 'home'
})

class App extends React.Component {
  render () {
    return (
      <View style={{ flex: 1 }}>
        <Navigator/>
      </View>
    )
  }
}

export default App
