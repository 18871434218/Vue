<template>
    <div class="hello">
        <p> ID: {{this.$route.query.id}} </p>
        <p> 名称：{{this.$route.query.name}} </p>
        <ul>
            <li v-for="(p, index) in persons" :key="index">
                {{index}}....{{p.name}}.....{{p.age}}
                <button @click="deleteP">删除</button>
                <button @click="updateP">更新</button>
            </li>
        </ul><br><br>
        <input type="text" v-model="searchName">
        <ul>
            <li v-for="(p, index) in fiterName" :key="index">
                {{index}}----{{p.name}}------{{p.age}}
            </li>
        </ul>
        <button @click="setorderType(1)">年龄升序</button>
        <button @click="setorderType(2)">年龄降序</button>
        <button @click="setorderType(0)">原来顺序</button>
        
    </div>
</template>

<script>
export default {
    name: 'Six',
    data () {
        return {
            msg: 'Hi, I am One Page!',
            searchName: "",
            orderType: 0, //0表示原顺序，1表示升序，2表示降序
            persons:[
            {name:'Tom', age:18},
            {name:'Iack', age:16},
            {name:'Bob', age:24},
            {name:'ToK', age:17},
          ]
        }
    },
    //取出相关的数据
    computed:{
        fiterName(){
        const {searchName, persons, orderType} = this
        //最终需要显示的数组
        let FPersons
        FPersons = persons.filter(p => p.name.indexOf(searchName)!=-1)   //大于0就为true,也就是不等于-1

        if(orderType!==0){
            // 1表示升序
             FPersons.sort(function(p1, p2){     // 如果返回负数，p1在前，否则p2在前
                  if(orderType === 2){
                       return p2.age - p1.age
                  }else{
                       return p1.age - p2.age
                  }
             })
            //2表示降序
        }
        return FPersons
     }
    },

    methods:{
        deleteP(index){
            this.persons.splice(index, 1)
        },
        updateP(index, newP){
            this.persons[index] = newP 
        },
        setorderType(orderType){
            this.orderType = orderType
        }
    }
}
</script>

<style scoped>

</style>
