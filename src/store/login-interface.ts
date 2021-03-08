// 保存登录信息的接口
export interface IuserInfo {
  name?: string,
  token?: string,
  mobile: number | string,
  password: number | string
}

// 登录接口信息
export interface IloginParams {
  mobile: number | string,
  password: number | string
}
