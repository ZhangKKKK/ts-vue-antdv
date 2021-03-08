<template>
  <div class="container">
    <PropDemo :msg="propData.msg" :total="propData.total" @return-parent="returnParent"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PropDemo from '@/components/PropDemo.vue'
interface IPropData {
  msg: string,
  total: number,
  text?: string
}
@Component({
  name: 'Home',
  components: {
    PropDemo
  }
})
export default class Home extends Vue {
  private propData: IPropData = {
    msg: 'Props的使用1',
    total: 5
  }

  private returnParent (num: number) {
    console.log('子组件传过来的：', num)
  }
}
</script>

// import PropDemo from '@/components/PropDemoJs.vue'
// export default {
//   name: 'Home',
//   components: {
//     PropDemo
//   },
//   data () { 
//     return {
//       propData: {
//         msg: 'Props的使用1',
//         total: 5
//       }
//     }
//   },
//   methods: {
//     returnParent (num) {
//       console.log('子组件传过来的：', num)
//     }
//   }
// }
// </script>
