/**
 * This is the example from react-native-gifted-chat
 * If you have any questions, please read the project document first or open an issue on Github
 * https://github.com/FaridSafi/react-native-gifted-chat
 */

import React from 'react'
import connect from 'redux-connect-decorator'
import config from '@Config'
import t from '@Localize'

import {
  GiftedChat,
  Actions,
  Bubble,
  SystemMessage
} from 'react-native-gifted-chat'

import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView
} from 'react-native'

@connect(state => ({
  user: state.app.user
}))
export default class MessageScreen extends React.Component {
  static navigationOptions = ({
    navigation
  }) => {
    const {
      params = {}
    } = navigation.state
    return {
      ...config.defaultNavigation,
      title: params.user.nick_name,
      headerRight:(<View style={{padding:0}}></View>)
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false
    }

    this._isMounted = false
    this.onSend = this.onSend.bind(this)
    this.onReceive = this.onReceive.bind(this)
    this.renderBubble = this.renderBubble.bind(this)
    this.renderSystemMessage = this.renderSystemMessage.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.onLoadEarlier = this.onLoadEarlier.bind(this)

    this._isAlright = null
  }
  componentWillMount() {
    this._isMounted = true
    this.setState(() => {
      return {
        messages: require('./mock/messages.js')
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  onLoadEarlier() {
    this.setState(previousState => {
      return {
        isLoadingEarlier: true
      }
    })

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState(previousState => {
          return {
            messages: GiftedChat.prepend(
              previousState.messages,
              require('./mock/old_messages.js')
            ),
            loadEarlier: false,
            isLoadingEarlier: false
          }
        })
      }
    }, 1000) // simulating network
  }

  onSend(messages = []) {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      }
    })

    // for demo purpose
    this.answerDemo(messages)
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      // if (messages[0].image || messages[0].location || !this._isAlright) {
        this.setState(previousState => {
          return {
            typingText: 'React Native is typing'
          }
        })
      // }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive('Nice picture!')
          } else if (messages[0].location) {
            this.onReceive('My favorite place')
          } else {
            // if (!this._isAlright) {
              this._isAlright = true
              this.onReceive('Alright')
            // }
          }
        }
      }
      
    }, 3000)
  }

  onReceive(text) {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native'
            // avatar: 'https://facebook.github.io/react/img/logo_og.png',
          }
        }),
        typingText:null
      }
    })
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#85ff00'
          }
        }}
      />
    )
  }

  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15
        }}
        textStyle={{
          fontSize: 14
        }}
      />
    )
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{this.state.typingText}</Text>
        </View>
      )
    }
    return null
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          loadEarlier={this.state.loadEarlier}
          onLoadEarlier={this.onLoadEarlier}
          isLoadingEarlier={this.state.isLoadingEarlier}
          user={{_id:1}}
          showUserAvatar={true}
          renderBubble={this.renderBubble}
          renderSystemMessage={this.renderSystemMessage}
          renderFooter={this.renderFooter}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  footerText: {
    fontSize: 14,
    color: '#aaa'
  }
})