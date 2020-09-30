<template>
    <div class="hello">
        <p> ID: {{this.$route.params.id}} </p>
        <p> 名称：{{this.$route.params.name}} </p>
<!-- 条件渲染，v-if是移除元素。v-show只是显示与不显示 -->
        <p v-if="ok">成功了</p>
        <p v-else>失败</p>
        <p v-show="ok">表白成功</p>
        <p v-show="!ok">表白失败</p>

        <button @click="ok=!ok">切换</button>
    </div>
</template>

<script>
export default {
    name: 'Five',
    data () {
        return {
            msg: 'Hi, I am One Page!',
            ok: false,
        }
    }
}
</script>

<style scoped>

</style>
