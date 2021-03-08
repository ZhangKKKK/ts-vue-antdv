import Mock from 'mockjs'

Mock.mock('/mock/login', {
  'success|1': true,
  'data': {
    'name': '@cname',
    'token|5': 'asd',
    'password': '@word(5, 10)',
    'mobile': '18734744946',
    'roles': ['sale']
  }
})
