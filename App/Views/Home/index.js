import React from 'react'
import config from '@Config'
import { Button, Text, View } from 'react-native'
import t from '@Localize'

export default class HomeScreen extends React.Component {
  static navigationOptions = _ => {
    return {
      ...config.defaultNavigation,
      title: t('home')
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{t('home')}</Text>
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
