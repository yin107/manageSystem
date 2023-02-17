import Mock from 'mockjs'
import userApi from './user'
import permissionApi from './permission'

Mock.mock(/\/user\/getUser/,'get',userApi.getUserList)

Mock.mock(/\/user\/del/,'get',userApi.deleteUser)

Mock.mock(/\/user\/edit/, 'post',userApi.updateUser)
Mock.mock(/\/user\/add/, 'post',userApi.addUser)

Mock.mock(/\/permission\/getUser/,'post',permissionApi.getdynamicUser)

