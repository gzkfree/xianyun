<template>
  <div class="main">
    <el-row type="flex">
      <el-col :span="8" class="img">
        <nuxt-link to>
          <img :src="data.photos" alt />
        </nuxt-link>
      </el-col>
      <el-col :span="10" class="dec">
        <nuxt-link to class="title">{{data.name}}</nuxt-link>
        <div>{{data.alias}}</div>
        <el-row type="flex" justify="space-between" style="margin-top:10px;">
          <el-col style="display:flex" :span="10">
            <el-rate v-model="data.stars"></el-rate>
            <span>{{data.stars}}分</span>
          </el-col>
          <el-col :span="7">
            <span>39条评价</span>
          </el-col>
          <el-col :span="7">
            <span>41篇游记</span>
          </el-col>
        </el-row>
        <div style="margin-top:10px;">
          <span class="el-icon-location"></span>
          <span>位于: {{data.address}}</span>
        </div>
      </el-col>
      <el-col :span="6">
        <el-table :data="data.products"  style="width: 100%">
          <el-table-column prop="name" width="150"></el-table-column>
          <el-table-column width="100">
            <template slot-scope="scope">￥{{scope.row.price }}起</template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      grade: 0
    };
  },
  props: {
    data: {}
  }
};
</script>
<style lang='less' scoped>
.main {
  padding: 20px 0;
  border-bottom: 1px solid #eeeeee;
  img {
    width: 320px;
    height: 210px;
  }
  .dec {
    .title {
      font-size: 24px;
      color: black;
    }
  }
  .el-table{
    cursor: pointer;
  }
}
</style>
