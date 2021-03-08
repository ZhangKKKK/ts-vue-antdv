<template>
  <a-layout :class="['layout']" style="height: 100%">
    <div id="userLayout" :class="['user-layout-wrapper']">
      <div class="container">
        <div class="top">
          <div class="user-header">
            <img src="~@/assets/logo.png" class="logo" alt="logo">
            <span class="title">ts-vue-antdv+</span>
          </div>
          <div class="desc">
            用户登录
          </div>
        </div>
        <route-view></route-view>
      </div>
    </div>
  </a-layout>
</template>

<script lang="ts">
const RouteView = () => import('./RouteView.vue')
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'UserLayout',
  components: { RouteView }
})
export default class UserLayout extends Vue {}
</script>

<style lang="scss" scoped>
  #userLayout.user-layout-wrapper {
    height: 100%;

    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 98%;
        }
      }
    }

    .container {
      width: 100%;
      min-height: 100%;
      background: #f0f2f5 url('~@/assets/background.svg') no-repeat 50%;
      background-size: 100%;
      padding: 80px 0 60px;
      position: relative;

      a {
        text-decoration: none;
      }

      .login-top {
        width: 368px;
        position: absolute;
        top: 110px;
        right: 10%;
      }

      .top {
        text-align: center;

        .user-header {
          height: 44px;
          line-height: 44px;
          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, .85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }

      .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;
          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }
  }
</style>
