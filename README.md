## 完善内容
1. 作者BelinChung的版本中没有实现首页和正文、评论列表的展示，可能是为了与商用的考虑删减了吧。这里补全了这部分功能，也增加了发布新动态的功能。
2. 首页数据、联系人、个人信息、评论数据都以本地json文件方式模拟，不需要网络，avatar还是走网络。
3. 聊天界面，自动回复不限制次数，并且修复了对方打字状态隐藏不正确的bug
4. 使用moment显示了动态发布时间距现在多久
5. 补全中文多语种配置
## TODO
1. 发表评论功能（其实与发布新动态没啥区别）
2. 点赞数据的正确保存
# react-native-hiapp
[HiApp](https://github.com/BelinChung/HiApp) written in react-native.

## Previews

[![preview](https://github.com/jetablezhu/mockfile/blob/master/hiapp_demo.gif)]

## Requirements

[React Native](http://facebook.github.io/react-native/docs/getting-started.html) `0.59.1` (follow iOS and Android guides)

## Setup

[VSCode extension for React Native](https://github.com/Microsoft/vscode-react-native) provides a development environment for React Native projects. You can debug your code, quickly run react-native commands from the command palette and use IntelliSense to browse objects, functions and parameters for React Native APIs.

1. **Clone the repo**

  ```
  $ git clone https://github.com/BelinChung/react-native-hiapp.git
  $ cd react-native-hiapp
  ```

2. **Install dependencies** :

  ```
  $ yarn
  ```

3. **Start Packager:**

  ```
  $ yarn start
  ```

4. **Running on iOS:**

  ```
  $ react-native run-ios
  ```
  
5. **Running on Android**:

  ```
  $ react-native run-android
  ```

## License

Copyright (c) 2016 - 2019 Belin Chung. MIT Licensed, see [LICENSE](https://github.com/BelinChung/react-native-hiapp/blob/master/LICENSE) for details.
