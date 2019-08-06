const Skin = {
  mainColor: '#ff9800',
  viewsBackgroundColor: '#eef0f3'
}

const App = {
  devBaseUrl: 'https://raw.githubusercontent.com/BelinChung/api-mock/master/HiApp',
  prodBaseUrl: 'http://localhost:8081/app/data/',
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
