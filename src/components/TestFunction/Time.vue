<template>
    <el-button @click="Timeback">消息提示</el-button>
</template>
<script>
export default {
     methods: {
         Timeback(){
             var a = this.$message({
			    showClose: false,
			    message: '你已经被管理员禁用，5s后将自动退出',
			    type: "error",
			    duration: 5000
			});
			
			//倒计时函数
			function coutTime(index){
			    setTimeout(function() {
			        if(index == 0){
			            //5s结束后的操作
			        }else{
			            a.message = "你已经被管理员禁用，"+index+"s后将自动退出" ;
			            coutTime(--index) ;
			        }
			    }, 1000);
			};
			coutTime(4) ;
         }
     }
}
</script>
<style>

</style>