import React from 'react'
import connect from 'redux-connect-decorator'
import moment from 'moment'
import config from '@Config'
import styles from '@Styles'
import t from '@Localize'
import HeaderButton from '@Components/HeaderButton'
import { fetchUserInfo, setModalVisibleStatus,fetchTimeLine,addLike,setCurrentTimeline } from '@Store/Actions'
import { getRemoteAvatar } from '@Utils'
import Icon from '@Components/Icon'

import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableHighlight
} from 'react-native'

import {
  ListItem
} from 'react-native-elements'

@connect(state => ({
  timeline:state.home.timeline
}), {
  setModalVisibleStatus,
  fetchUserInfo,
  fetchTimeLine,
  addLike,
  setCurrentTimeline
})
export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    const onPressRightButtonFunc = params.openPublisher || function() {}
    return {
      ...config.defaultNavigation,
      title: t('global.home'),
      headerRight: (
        <HeaderButton
          isIcon
          text='feedback'
          onPressButton={ onPressRightButtonFunc }/>
      )
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false
    }
  }

  componentWillMount () {
    this.props.navigation.setParams({ openPublisher: () => this.openPublisher() })
  }

  componentDidMount() {
    this.setState({
      refreshing: true
    })
    this.props.fetchUserInfo()
    this.props.fetchTimeLine().then(()=>{
      this.setState({
        refreshing:false
      })
    })
  }

  keyExtractor = (item, index) => item.id.toString()

  addLike(topicId){
    this.props.addLike(topicId)
  }

  toDetail(timeline){
    this.props.setCurrentTimeline(timeline)
    this.props.navigation.navigate('Detail')
  }

  renderItem = ({ item }) => {
    return (
      <View style={viewStyles.listContainer}>
        <TouchableHighlight onPress={_ =>this.toDetail(item)}>
          <View>
            <ListItem
              containerStyle={viewStyles.listItem}
              subtitleStyle={viewStyles.subtitleStyle}
              titleStyle={viewStyles.titleStyle}
              leftAvatar={{ source: { uri: getRemoteAvatar(item.avatar) }}}
              title={item.nickname}
              subtitle={moment(Number(item.createdAt)).fromNow()}
            />
            <View style={viewStyles.content}>
              <Text style={viewStyles.contentText}>
                {item.text}
              </Text>
              {
                item.originalPic?
                  <Image style={viewStyles.pic} resizeMode={"cover"} source={{uri:item.originalPic}} />:null
              }
            </View>
          </View>
        </TouchableHighlight>
        <View style={viewStyles.listBottom}>
          <TouchableHighlight style={{flex:1}} underlayColor='transparent' onPress={_ =>this.toDetail(item)}>
            <View style={viewStyles.listBottomLeft}>
              <Icon style={viewStyles.icon} name={"comment"}/>
              <Text style={viewStyles.num}>{item.commentCount?item.commentCount:t("home.comment")}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={{flex:1}} underlayColor='transparent' onPress={_ =>this.addLike(item.id)}>
            <View style={viewStyles.listBottomRight}>
              <Icon style={viewStyles.icon} name={"like"}/>
              <Text style={viewStyles.num}>{item.likeCount?item.likeCount:t("home.like")}</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  render() {
    return (
      <FlatList
        style={viewStyles.container}
        // contentContainerStyle={}
        keyExtractor={this.keyExtractor}
        data={this.props.timeline}
        renderItem={this.renderItem}
        onRefresh={ () => null }
        refreshing={this.state.refreshing}
      />
    )
  }

  openPublisher() {
    this.props.setModalVisibleStatus({
      name: 'publisher',
      status: true,
      type:1
    })
  }
}

const viewStyles = StyleSheet.create({
  container: {
    ...styles.container,
  },
  listContainer:{
    flex:1,
    marginBottom:15,
  }, 
  listItem: {
    paddingTop: 8,
    paddingBottom: 8
  },
  titleStyle:{
    fontSize: 16,
    color: '#ff9800'
  },
  subtitleStyle: {
    fontSize: 14,
    color: '#d0d0d0'
  },
  content:{
    backgroundColor:"#fff",
    paddingHorizontal:15,
    paddingBottom:10
  },
  contentText:{
    fontSize:15,
    lineHeight:25
  },
  pic:{
    width:300,
    height:100
  },
  listBottom:{
    flexDirection:"row",
    justifyContent: "space-between",
    height:40,
    borderWidth:1,
    borderColor:"#d0d0d0",
    backgroundColor:"#fff"
  },
  listBottomLeft:{
    flex:1,
    alignItems:"center",
    justifyContent: "center",
    flexDirection:"row",
    borderRightWidth:1,
    borderColor:"#d0d0d0"
  },
  listBottomRight:{
    flex:1,
    alignItems:"center",
    flexDirection:"row",
    justifyContent: "center",
  },
  num:{
    fontSize:13,
    color:"#363636",
    paddingHorizontal:5
  },
  icon:{
    fontSize:16,
    color:"#363636"
  },
})
