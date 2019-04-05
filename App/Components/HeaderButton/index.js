import React from 'react'
import PropTypes from 'prop-types'

import {
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

export default class HeaderButton extends React.Component {
  render() {
    const { text, onPressButton, ...props } = this.props
    return (
      <TouchableHighlight underlayColor='transparent' style={styles.container} onPress={() => onPressButton() }>
        <Text style={styles.text}>{text}</Text>
      </TouchableHighlight>
    )
  }
}

HeaderButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPressButton: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    width: 76,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 17,
    color: '#fff'
  }
})
