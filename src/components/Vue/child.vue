<template>
    <div style="background: green">
         <div>child</div>
         <div>time: {{childTime}}</div>     
    </div>
</template>
<script>
export default {
    props: {
        childTime: {
            type: String,
            default: ''
        }
    }
}
</script>
<style scoped>

</style>