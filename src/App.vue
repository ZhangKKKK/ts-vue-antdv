<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-config-provider>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PeimessionMoudle } from '@/store/module/peimission'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

@Component({
  components: { 'a-config-provider': ConfigProvider }
})
export default class App extends Vue {
  private locale: any = zhCN
  public created () {
    PeimessionMoudle.GenerateRoutes(['sale'])
    // this.$store.dispatch('GenerateRoutes', ['sale'])
  }
}
</script>
