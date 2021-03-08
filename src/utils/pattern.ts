/**
 * 验证
 */
// 手机号
export const mobileReg: any = /^1[34578]\d{9}$/

// 密码
export const passwordReg: any = /^(\d|[a-zA-Z]){6,20}$/
// export const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/

// 验证码 数字或字母4位
export const captchaReg: any = /^[a-zA-Z0-9]{4,4}$/

// 邮箱
export const emailReg: any = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
