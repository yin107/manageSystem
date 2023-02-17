<template>
  <el-form
    :model="dynamicValidateForm"
    ref="dynamicValidateForm"
    label-width="100px"
    class="demo-dynamic"
  >
    <h3>用户登录</h3>
    <el-form-item
      prop="username"
      label="用户名"
      :rules="[
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, message: '用户名长度不能小于3', trigger: ['blur'] },
      ]"
    >
      <el-input type="input" v-model="dynamicValidateForm.username" autocomplete="current-password"></el-input>
    </el-form-item>
    <el-form-item
      prop="password"
      label="密码"
      :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
    >
      <el-input type="password" v-model="dynamicValidateForm.password" autocomplete="current-password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-checkbox label="记住账号" v-model="isRemenber"></el-checkbox>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('dynamicValidateForm')"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import Cookies from "js-cookie";
import { request1 } from "api/config";
export default {
  name: "loginView",
  data() {
    return {
      dynamicValidateForm: {
        password: "",
        username: "",
      },
      isRemenber: false,
    };
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request1({
            url: "/permission/getUser",
            method: "post",
            data: this.dynamicValidateForm,
          }).then((res) => {
            if (res.data.code == 404) {
              this.$message(res.data.data.message);
            }
            if (res.data.code == 200) {
              //后端返回对象中包含token，将token取出放入token
              this.$store.commit("setToken", res.data.data[0].token);
              Cookies.set("name", res.data.data[0].username);
              Cookies.set("role", res.data.data[0].name);
              Cookies.set("userId", res.data.data[0].token);
              //需要把返回的路由，添加到动态路由中去
              this.$store.commit("setMenu", res.data.data[0].routes);
              this.$store.commit("addMenu", this.$router);
              this.$router.push({ name: "home" }); //使用name来跳转，使用path会不成功
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
.demo-dynamic {
  width: 350px; /*表单宽度*/
  height: auto;
  padding: 35px 35px 15px 35px; /*填充*/
  border: 1px solid #eaeaea; /*边框*/
  box-shadow: 0 0 25px #cac6c6; /*隐形*/
  margin: 0 auto;
  margin-top: 50px;
}
</style>
