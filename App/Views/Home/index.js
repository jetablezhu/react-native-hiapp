import React from 'react'
import config from '@Config'
import { Button, Text, View } from 'react-native'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    ...config.defaultNavigation,
    title: 'Home',
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <Button
          title="Go to Message"
          onPress={() => this.props.navigation.navigate('Message')}
        />
        <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
      </View>
    )
  }
}
