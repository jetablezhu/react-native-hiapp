const Skin = {
  mainColor: '#ff9800',
  viewsBackgroundColor: '#eef0f3'
}

const App = {
  devBaseUrl: 'https://raw.githubusercontent.com/BelinChung/api-mock/master/HiApp',
  prodBaseUrl: 'https://www.shaleba.top/hiapp',
  defaultNavigation: {
    headerStyle: {
      backgroundColor: Skin.mainColor
    },
    headerTitleStyle: { 
      textAlign:"center", 
      flex:1
    },
    headerTintColor: '#fff'
  }
}

export default {
  ...App,
  ...Skin
}
