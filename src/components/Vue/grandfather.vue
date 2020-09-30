<template>
    <div>
        <span>father in grandfather</span>
        <father :father-age="50" :child-time="`${time}`"></father>
    </div>
</template>
<script>
import father from './father'
export default {
    components:{
        father
    },
    data(){
        return {
            time: new Date().getTime()
        }
    }
}
</script>
<style scoped>

</style>