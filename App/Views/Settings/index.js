import React from 'react'
import config from '@Config'
import { Button, Text, View } from 'react-native'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    ...config.defaultNavigation,
    title: 'Settings',
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>settings!</Text>
      </View>
    )
  }
}
