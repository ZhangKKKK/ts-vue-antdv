<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PeimessionMoudle } from '@/store/module/peimission'

@Component
export default class App extends Vue {
  public created () {
    PeimessionMoudle.GenerateRoutes(['sale'])
    // this.$store.dispatch('GenerateRoutes', ['sale'])
  }
}
</script>
