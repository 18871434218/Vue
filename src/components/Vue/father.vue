<template>
    <div style="background: red">
            child in father
        <div>
           <span>father age:</span> {{fatherAge}}
        </div>
        <child v-bind="$attrs"></child>    
    </div>
</template>
<script>
import child from './child'
export default {
    components:{
        child
    },

    props:{
        fatherAge: {
            type: Number,
            default: 0
        }
    }
}
</script>
<style scoped>

</style>