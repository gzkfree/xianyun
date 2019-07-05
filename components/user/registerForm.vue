<template>
  <div>
    <el-form status-icon ref="registerForm" class="registerForm">
      <el-form-item>
        <el-input placeholder="用户名/手机"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="验证码">
          <el-button slot="append">发送验证码</el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="你的名字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
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
