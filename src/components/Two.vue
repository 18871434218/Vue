<template>
    <div class="hello">
        <!--  
            双大括号表示式：读取data中数据表示，（实际写js） （自己测试了v-text里面也可以写js表达式）字符必须引号，
            数据绑定与双向数据绑定
            数据绑定：数据在页面与内存中的变量自动转移
            双向数据绑定：如果可以俩个方向数据自动转移
        -->
        <h1>{{ msg }}</h1> 
        <h2>{{s2}}</h2>
        <h1>{{msg.toUpperCase()}}</h1> 
        <input type="text" v-model="name">
        <p>hello {{name.toUpperCase()}}</p>
        <p v-text="name.toUpperCase()"></p>    
        <p v-html="s1"></p>   <!-- 显示标签内容 -->
        <p v-text="s1"></p>   <!-- 直接显示内容 --><br><br>

        <h1>2: v-bind 强制数据绑定  将绑定名称转换为变量</h1>
        <img src="imgUrl">          
        <img v-bind:src="imgUrl">
        <img :src="imgUrl">  <br>   <!-- v-bind:src 简写   :src -->
       
        <h1>指令二：绑定事件监听</h1>
        <button v-on:click="test">test</button> 
        <button @click="test">test</button>
        <el-button @click="test">test</el-button>
        <button @click="test2(msg)">test2</button>
    
        <h1>3 指令2: 双向数据绑定</h1>
    </div>
</template>

<script>
export default {
    name: 'Two',
    data () {
        return {
            msg: 'Hi I am Two Page',
            name: "dongdong",
            s1: "<p>name</p>",
            s2: 2,                          /* 数字可以不用引号也可以显示 */
            imgUrl: 'https://cn.vuejs.org/images/logo.png'
        }
    },
    methods:{
        test(){
            alert("hhehehe!")
        },
        test2(content){
             alert(content)
        }
    }
}
</script>

<style scoped>

</style>
