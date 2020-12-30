<template>
    <div class="hello">
        <h1> {{$route.params.password}} </h1>
        <h1> {{msg}} </h1><br>
<!-- 
1、计算属性
在computed属性对象中定义计算属性的方法，
在页面中使用{{}}显示计算的结果
2、监视属性
通过vue对象的$watch()或watch配置来监听指定的属性
当属性变化时，回调函数自动调用，在函数内部进行计算

3、计算属性高级：
通过getter/setter实现对属性数据的显示和监控
计算属性存在缓存，多次读取只执行一次getter计算 -->
        姓：<input type="text" placeholder="First Name" v-model="firstName"><br>
        名：<input type="text" placeholder="Last Name" v-model="lastName"><br>
        姓名1（单项）：<input type="text" placeholder="Full Name1" v-model="fullName1"><br>
        姓名2（单项）：<input type="text" placeholder="Full Name2" v-model="fullName2"><br>
        姓名3（双向）：<input type="text" placeholder="Full Name3" v-model="fullName3"><br>
    </div>
</template>

<script>
export default {
    name: 'Third',
    data() {
        return {
        msg:'Hi, I am One Page!',
        firstName:'A',
        lastName:'B',
        // fullName2: 'A B',
        }
    },
    computed:{
        //什么时候执行：初始化显示|相关的data属性数据发生变化
        fullName1:function(){     //计算属性中的一个方法，方法的返回值作为属性值
            return this.firstName + " " + this.lastName
        },
        fullName3:{
            //回调函数，当需要读取当前属性值时回调，根据相关的数据计算并返回当前属性值
             get(){
                  return this.firstName + " " + this.lastName
             },
             //回调函数，当属性值发生变化时回调，更新相关的属性数值。
             set(value){  //value值就是fullName3最新值
                 const names = value.split('')
                 this.firstName = names[0]
                 this.lastName = names[1]
             }
        }
    },

    watch:{   //配置监视
        firstName: function(value){   //firstName发生变化
             console.log(this),
             this.fullName2 = value + this.lastName
        }
    }

   /*  (vm.$watch('lastName', function(value){    直接调用vue对象vm属性方法
            this.fullName2 = this.lastName + " " + value
    }) */

}
</script>

<style scoped>

</style>
