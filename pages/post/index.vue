<template>
  <div class="container">

<el-menu :default-active="activeIndex" class="el-menu-demo" mode="vertical" collapse @select="handleSelect">
    <el-submenu index="1-1">
      <template slot="title" class='title'>热门城市</template>
      <el-menu-item index="1-1-1">选项1</el-menu-item>
      <el-menu-item index="1-1-2">选项2</el-menu-item>
      <el-menu-item index="1-1-3">选项3</el-menu-item>
    </el-submenu>
    <el-submenu index="1-2">
      <template slot="title">推荐城市</template>
      <el-menu-item index="1-2-1">选项1</el-menu-item>
      <el-menu-item index="1-2-2">选项2</el-menu-item>
      <el-menu-item index="1-2-3">选项3</el-menu-item>
    </el-submenu>
    <el-submenu index="1-3">
      <template slot="title">奔向海岛</template>
      <el-menu-item index="1-3-1">选项1</el-menu-item>
      <el-menu-item index="1-3-2">选项2</el-menu-item>
      <el-menu-item index="1-3-3">选项3</el-menu-item>
    </el-submenu>
    <el-submenu index="1-4">
      <template slot="title">主题推荐</template>
      <el-menu-item index="1-4-1">选项1</el-menu-item>
      <el-menu-item index="1-4-2">选项2</el-menu-item>
      <el-menu-item index="1-4-3">选项3</el-menu-item>
    </el-submenu>
</el-menu>
<div class="line"></div>

    <el-row type="flex" align="right" class="search-input">
      <input placeholder="请输入你想要到的地方，如：广州" />
      <i class="el-icon-search"></i>
    </el-row>
  </div>
  
</template>
<script>
export default {
   data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style  lang='less' scoped>
.container{
    margin: auto;
    width: 1200px;
.el-menu{
  width: 260px;
  border: 1px solid gray;
  
  .el-submenu{
    height: 40px;
    
    .title{
      line-height: 40px;
      border: pink;
    }
  }
}
.search-input {
  width: 700px;
  height: 30px;
  background: #fff;
  border: 4px orange solid;
  box-sizing: unset;
  input {
    flex: 1;
    height: 20px;
    padding: 5px 15px;
    outline: none;
    border: 0;
    font-size: 16px;
  }
  .el-icon-search {
    cursor: pointer;
    font-size: 22px;
    padding: 5px 10px;
    font-weight: bold;
    color: orange;
  }
}
}
</style>


