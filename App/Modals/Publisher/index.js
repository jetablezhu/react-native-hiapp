import React from 'react'
import connect from 'redux-connect-decorator'
import config from '@Config'
import styles from '@Styles'
import t from '@Localize'
import Editor from '@Components/Editor'
import HeaderButton from '@Components/HeaderButton'
import { setModalVisibleStatus,addTimeLine,addComment } from '@Store/Actions'

import {
  View,
  Alert,
  StyleSheet
} from 'react-native'

import {
  Header
} from 'react-native-elements'

@connect(state => ({
  modal: state.app.modalVisible,
  user:state.app.user,
  current:state.home.current
}), {
  setModalVisibleStatus,
  addTimeLine,
  addComment
})

export default class PublisherScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  render() {
    return (
      <View style={viewStyles.container}>
        <Header
          leftComponent={<HeaderButton text={t('global.close')} onPressButton={ this.closeModal.bind(this) }/>}
          centerComponent={{ text: this.props.modal.type===1?t('home.publisher'):t('home.comment'), style: styles.modalHeader.center }}
          rightComponent={<HeaderButton text={t('global.send')} onPressButton={ this.sendPost.bind(this) }/>}
          containerStyle={{
            backgroundColor: config.mainColor,
          }}
        />
        <Editor
          text={this.state.text}
          placeholder={t('home.publisherPlaceholder')}
          onChangeText={this.onChangeText.bind(this)}
        />
      </View>
    )
  }

  closeModal() {
    this.props.setModalVisibleStatus({
      name: 'publisher',
      status: false
    })
  }

  sendPost() {
    if(this.props.modal.type===1)
    {
      this.props.addTimeLine({
        "nickname": this.props.user.nick_name,
        "avatar": this.props.user.avatar,
        "text": this.state.text,
        "likeCount": 0,
        "commentCount": 0,
        "createdAt": new Date().getTime().toString()
      })
    }
    else{
        this.props.addComment({
          "avatar":this.props.user.avatar,
          "text":this.state.text,
          "time":new Date().getTime().toString(),
          "userId":this.props.user.id,
          "timelineId":this.props.current.id,
          "name":this.props.user.nick_name
        })
    }
    this.closeModal()
  }

  onChangeText(text) {
    this.setState({
      text
    })
  }
}

const viewStyles = StyleSheet.create({
  container: {
    ...styles.container,
  }
})
