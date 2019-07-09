<template>
  <div class="listfilter">
    <el-row type="flex">
      <el-col :span="8" class="filter-col">
        <el-row type="flex" class="filter-title">
          <el-col :span="24">价格</el-col>
          <el-col :span="24" style="text-align:right">0-{{filterForm.price}}</el-col>
        </el-row>
        <el-row>
          <div class="block">
            <el-slider v-model="filterForm.price" @change="handlePrice" :max=1400></el-slider>
          </div>
        </el-row>
      </el-col>
      <el-col :span="6" class="filter-col">
        <el-row type="flex" class="filter-title">
          <el-col :span="24">住宿等级</el-col>
        </el-row>
        <el-row>
          <el-select
            v-model="filterForm.levels"
            multiple
            placeholder="不限"
            size="mini"
            collapse-tags
            @change="handlelevels"
          >
            <el-option
              v-for="item in hotelOption.levels"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-row>
      </el-col>
      <el-col :span="6" class="filter-col">
        <el-row type="flex" class="filter-title">
          <el-col :span="24">住宿类型</el-col>
        </el-row>
        <el-row>
          <el-select
            v-model="filterForm.types"
            multiple
            placeholder="不限"
            size="mini"
            collapse-tags
            @change="handletypes"
          >
            <el-option
              v-for="item in hotelOption.types"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-row>
      </el-col>
      <el-col :span="6" class="filter-col">
        <el-row type="flex" class="filter-title">
          <el-col :span="24">酒店设施</el-col>
        </el-row>
        <el-row>
          <el-select
            v-model="filterForm.assets"
            multiple
            placeholder="不限"
            size="mini"
            collapse-tags
            @change="handleassets"
          >
            <el-option
              v-for="item in hotelOption.assets"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-row>
      </el-col>
      <el-col :span="6" class="filter-col" style=" border-right: none">
        <el-row type="flex" class="filter-title">
          <el-col :span="24">酒店品牌</el-col>
        </el-row>
        <el-row>
          <el-select
            v-model="filterForm.brands"
            multiple
            placeholder="不限"
            size="mini"
            collapse-tags
            @change="handlebrands"
          >
            <el-option
              v-for="item in hotelOption.brands"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filterForm: {
        levels: "",
        brands: "",
        assets: "",
        types: "",
        price: 0
      },
      hotelOption: {},
    };
  },
  props: {
    data:{
      type:Array
    } 
  },
  mounted() {
    this.$axios({
      url: "/hotels/options",
      method: "GET"
    }).then(res => {
      const { data } = res.data;
      this.hotelOption = data;
    });
  },

  methods: {
    //改变价格的时候触发的事件
    handlePrice(value) {
      this.$emit("getfilterdata", this.filterForm)
    },
    //选择星级的时候触发的事件
    handlelevels(value) {
       this.$emit("getfilterdata", this.filterForm)
    },
    //选择住宿类型时候触发的事件
    handletypes(value) {
        this.$emit("getfilterdata", this.filterForm)
    },
    //选择酒店设施触发的事件
    handleassets(value) {
       this.$emit("getfilterdata", this.filterForm)
    },
    //选择酒店品牌触发的事件
    handlebrands(value) {
       this.$emit("getfilterdata", this.filterForm)
    }
  }
};
</script>
<style lang='less' scoped>
.listfilter {
  border: 1px solid #dddddd;
  padding: 5px 0px;
  margin-top: 20px;
  margin-bottom: 20px;
  .filter-col {
    padding: 5px 20px;
    border-right: 1px solid #dddddd;
    .el-input {
      outline-style: none;
      border-style: none;
    }
  }
}
</style>
