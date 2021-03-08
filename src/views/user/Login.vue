<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      :selfUpdate="true"
    >
      <a-form-item>
        <a-input
          size="large"
          placeholder="手机号"
          v-decorator="[
            'mobile',
            {rules: rules.mobile}
          ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input-password
          size="large"
          placeholder="密码: 6-20位字母、数字"
          v-decorator="[
            'password',
            {rules: rules.password}
          ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input-password>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          class="login-button"
          :loading="loginBtn"
          @click="handleSubmit"
        >确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mobileReg, passwordReg } from '@/utils/pattern'
import { IuserInfo } from '@/store/login-interface'
@Component
export default class Login extends Vue {
  public loginBtn = false
  public requiredTwoStepCaptcha = false
  public stepCaptchaVisible = false
  public form = this.$form.createForm(this)
  public rules = {
    mobile: [
      // { required: true, trigger: 'blur', message: '请输入手机号' },
      { validator: this.handleMobile, trigger: 'blur' }
    ],
    password: [
      // { required: true, trigger: 'blur', message: '请输入密码' },
      { validator: this.handlePassword, trigger: 'blur' }
    ]
  }

  public beforeCreate () {
    this.form = this.$form.createForm(this)
  }

  // 事件
  public handleMobile (rule: any, value: string, callback: (obj?: any) => void) {
    if (!value) {
      callback(new Error('请输入手机号'))
    }
    if (!mobileReg.test(value)) {
      callback(new Error('手机号格式错误'))
    }
    callback()
  }
  public handlePassword (rule: any, value: string, callback: (obj?: any) => void) {
    if (!value) {
      callback(new Error('请输入密码'))
    }
    if (!passwordReg.test(value)) {
      callback(new Error('只允许输入英文字母、数字且长度6-20位'))
    }
    callback()
  }
  public handleSubmit () {
    const {
      form: { validateFields }
    } = this
    validateFields(['mobile', 'password'], (err, values) => {
      console.log(err, values)
      const loginParams: any = {
        password: 'values.password',
        mobile: 'values.mobile'
      }
      // this.loginBtn = true
      this.$store.dispatch('userModule/loginAction', loginParams).then(res => {
        // this.loginBtn = false
        console.log(res)
        this.setUserInfo(res.data)
      }).catch(error => {
        // this.loginBtn = false
        console.log(error)
      })
    })
  }

  public setUserInfo (res: IuserInfo) {
    const userInfo: IuserInfo = {
      name: res.name,
      token: res.token,
      mobile: res.mobile,
      password: res.password
    }
    console.log(userInfo, 'login success')
    Vue.ls.set('token', userInfo.token)
    this.$store.commit('userModule/SET_INFO', userInfo)
    this.$store.dispatch('GenerateRoutes', ['sale'])
    this.$router.push('/home')
  }
}

</script>

<style lang="scss" scoped>
.login-main {
  position: absolute;
  right: 10%;
  top: 227px;
  z-index: 1;
}
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
