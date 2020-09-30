<template>
    <div id="lnput">
        <div>
        <el-input
            size="mini"
            @change="valideMsg" 
            placeholder="请输入内容"
            v-model="input_value"
            clearable>
        </el-input>
        </div>
        <div id="Input2">
            请输入有效名称
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
           input_value: null,
        }
    },

    methods:{
       valideMsg(){
           if(this.input_value == 'B'){
               alert("名字冲突");
           }
       }
    }
}
</script>
<style scoped>

</style>