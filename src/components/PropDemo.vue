<template>
  <div>
    <a-row>
      {{ msg }}
    </a-row>
    <a-row>
      {{ computed }}
    </a-row>
    <a-row>
      <a-col :span="4">
        <a-input-number ref="inputNumber" v-model="num" :min="1" :max="10" @change="onChange"/>
      </a-col>
      <a-col :span="2">
        <a-button type="primary" shape="circle" icon="plus" @click="upNumber"/>
        <a-button type="primary" shape="circle" icon="minus" @click="downNumber"/>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Emit, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  // ? 表示可选
  // ! 表示一定有值
  @Prop({
    type: String,
    default: 'prop'
  }) private msg?: string;
  @Prop({
    default: 0,
    required: true
  }) private total!: number;

  // ------------- 计算属性 computed
  get computed (): number {
    return this.num + 10
  }

  // ------------- 变量  data
  private num: number = this.total

  // ------------- 监听 watch
  @Watch('num', { deep: true })
  private onChangeNum (newValue: number, oldValue: number) {
    console.log(`watch: newValue: ${newValue}; oldValue: ${oldValue}`)
  }

  // ------------  生命周期
  private created () {
    // console.log('created:', this.num)
  }
  private mounted () {
    // (this.$refs.inputNumber as any).foucs()
  }

  // -----------   方法 methods
  private upNumber (): void {
    this.num += 2
  }
  private downNumber (): void {
    this.num -= 2
  }

  private onChange (value: number) {
    this.num = value
    console.log('onChange:', value)
    this.returnParent()
  }

  // ------------  emit
  // @Emit('returnParent')
  // private backData () {
  //   return this.num
  // }
  @Emit()
  private returnParent () {
    return this.num
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
