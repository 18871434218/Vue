import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import One from '@/components/One'
import Two from '@/components/Two'
import Third from '@/components/Third'
import Four from '@/components/Four'
import Five from '@/components/Five'
import Six from '@/components/Six'
import Seven from '@/components/Seven'
import Eight from '@/components/Eight'
import VueTen from '@/components/VueTen'
import Login from '@/components/Login'
import VueTest from '@/components/VueTest'
import VueEight from '@/components/VueEight'
import remoteVideo from '@/components/agron/remoteVideo'
import CarMintor from '@/components/CarMonter/CarMintor'
import testVideo from '@/components/CarMonter/testVideo'
import RTSP from '@/components/CarMonter/RTSP'
import TestgetDevice from '@/components/CarMonter/TestgetDevice'

import boundaryGap from '@/components/Echart/boundaryGap'
import Echartbar from '@/components/Echart/Echartbar'
import publish from '@/components/Car/publish.vue'
import mammoth from '@/components/plugin/mammoth.vue'
import acVuex from '@/components/Vue/acVuex.vue'
import filetrTable from '@/components/testElement/filetrTable.vue'
import basicTable from '@/components/VXETable/basicTable.vue'

import objectCircleLog from '@/components/projectTest/objectCircleLog.vue'

// 函数功能测试
import Time from '@/components/TestFunction/Time.vue' // 倒计时提示
import objfor from '@/components/TestFunction/objfor.vue' // 对象循环

// Vue属性
import Vue$Data from '@/components/TestFunction/Vue$Data' // 测试Vue.$data属性

// element-ui组件标签
import InfiniteScroll from '@/components/ElementUI/InfiniteScroll.vue' // 无线滚动标签
import Card from '@/components/ElementUI/Card.vue' // 卡片容器
import Timeline from '@/components/ElementUI/Timeline.vue' // 时间线
import Steps from '@/components/ElementUI/Steps.vue' // 步骤条
import DropDown from '@/components/ElementUI/DropDown.vue' // 下拉菜单
import InputNumber from '@/components/ElementUI/InputNumber.vue' // 计数器
import Select from '@/components/ElementUI/Select' // 选择器
import lnput from '@/components/ElementUI/Input' // 输入框
import table from '@/components/ElementUI/table.vue' // 表格
import eltableTemplate from '@/components/ElementUI/eltableTemplate.vue' // 表格slot插入内容属性
import Form from '@/components/ElementUI/Form.vue' // 表单
import Upload from '@/components/ElementUI/Upload.vue' // 上传文件
import Tabs from '@/components/ElementUI/Tabs.vue' // 标签页
import Dialog from '@/components/ElementUI/Dialog.vue' // 弹出对话框
import Cascader from '@/components/ElementUI/Cascader.vue'

// Layer UI
import container from '@/components/UI/Layout/container'
import elrow from '@/components/UI/Layout/elrow'

import two from '@/components/3D/two'
import three from '@/components/3D/three'
import fours from '@/components/3D/four'
import fives from '@/components/3D/five'
import threeee from '@/components/3D/threeee'

import testTask from '@/components/backTask/testTask'
import testToCarcheck from '@/components/backTask/testToCarcheck'

// xe-utils插件
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

// element-ui插件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/* import {button, select} from 'element-ui' */

Vue.use(Router)
Vue.use(ElementUI)
Vue.use(VXETable)
/* Vue.use(button, select) */

export default new Router({
  mode: 'history', // 在显示页面地址栏上删除#号
  routes: [
    {
      path: '/',
      redirect: '/testToCarcheck'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'one',
          component: One
        },
        {
          path: 'Two',
          component: Two
        },
        {
          path: 'Third',
          name: 'Third',
          component: Third
        },
        {
          path: '/home/Four/:id/:name', // url中传参
          name: 'Four',
          component: Four
        },
        {
          path: '/home/Five/:id/:name', // 编程式传参
          name: 'Five',
          component: Five
        },
        {
          path: '/home/Six', // 子页面6
          name: 'Six',
          component: Six
        }
      ]
    },
    { // 测试vue.$data属性
      path: '/Vue$Data',
      name: 'Vue$Data',
      component: Vue$Data
   },
    {
      path: '/Seven', // 子页面7
      name: 'Seven',
      component: Seven
    },
    {
      path: '/Eight', // 子页面8
      name: 'Eight',
      component: Eight
    },
    {
      path: '/Login', // 子页面8
      name: 'Login',
      component: Login
    },
    {
      path: '/VueTest', // 测试小功能
      name: 'VueTest',
      component: VueTest
    },
    {
      path: '/VueEight', // 测试
      name: 'VueEight',
      component: VueEight
    },
    {
      path: '/VueTen',
      name: 'VueTen',
      component: VueTen
    },
    {
       path: '/remoteVideo',
       name: 'remoteVideo',
       component: remoteVideo
    },
    {
       path: '/RTSP',
       name: 'RTSP',
       component: RTSP
    },
    {
       path: '/CarMintor',
       name: 'CarMintor',
       component: CarMintor
    },
    {
       path: '/testVideo',
       name: 'testVideo',
       component: testVideo
    },
    {
       path: '/TestgetDevice',
       name: 'TestgetDevice',
       component: TestgetDevice
    },
    {
      path: '/Time', // 倒计时提示
      name: 'Time',
      component: Time
    },
    {
       path: '/container', // 容器区域划分
       name: 'container',
       component: container
    },
    {
       path: '/elrow', // 行划分区域
       name: 'elrow',
       component: elrow
    },
    {
       path: '/Cascader',
       name: 'Cascader',
       component: Cascader
    },
    {
       path: '/boundaryGap',
       name: 'boundaryGap',
       component: boundaryGap
    },
    {
       path: '/Echartbar',
       name: 'Echartbar',
       component: Echartbar
    }, {
       path: '/publish',
       name: 'publish',
       component: publish
    },
    {
      path: '/objfor',
      name: 'objfor',
      component: objfor
    },
    {
      path: '/mammoth',
      name: 'mammoth',
      component: mammoth
    },
    {
      path: '/acVuex',
      name: 'acVuex',
      component: acVuex
    },
    {
      path: '/filetrTable',
      name: 'filetrTable',
      component: filetrTable
    },
    {
      path: '/basicTable',
      name: 'basicTable',
      component: basicTable
    },
    {
      path: '/objectCircleLog',
      name: 'objectCircleLog',
      component: objectCircleLog
    },
    {
      path: '/InfiniteScroll', // 无线滚动
      name: 'InfiniteScroll',
      component: InfiniteScroll
    },
    {
      path: '/Card', // 卡片容器
      name: 'Card',
      component: Card
    },
    {
      path: '/Timeline', // 时间线
      name: 'Timeline',
      component: Timeline
    },
    {
      path: '/Steps', // 步骤条
      name: 'Steps',
      component: Steps
    },
    {
      path: '/DropDown', // 下拉菜单
      name: 'DropDown',
      component: DropDown
    },
    {
      path: '/InputNumber', // 技术器
      name: 'InputNumber',
      component: InputNumber
    },
    {
      path: '/Select', // 选择器
      name: 'Select',
      component: Select
    },
    {
      path: '/lnput', // 输入框
      name: 'lnput',
      component: lnput
    },
    {
      path: '/table', // 表格
      name: 'table',
      component: table
    },
    {
      path: '/eltableTemplate', // 表格slot属性  插入内容
      name: 'eltableTemplate',
      component: eltableTemplate
    },
    {
      path: '/Form', // 表单
      name: 'Form',
      component: Form
    },
    {
      path: '/Upload', // 上传
      name: 'Upload',
      component: Upload
    },
    {
      path: '/Tabs', // tabs标签页
      name: 'Tabs',
      component: Tabs
    },
    {
      path: '/Dialog', // 对话框
      name: 'Dialog',
      component: Dialog
    },
    {
      path: '/two', // 对话框
      name: 'two',
      component: two
    },
    {
      path: '/three', // 对话框
      name: 'three',
      component: three
    },
    {
      path: '/fours', // 对话框
      name: 'fours',
      component: fours
    },
    {
      path: '/fives', // 对话框
      name: 'fives',
      component: fives
    },
    {
      path: '/threeee', // 对话框
      name: 'threeee',
      component: threeee
    },
    {
      path: '/testTask', // 对话框
      name: 'testTask',
      component: testTask
    },
    {
      path: '/testToCarcheck',
      name: 'testToCarcheck',
      component: testToCarcheck
    }
  ]
})
