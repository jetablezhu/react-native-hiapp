import React from 'react'
import connect from 'redux-connect-decorator'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
import config from '@Config'
import styles from '@Styles'
import t from '@Localize'
import { fetchComment,setModalVisibleStatus,addLike } from '@Store/Actions'
import { getRemoteAvatar } from '@Utils'
import {Icon as MyIcon} from '@Components/Icon'

import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  SafeAreaView,
  TouchableHighlight
} from 'react-native'

import {
  ListItem
} from 'react-native-elements'

@connect(state=>({
	timeline:state.home.timeline,
	comment:state.comment.comment,
	current:state.home.current
}),{
	fetchComment,
	setModalVisibleStatus,
	addLike
})
export default class DetailScreen extends React.Component{
	static navigationOptions = ({navigation})=>{
		return {
			...config.defaultNavigation,
			title: t('home.detail'),
	    headerRight:(<View style={{padding:0}}></View>)
		}
	}

	constructor(props) {
	  super(props);
	  this.state = {
			refreshing:true
	  };
	}

	componentDidMount() {
		this.setState({
      refreshing: true
    })
		this.props.fetchComment(this.props.current.id).then(()=>{
			this.setState({
				refreshing:false
			})
		})
	}

	keyExtractor=(item,index)=>item.id.toString()
	
	addLike(){
		this.props.addLike(this.props.current.id)
	}

	renderItem=({item})=>{
		return (
			<View style={viewStyles.commentListContainer}>
				<ListItem
					topDivider
		      containerStyle={viewStyles.listItem}
		      subtitleStyle={viewStyles.subtitleStyle}
		      titleStyle={viewStyles.titleStyle}
		      leftAvatar={{ source: { uri: getRemoteAvatar(item.avatar) }}}
		      title={item.name?item.name:t('home.noname')}
		      subtitle={moment(Number(item.time)).fromNow()}
		      onPress={_ => { /*this.props.navigation.navigate('Message', { user: item }) */}}
	      />
	      <View style={viewStyles.commentContent}>
		      <Text style={viewStyles.contentText}>{item.text}</Text>
		    </View>
	  	</View>
    )
	}

	writeComment(){
		this.props.setModalVisibleStatus({
			name: 'publisher',
      status: true,
      type:2
		})
	}

	render(){
		return (
			<SafeAreaView style={viewStyles.container}>
				<View style={viewStyles.listContainer}>
	        <View>
	          <ListItem
	            containerStyle={viewStyles.listItem}
	            subtitleStyle={viewStyles.subtitleStyle}
	            titleStyle={viewStyles.titleStyle}
	            leftAvatar={{ source: { uri: getRemoteAvatar(this.props.current.avatar) }}}
	            title={this.props.current.nickname}
	            subtitle={moment(Number(this.props.current.createdAt)).fromNow()}
	            onPress={_ => { /*this.props.navigation.navigate('Message', { user: item }) */}}
	          />
	          <View style={viewStyles.content}>
	            <Text style={viewStyles.contentText}>
	              {this.props.current.text}
	            </Text>
	            {
	              this.props.current.original_pic?
	                <Image style={viewStyles.pic} source={{uri:this.props.current.original_pic}} />:null
	            }
	          </View>
	        </View>
	      </View>
	      <View style={viewStyles.comment}>
	      	<View style={viewStyles.commentBegin}>
		      	<Text>{t("home.comment")}</Text>
		      </View>
	      {
	      	this.props.comment && this.props.comment.length?
	      		<FlatList
		        // contentContainerStyle={}
		        keyExtractor={this.keyExtractor}
		        data={this.props.comment}
		        renderItem={this.renderItem}
		        onRefresh={ () => this.setState({refreshing:false}) }
		        refreshing={this.state.refreshing}
		      	/>
		      	:
			      <View style={viewStyles.emptyComment}>
			      	<Icon name="md-sad" size={30}/>
			      	<Text>{t("home.nocomment")}</Text>
			      </View>
	      } 
		    </View>
	      <View style={viewStyles.listBottom}>
	      	<TouchableHighlight style={{flex:1}} underlayColor='transparent' onPress={this.writeComment.bind(this)}>
	          <View style={viewStyles.listBottomLeft}>
	            <MyIcon style={viewStyles.icon} name={"comment"}/>
	            <Text style={viewStyles.num}>{this.props.current.commentCount?this.props.current.commentCount:t("home.comment")}</Text>
	          </View>
	        </TouchableHighlight>
	        <TouchableHighlight style={{flex:1}} underlayColor='transparent' onPress={this.addLike.bind(this)}>
	          <View style={viewStyles.listBottomRight}>
	            <MyIcon style={viewStyles.icon} name={"like"}/>
	            <Text style={viewStyles.num}>{this.props.current.likeCount?this.props.current.likeCount:t("home.like")}</Text>
	          </View>
	        </TouchableHighlight>
	      </View>
		  </SafeAreaView>
		)
	}
}

const viewStyles = StyleSheet.create({
  container: {
    ...styles.container,
  },
  listContainer:{
    marginBottom:15,
    backgroundColor:"#fff"
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
    color: '#d0d0d0',
    marginTop:8
  },
  content:{
    paddingHorizontal:15,
    paddingBottom:10
  },
  contentText:{
    fontSize:15,
    lineHeight:25
  },
  pic:{
    width:200
  },
  commentBegin:{
  	paddingVertical:10,
  	paddingLeft:10,
  	borderBottomWidth:1,
  	borderColor:"#d0d0d0"
  },
  comment:{
  	flex:1,
  	backgroundColor:"#fff"
  },
  emptyComment:{
		fontSize:14,
		alignItems:'center',
		justifyContent:'center',
		minHeight:100
  },
  commentListContainer:{
    backgroundColor:"#fff"
  },
  commentContent:{
  	paddingRight:15,
  	paddingLeft:70,
    paddingBottom:10
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