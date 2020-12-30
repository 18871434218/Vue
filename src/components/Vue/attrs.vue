<template>
  <div style="background: blue">
     father in grandfather
    <father :father-age="50" :child-time="`${time}`"></father>
  </div>
</template>
<script>
import father from './father'
export default {
  components: {
    father
  },
  data () {
    return {
      time: new Date().getTime()
    }
  }
}
</script>

// father
// <template>
//   <div style="background: red">
//     child in father
//     <div>
//       <span>father age:</span>{{fatherAge}}
//     </div>
//     <child v-bind="$attrs"></child>
//   </div>
// </template>
// <script>
// import child from './child'
// export default {
//   components: {
//     child
//   },
//   props: {
//     fatherAge: {
//       type: Number,
//       default: 0
//     }
//   }
// }
// </script>

// <template>
//   <div style="background: green">
//     <div>child</div>
//     <div>time: {{childTime}}</div>
//   </div>
// </template>
// <script>
// export default {
//   props: {
//     childTime: {
//       type: String,
//       default: ''
//     }
//   }
// }
// </script>
