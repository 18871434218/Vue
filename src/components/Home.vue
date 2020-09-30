<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <!--添加子路由 导航-->
        <p>
            <router-link to="/home">首页</router-link> |
            <router-link to="/home/one">子页面1</router-link> |
            <router-link to="/home/two">子页面2</router-link>|
            <router-link :to="{name: 'Third', params: {username: 'test123', password: '12334'}}">子页面3</router-link> |
            <router-link to="/home/Four/1/东东">子页面4</router-link> |
            <button @click="toFivePage">页面5-params传参</button> |
            <button @click="toSixPage">子页面6-params传参</button> |
            <router-link to="/Seven">子页面7</router-link>|
            <router-link to="/Eight">子页面8容器设置</router-link>|
            <router-link to="/Login">登陆界面</router-link>|<br>
            <router-link to="/VueTest">Vue用法测试</router-link> |
            <router-link to="/VueEight">VueEight用法测试</router-link> |
            <router-link to="/VueTen">VueTen事件测试</router-link> |
        </p>
        <!--子页面展示部分-->
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data () {
        return {
            msg: 'Home page!'
        }
    },
    methods: {
           toFivePage() {
               this.$router.push({name: 'Five', params: {id: 5, name: 'zhangsan5yemian'}})
           },
           toSixPage() {
               this.$router.push({path: '/home/Six', query: {id: 6, name: 'dongdong6yemain'}})
            //    this.$router.push({name: 'Six', query: {id: 6, name: 'dongdong6yemain'}})
           }
           /* toSevenPage() {
               this.$router.push({name: 'Seven'})
           } */
    }
}
</script>

<style scoped>

</style>
