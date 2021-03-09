<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible style="box-shadow: 2px 0 6px rgba(0,21,41,.35);">
      <div class="logo">
        <img src="@/assets/logo.png">
        <strong v-show="!collapsed">TS Vue Antdv</strong>
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        v-model="selectedKeys"
        :open-keys="openKeys"
        @openChange="onOpenChange"
        @click="jump">
        <a-menu-item v-for="item in menus" v-if="!item.children" :key="item.path">
          <a-icon :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <a-sub-menu v-for="item in menus" v-if="item.children" :key="item.path">
          <span slot="title"><a-icon :type="item.meta.icon" /><span>{{ item.meta.title }}</span></span>
          <a-menu-item v-for="(child, index) in item.children" :key="child.path">
            {{ child.meta.title }}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0; position: relative;box-shadow: 0 1px 4px rgba(0,21,41,.08);z-index: 1">
        <a-icon
          class="trigger"
          id="menu-trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <div class="user" id="user-opea">
          <a-dropdown>
            <div class="img">
              <a-avatar src="@/assets/logo.png" />
              <span style="vertical-align: middle;margin-left: 4px">{{ username }}</span>
            </div>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="logoutFn"><a-icon type="logout" style="margin-right: 4px"/>退出登录</a>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item disabled>
                <a-icon type="more" style="margin-right: 4px"/>敬请期待
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <div class="my-notice" title="消息通知">
            <a-badge :count="noticeTotal">
              <a-icon class="notice" type="bell" style="padding: 0;"/>
            </a-badge>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{ height: 'calc(100% - 112px)', padding: '24px', paddingTop: '0' }"
      >
        <transition name="breadcrumb">
          <a-breadcrumb :style="{ margin: '16px 0' }">
            <a-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
              <span
                v-if="item.redirect === 'noredirect' || index === breadcrumbs.length-1"
                class="no-redirect"
              >{{ item.meta.title }}</span>
              <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </transition>
        <transition name="fade-transform">
          <router-view></router-view>
        </transition>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import RouteView from './RouteView'
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import { guides } from '@/store/guide'
import { UserModule } from '@/store/module/user'
import { PeimessionMoudle } from '@/store/module/peimission'

export default {
  components: { RouteView },
  data () {
    return {
      collapsed: false,
      dirver: null,
      openKeys: ['/'],
      selectedKeys: [],
      rootSubmenuKeys: [],
      noticeTotal: 10,
      breadcrumbs: []
    }
  },
  computed: {
    menus () {
      return PeimessionMoudle.routes.filter(item => item.meta && item.meta.hidden === false)
    },
    username () {
      return UserModule.userInfo.name
    }
  },
  watch: {
    $route (to) {
      this.getBreadcrumb()
    }
  },
  created () {
    this.selectedKeys = [this.menus[0].path]
    this.getBreadcrumb()
  },
  mounted () {
    setTimeout(() => {
      if (!localStorage.getItem('guide')) {
        this.openGuide()
        localStorage.setItem('guide', true)
      }
    }, 0)
  },
  methods: {
    // 打开引导页
    openGuide () {
      this.dirver = new Driver()
      console.log(this.dirver)
      this.dirver.defineSteps(guides)
      this.dirver.start();
    },
    getBreadcrumb () {
      let matched = this.$route.matched.filter(
        item => item.meta && item.meta.title
      );
      const first = matched[0];
      if (!this.isHome(first)) {
        matched = [
          { path: '/home', meta: { title: '首页' } }
        ].concat(matched);
      }
      this.breadcrumbs = matched.filter(item => {
        return item.meta && item.meta.title && item.meta.breadcrumb !== false;
      });
    },
    isHome (route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase() === 'Home'.toLocaleLowerCase();
    },
    jump ({ item, key }) {
      this.$router.push(key)
    },
    logoutFn () {
      const that = this
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk () {
          UserModule.logoutAction().then((res) => {
            that.$router.replace('/user/login')
          }).catch(err => {
            console.log(err)
            that.$message.error('退出登录失败')
          })
        }
      })
    },
    handleLink (item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(path);
    },
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }
  }
}
</script>
<style>
#components-layout-demo-custom-trigger {
  min-height: 100vh;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  margin: 16px;
  color: #fff;
  font-size: 18px;
}
#components-layout-demo-custom-trigger .logo img {
  height: 100%;
  margin-right: 10px;
}
.content {
  margin: '24px 16px';
  padding: '24px';
  background: '#fff';
}
.user {
  display: flex;
  height: 100%;
  position: absolute;
  top: 0;
  right: 24px;
  justify-content: center;
  align-items: center;
}
.user .test {
  margin-right: 8px;
  width: 78px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.user .img {
  cursor: pointer;
}
.user .notice {
  font-size: 24px;
  transition: all .3s;
}
.my-notice {
  padding: 0 24px;
  cursor: pointer;
}
.my-notice:hover .notice {
  color: #1890ff;
}
</style>
