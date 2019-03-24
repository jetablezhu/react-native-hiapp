import React from 'react'
import config from '@Config'
import { Button, Text, View } from 'react-native'
import t from '@Localize'

export default class HomeScreen extends React.Component {
  static navigationOptions = _ => {
    return {
      ...config.defaultNavigation,
      title: t('message'),
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>message!</Text>
      </View>
    )
  }
}
