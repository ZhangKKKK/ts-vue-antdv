import { axios } from '@/utils/request'
import { IloginParams } from '@/store/login-interface'
import { baseUrl } from '@/global'

export const login = (params: IloginParams) => {
  console.log('api login')
  return axios({
    url: baseUrl + '/login',
    method: 'post',
    data: params
  })
}
