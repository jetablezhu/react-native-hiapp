import React from 'react'
import Config from '@Config'
import configStore from '@Store'
import { Provider } from 'react-redux'
import { setI18nConfig } from '@Localize'
import * as RNLocalize from 'react-native-localize'

import AppContainer from './Navigator'

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
