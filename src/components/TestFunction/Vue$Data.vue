<template>
<!--  -->
    <div id="TestData">
        {{msg}} 
    </div>
</template>
<script>
export default {
    data() {
        return {
            data1: false,
            data2: false,
            data3: 'mseg',
            data4: 'msg4',
            msg: 'dong'
        }
    },

    mounted(){
            let bbu = this.$data.data1;       // 这样就是取data里定义的数据
            console.log("data1", bbu);
            let bbu2 = this.$data.data2;
            console.log("data2", bbu2);
            let da1 = this.$data.data3;
            console.log("data3", da1);
       }
}
</script>
<style scoped>

</style>