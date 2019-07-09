<template>
  <div>
    <el-form status-icon ref="loginForm" class="logiForm" :model="loginForm" :rules="rules">
      <el-form-item prop="username">
        <el-input placeholder="用户名/手机" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item style=" margin-bottom:0;" prop="password">
        <el-input placeholder="密码" type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item style="margin-top:0;">
        <a href="#" style="float:right">忘记密码</a>
        <el-button type="primary" style="width:100%" @click="loginSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "13800138000",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称或者手机", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    //发送登录请求
    loginSubmit() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.$store.dispatch("user/login", this.loginForm).then(result => {
            if(this.$route.query.return){
              this.$router.push(this.$route.query.return)
            }
            this.$message({
              message: "登录成功",
              type: "success"
            });
          });
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
.el-form {
  background-color: #fff;

  .el-form-item {
    margin: 20px;
  }
}
</style>
