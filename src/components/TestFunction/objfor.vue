<template>
    <div>
        <el-row v-for="(opt, index) in opts" :key="index">
            {{opt.start}}
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            opts: {
                start: { start: '0', end:'9', targit: '类型', direction:'90' },    
                end: { start: '0', end:'9', targit: '类型', direction:'90' },
                targit: { start: '0', end:'9', targit: '类型', direction:'90' }
            }
        }
    }
}
</script>
<style scoped>

</style>