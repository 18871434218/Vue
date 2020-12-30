<template>
    <div class="hello">
        <p> ID: {{this.$route.params.id}} </p>
        <p> 名称：{{this.$route.params.name}} </p>

        <!-- 
            在应用界面中，某些歌元素的样式是变化的，
            class/style绑定就是专门用来实现动态样式效果的技术

            2：
            class绑定： ：class='xxxx'    //可以同时起作用
            xxx是字符串
            xxx是对象
            xxx是数组
            
            3：
            style绑定
            :style="{color:activeColor,fontSize+'px'}"
            其中activeColor/fontSize是data属性
         -->
         <h1>class绑定</h1>
         <p class="cClass" :class="a">xxx字符串</p>  
         <p :class="{aClass:isA, bClass:isB}">xxx对象</p>  
         <p :class="[aClass, bClass]">xxx数组</p> 
         <h1>style绑定</h1>
         <p :style="{color:activeColor, fontSize:fontSize +'px'}">:style="{color:activeColor,fontSize+'px'}</p>
         <button @click="update">更新</button>
    </div>
</template>

<script>
export default {
    name: 'Four',
    data () {
        return {
            msg: 'Hi, I am One Page!',
            a: 'aClass',
            b: 'bClass',
            isA: true,
            isB: false,
            activeColor: 'red',
            fontSize: 20
        }
    },
    methods:{
        update(){
            this.a = this.b
            this.isA = false
            this.isB = true
            this.activeColor = 'green'
            this.fontSize = 40
        }
    }

}
</script>

<style>
.aClass{
    color: red;
}
.bClass{
    color: saddlebrown;
}
.cClass{
    font-size: 50px;
}
</style>
