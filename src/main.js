// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from './library/axios'

// 添加视频播放库
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.use(VideoPlayer)
Vue.config.productionTip = false

/* eslint-disable no-new */
// Vue是vue.js提供的一个构造函数,
new Vue({ // 配置对象,（属性名必须是指定的一些名称）
  el: '#app', // elelment, 选择器字符串， 表明将表面哪个元素交给Vue管理
  router,
  store, // 新加的
  components: { App },
  template: '<App/>'
})
