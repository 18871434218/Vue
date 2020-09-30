<template>
    <div>
        <div>{{ msg }}</div>
        <el-button v-model="chec" >点击</el-button>
    </div>
</template>
<script>
export default {
    name: 'acVuex',
    // data () {
    //     return {
    //        msg: '', 
    //     }
    // },

    computed:{
        msg () {
            return this.$store.state.msg;
        },

        chec () {
            return this.$store.state.msg;
        }
    }
}
</script>
<style scoped>

</style>