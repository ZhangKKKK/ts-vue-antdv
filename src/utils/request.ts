import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: '', // api base_url
  timeout: 1000 * 60 * 3 // 请求超时时间
})

service.defaults.headers.post['Content-Type'] = 'application/json'
service.defaults.transformRequest = [(data: any) => {
  data = JSON.stringify(data)
  return data
}]
const err = (error: any) => {
  // if (error.data) {
  //   const data = error.data
  //   if (data.code === 403) {
  //     notification.error({
  //       message: 'Forbidden',
  //       description: data.message
  //     })
  //   }
  // }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  console.log('send request')
  // 处理参数
  // const token = Vue.ls.get(ACCESS_TOKEN) || ''
  // const TimeStamp = new Date().getTime().toString().substr(0, 10)
  // const data = `Token=${token}+_t=${TimeStamp}+_k=${new Base64().decode(PRIVATE_KEY)}`
  // const signature = md5(data.toUpperCase()).toUpperCase()
  // config.headers['TimeStamp'] = TimeStamp
  // config.headers['signature'] = signature
  // if (config.headers['Content-Type'] === 'multipart/form-data') {
  //   config.transformRequest = [function (data) {
  //     // 对 data 进行任意转换处理
  //     return data
  //   }]
  // }
  // if (token) {
  //   config.headers['Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  // }
  // if (token) {
  //   config.data['UserId'] = store.state.user.user_id
  //   config.data['SystemType'] = 1
  //   config.data['Source'] = 1
  // } else {
  //   config.data['SystemType'] = 1
  //   config.data['Source'] = 1
  // }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  // 未登录
  // 0871 无查看权限
  if (response.data.code === 2164260879 || response.data.code === 2164260871) {
    return err(response)
  }
  return response.data
}, err)

export {
  service as axios
}
