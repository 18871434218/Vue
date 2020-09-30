<template>
    <div>
        <!-- v开头都是vue的特殊指令，v-bind是单项数据绑定 -->
        <span v-bind:title="message">单项绑定数据，鼠标悬停显示数据</span>
        <input type="text" v-bind:value="message"><br>
        <!-- v-model双向数据绑定 -->
        <span v-bind:title="doubleMessage">单项绑定数据，鼠标悬停显示数据</span>
        <input type="text" v-model="doubleMessage"><br>
        <!-- 点击事件传数 -->
        <button v-on:click="zhe">点击</button><br>
        <h1 v-if="type==='L'">L</h1>
        <h1 v-else-if="type==='XL'">XL</h1>
        <h1 v-else-if="type==='XXL'">XXL</h1>
        <h1 v-else>XXL</h1><br>

        <div v-cloak>{{displayVue}}</div>
    </div>
</template>

<script>
export default {
    name: 'VueTest',
    data () {
        return {
            message: '啊哈哈哈哈',
            doubleMessage: '双向数据绑定',
            type: 'L',
            items: ['大？', '加大', '加加大'],
            displayVue: 'displayVue'
        }
    },
    methods: {
        zhe() {
            alert(this.message)
        }
    }
}
</script>
<style>
  [v-cloak] {
   display: none;
  }
</style>