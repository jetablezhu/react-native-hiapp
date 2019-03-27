import React from 'react'
import Config from '@Config'
import configStore from '@Store'
import styles from '@Styles'
import { Provider } from 'react-redux'
import { setI18nConfig } from '@Localize'
import * as RNLocalize from 'react-native-localize'

import {
  SafeAreaView,
  StyleSheet
} from 'react-native'

import AppContainer from './Navigator'

const store = configStore()

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isTranslationLoaded: false,
    }
    setI18nConfig()
      .then(() => {
        this.setState({ isTranslationLoaded: true })
        RNLocalize.addEventListener('change', this.handleLocalizationChange)
      })
      .catch(error => {
        console.error(error)
      })
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange)
  }

  handleLocalizationChange = () => {
    setI18nConfig()
      .then(() => this.forceUpdate())
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    if (!this.state.isTranslationLoaded) {
      return <SafeAreaView style={viewStyles.safeArea} />
    }
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

const viewStyles = StyleSheet.create({
  safeArea: {
    ...styles.container
  }
})
