import React from 'react'
import HomeScreen from '@Views/Home'
import MessageScreen from '@Views/Message'
import SettingsScreen from '@Views/Settings'
import Icon from '@Components/Icon'
import Config from '@Config'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen, }
})
const MessageStack = createStackNavigator({
  Message: { screen: MessageScreen }
})
const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen }
})

export default createAppContainer(createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Message: { screen: MessageStack },
    Settings: { screen: SettingsStack }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === 'Home') {
          iconName = `ios7home${focused ? '' : 'outline'}`
        } else if (routeName === 'Message') {
          iconName = `ios7chatbubble${focused ? '' : 'outline'}`
        } else if (routeName === 'Settings') {
          iconName = `ios7gear${focused ? '' : 'outline'}`
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
