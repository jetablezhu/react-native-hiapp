import React from 'react'
import connect from 'redux-connect-decorator'
import config from '@Config'
import t from '@Localize'
import { Button, Text, View } from 'react-native'
import { fetchUserInfo } from '@Store/Actions'

@connect(state => ({
  //
}), {
  fetchUserInfo
})

export default class HomeScreen extends React.Component {
  static navigationOptions = _ => {
    return {
      ...config.defaultNavigation,
      title: t('global.home')
    }
  }

  componentDidMount() {
    this.props.fetchUserInfo()
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{t('global.home')}</Text>
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
