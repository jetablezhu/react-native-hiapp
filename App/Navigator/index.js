import React from 'react'
import config from '@Config'
import t from '@Localize'
import { Text } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'

import Icon from '@Components/Icon'
import HomeScreen from '@Views/Home'
import MessageScreen from '@Views/Message'
import SettingsScreen from '@Views/Settings'
import AboutScreen from '@Views/About'

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen, }
})
const MessageStack = createStackNavigator({
  Message: { screen: MessageScreen }
})
const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen },
})

const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Message: { screen: MessageStack },
    Settings: { screen: SettingsStack }
  },
  {
    navigationOptions: () => ({
      header: null
    }),
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
      activeTintColor: config.mainColor,
      inactiveTintColor: 'gray',
    }
  }
)

const AppStack = createStackNavigator({
  Tabs: TabNavigator,
  About: { screen: AboutScreen }
}, {
  defaultNavigationOptions: () => ({
    ...config.defaultNavigation
  })
})

export default createAppContainer(AppStack)
