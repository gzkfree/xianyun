<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span v-for="(value,index) in tabs" :key="index" :class="{active:currentTab===index}">
        <i :class="value.icon"></i>
        {{value.name}}
      </span>
    </el-row>
    <el-form class="search-form-content" ref="form" label-width="80px" :model="airForm">
      <el-form-item label="出发城市">
        <el-autocomplete
          class="el-autocomplete"
          placeholder="请搜索出发城市"
          :fetch-suggestions="queryDepartSearch"
          @select="handleDepartSelect"
          v-model="airForm.departCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          class="el-autocomplete"
          placeholder="请搜索到达城市"
          :fetch-suggestions="queryDestSearch"
          @select="handleDestSelect"
          v-model="airForm.destCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="airForm.departDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      state: "",
      airForm: {
        departCity: "", //出发城市
        departCode: "", //出发城市代码
        destCity: "", //到达城市
        destCode: "", //到达城市代码
        departDate: "" //出发日期
      }
    };
  },
  methods: {
    //出发城市输入框获得焦点时触发
    //value是输入框的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      if (!value) return;
      //请求机票接口
      this.$axios({
        url: "/airs/city?name=" + value,
        method: "GET"
      }).then(res => {
        const { data } = res.data;
        //给data每一项都加value
        console.log(data);
        const newData = data.map(v => {
          return {
            ...v,
            value: v.name.replace("市", "")
          };
        });
        cb(newData);
        console.log(newData);
        this.airForm.departCity = newData[0].value;
        this.airForm.departCode = newData[0].sort;
      });
    },
    queryDestSearch(value, cb) {
      if (!value) return;
      //请求机票接口
      this.$axios({
        url: "/airs/city?name=" + value,
        method: "GET"
      }).then(res => {
        const { data } = res.data;
        //给data每一项都加value
        console.log(data);
        const newData = data.map(v => {
          return {
            ...v,
            value: v.name.replace("市", "")
          };
        });
        console.log(newData);
        cb(newData);
        this.airForm.destCity = newData[0].value;
        this.airForm.destCode = newData[0].sort;
      });
    },
    //出发城市下拉选择是触发
    handleDepartSelect(item) {
      this.airForm.departCity = item.value;
      this.airForm.departCode = item.sort;
    },
    //目标城市下拉选择是触发
    handleDestSelect(item) {
      this.airForm.destCity = item.value;
      this.airForm.destCode = item.sort;
    },
    //确认日期时触发
    handleDate(value) {
      this.airForm.departDate = moment(value).format("YYYY-MM-DD");
    },
    //触发和目标城市切换时触发s
    handleReverse() {
      var currentCity;
      var currentCode;
      //交换城市
      currentCity = this.airForm.departCity;
      this.airForm.departCity = this.airForm.destCity;
      this.airForm.destCity = currentCity;
      //交换城市代码
      currentCode = this.airForm.departCode;
      this.airForm.departCode = this.airForm.destCode;
      this.airForm.destCode = currentCode;
    },
    //提交表单时触发
    handleSubmit() {
      //表单验证数据
      const rules = {
        depart: {
          value: this.airForm.departCity,
          message: "请选择出发城市"
        },
        dest: {
          value: this.airForm.destCity,
          message: "请选择到达城市"
        },
        departDate: {
          value: this.airForm.departDate,
          message: "请选择出发时间"
        }
      };
      let valid = true; //表单验证结果
      Object.keys(rules).forEach(v => {
        //只要有一个不通过，就停止循环
        if (!valid) return;
        const item = rules[v];
        if (!item.value) {
          valid = false;
          this.$confirm(item.message, "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "warning"
          });
        }
      });
      if (!valid) return;
      //保存数据到本地
      const airs=JSON.parse(localStorage.getItem('airs')||`[]`)
      airs.push(this.airForm)
      localStorage.setItem('airs',JSON.stringify(airs))
      this.$router.push({
        path: "/air/flights",
        query: this.airForm
      });
      
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>