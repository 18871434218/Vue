<template>
  <el-input-number v-model="num" @change="handleChange" :placeholder="data1"></el-input-number>
</template>
<script>
export default {
  data() {
    return {
      num: null,
      data1: "请输入文字"
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>