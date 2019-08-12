const Skin = {
  mainColor: '#ff9800',
  viewsBackgroundColor: '#eef0f3'
}

const App = {
  devBaseUrl: 'https://raw.githubusercontent.com/BelinChung/api-mock/master/HiApp',
  prodBaseUrl: 'http://jetable.tpddns.cn:8080/hiapp',
  defaultNavigation: {
    headerStyle: {
      backgroundColor: Skin.mainColor,
    },
    headerTintColor: '#fff'
  }
}

export default {
  ...App,
  ...Skin
}
