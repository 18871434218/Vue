<template>
    <div>
        <h1>绑定监听</h1>
        <button @click="test(123, $event)">test</button>
        <h1>事件修饰符</h1>
        <div style="width:200px; height:200px; background:red" @click="test1">
            <div style="width:100px; height:100px; background:blue" @click.stop="test2"></div>   <!-- .stop停止事件冒泡 -->
        </div>
        <a href="https://cn.vuejs.org/v2/api/#data" @click.prevent="test3">去百度</a>    <!-- .prevent阻止事件默认行为 -->
        <input type="text" @keyup="test4">    <!-- 按键修饰符 -->
        <input type="text" @keyup.13="test4">    <!-- 按键修饰符 -->
        <input type="text" @keyup.enter="test4">    <!-- 按键修饰符 -->
        <br><br>
        <h1>表单自动收集数据</h1>
        <form action="/xxxx" @submit.prevent="handleSubmit">
           <span>用户名： </span>
           <input type="text" v-model="username"><br>
           <span>密码：</span>
           <input type="password" v-model="pwd"><br>
           <span>性别：</span> 
           <input type="radio" id="female" value="女" v-model="sex">
           <label for="female">女</label>
           <input type="radio" id="male" value="男" v-model="sex">
           <label for="male">男</label><br>
           <span>爱好：</span>
           <input type="checkbox" id="basket" value="basket" v-model="likes">
           <label for="basket">篮球</label>
           <input type="checkbox" id="foot" value="foot" v-model="likes">
           <label for="foot">足球</label>
           <input type="checkbox" id="pingpang" value="pingpang" v-model="likes">
           <label for="pingpang">足球</label>
           <span>城市：</span>
           <select v-model="cityId">
               <option value="">未选择</option>
               <option :value="city.id" v-for="(city, index) in allCitys" :key="index">{{city.name}}</option>
           </select><br>
           <span>介绍：</span>
           <textarea rows="10"></textarea><br><br>
           <input type="submit" value="注册"> 
        </form><br><br>
        <button @click="isShow=!isShow">toggle</button>
        <transition name="xxx">
            <p v-show="isShow">hello</p>
        </transition><br><br>
        <!-- ref为某个元素注入一个唯一标识，vue对象通过$el访问这个元素对象 -->
        <p ref="content">三硅谷</p>
        <button @click="hint">提示</button>
        
    </div>
</template>
<script>
export default {
    name: 'VueTen',
    data(){
       return{
          isShow: true, 
          username:'',
          pwd:'',
          sex: '女',
          likes:["basket","foot"],
          allCitys:[
              {id:1, name:'BJ'},
              {id:2, name:'SH'},
              {id:3, name:'HZ'}
          ],
          cityId: 2
       }
    },
    methods:{
        test(value, event){
           alert(value + event.target.innerHTML)
        },
        test1(){
            /* event.stopPropagation */     //最初组织事件冒泡函数
            alert("out")
        },
        test2(){
            alert("in")
        },
        test3(){
            /* event.preventDefault */     //最初组织事件默认行为
            alert('点击了')
        },
        test4(event){
            if(event.keyCode === 13){
                alert(event.target.value + " " + event.keyCode)
            }
        },
        handleSubmit(){
            console.log(this.username + " " + this.pwd)
        },
        hint(){
            alert(this.$refs.content.textContent)
        }
    }
}
</script>
<style>
  .xxx-enter-active, .xxx-leave-active{
      transition: opacity .5s;
  }
  .xxx-enter,xxx-leave-to{
      opacity: 0;
  } 
</style>