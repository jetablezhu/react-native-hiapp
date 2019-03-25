import React from 'react'
import Config from '@Config'
import configStore from '@Store'
import { Provider } from 'react-redux'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import t, { setI18nConfig } from '@Localize'
import { Text } from 'react-native'
import * as RNLocalize from 'react-native-localize'

import Icon from '@Components/Icon'
import HomeScreen from '@Views/Home'
import MessageScreen from '@Views/Message'
import SettingsScreen from '@Views/Settings'

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen, }
})
const MessageStack = createStackNavigator({
  Message: { screen: MessageScreen }
})
const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen }
})

const AppContainer = createAppContainer(createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Message: { screen: MessageStack },
    Settings: { screen: SettingsStack }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarLabel: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        switch (routeName) {
          case 'Home':
            return <Text style={{ color: tintColor, fontSize: 12 }}>{t('global.home')}</Text>
          case 'Message':
            return <Text style={{ color: tintColor, fontSize: 12 }}>{t('global.message')}</Text>
          case 'Settings':
            return <Text style={{ color: tintColor, fontSize: 12 }}>{t('global.settings')}</Text>
        }
      },
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        switch (routeName) {
          case 'Home':
            iconName = `ios7home${focused ? '' : 'outline'}`
            break
          case 'Message':
            iconName = `ios7chatbubble${focused ? '' : 'outline'}`
            break
          case 'Settings':
            iconName = `ios7gear${focused ? '' : 'outline'}`
            break
        }
        return <Icon name={iconName} size={26} color={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: Config.mainColor,
      inactiveTintColor: 'gray',
    }
  }
))

const store = configStore()

export default class App extends React.Component {
  constructor(props) {
    super(props)
    setI18nConfig()
  }

  componentDidMount() {
    RNLocalize.addEventListener('change', this.handleLocalizationChange)
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange)
  }

  handleLocalizationChange = () => {
    setI18nConfig()
    this.forceUpdate()
  }
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
