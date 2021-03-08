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

<script>
export default {
  props: {
    msg: {
      type: String,
      default: 'prop'
    },
    total: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data () {
    return {
      num: this.total
    }
  },
  computed: {
    computed () {
      return this.num + 10
    }
  },
  watch: {
    num: {
      deep: true,
      onChangeNum (newValue, oldValue) {
        console.log(`watch: newValue: ${newValue}; oldValue: ${oldValue}`)
      }
    }
  },
  created () {
    console.log('created:', this.num)
  },
  mounted () {
    this.$refs.inputNumber.foucs()
  },
  methods: {
    upNumber () {
      this.num += 2
    },
    downNumber () {
      this.num -= 2
    },
    onChange (value) {
      this.num = value
      console.log('onChange:', value)
      this.returnParent()
    },
    returnParent () {
      this.$emit('returnParent', this.num)
    }
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
