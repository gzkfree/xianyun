<template>
  <div class="container">
    <el-row type="flex" class="main" justify="center" align="middle">
      <div class="form-wrapper" justify="center">
        <el-row type="flex">
          <span
            v-for="(value,index) in ['登录','注册']"
            :key="index"
            @click="handelChange(index)"
            :class="{active:currentOption===index}"
          >{{value}}</span>
        </el-row>
        <!-- 登录 -->
        <LoginForm v-show="currentOption===0"></LoginForm>
        <!-- 注册 -->
        <RegisterForm v-show="currentOption===1"></RegisterForm>
      </div>
    </el-row>
  </div>
</template>
<script>
import LoginForm from '@/components/user/loginForm.vue'
import RegisterForm from '@/components/user/registerForm.vue'
export default {
  data() {
    return {
      currentOption: 0
    };
  },
  components:{
      LoginForm,
      RegisterForm
  },
  methods: {
    //切换登录和注册
    handelChange(index) {
      this.currentOption = index;
    },
 
  }
};
</script>
<style lang='less' scoped>
.container {
  min-width: 1000px;
  height: 700px;
  background: url("http://157.122.54.189:9095/assets/images/th03.jfif") center 0
    no-repeat;
  .main {
    height: 100%;
    .form-wrapper {
      width:400px;
      background-color: #fff;
      span {
        width: 50%;
        text-align: center;
        background-color: #eeeeee;
        color: #ac7b66;
        height: 60px;
        line-height: 60px;
      }
      .active {
        color: #ffab42;
        font-weight: bolder;
        background-color: #fff;
        border-top: 2px solid #ffab42;
      }
    }
  }
}
</style>
