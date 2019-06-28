<template>
  <div>
    <div class="header">
      <el-row type="flex" class="main" justify="space-center">
        <!-- logo -->
        <div class="logo">
          <nuxt-link to="/">
            <img src="http://157.122.54.189:9093/images/logo.jpg" alt>
          </nuxt-link>
        </div>
        <!-- 菜单栏 -->
        <el-row type="flex" class="navs" >
          <nuxt-link to='/' >首页</nuxt-link>
          <nuxt-link to='/post'>旅游攻略</nuxt-link>
          <nuxt-link to='/hotel'>酒店</nuxt-link>
          <nuxt-link to='air'>国内机票</nuxt-link>
        </el-row>
        <!-- 登录和消息 -->
        <el-row type='flex' class="login" >
          <el-dropdown >
            <span class="el-dropdown-link">
              <i class="el-icon-bell"></i>
              消息
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item>消息</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <nuxt-link to='/user/login'>登录 / 注册</nuxt-link>
        </el-row>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  activated() {}
};
</script>
<style lang='less' scoped>
.header {
  height: 60px;
  line-height: 60px;
  box-sizing: border-box;
  border-bottom: 1px #ddd solid;
  box-shadow:0 3px 0 #f5f5f5;;
 .main{
     width: 1000px;
     margin: 0 auto;
     .logo{
         width:156px;
         display: flex;
         justify-content: center;
         img{
           vertical-align:middle;
             width: 100%;
         }


     }
     .navs{
         justify-content: center;
         flex: 1;
         a{
             flex: 1;
             height: 60px;
             text-align: center;
             box-sizing: border-box;
             &:hover{
                 color: #409eff;
                 border-bottom: 3px solid #409eff;
             }
             &:focus{
               background-color: #409eff;
               color: white;
             }
         }
     }
     .login{
         justify-content:flex-end;
         flex: 1;
         a{
           font-size: 14px;
           padding-left: 20px;
            &:hover{
            text-decoration: underline;
            color: #409eff;
         }
         }
        
     }
 }
}
</style>
