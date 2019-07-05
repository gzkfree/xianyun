<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{this.$route.query.departCity}}-{{this.$route.query.destCity}}
        /
        {{this.$route.query.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="fliters.airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.airport"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="fliters.flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option :label="`${item.from}:00--${item.to}:00`" :value="item.from+':'+item.to" v-for="(item,index) in data.options.flightTimes" :key="index"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="fliters.company" placeholder="航空公司" @change="handleCompany">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.company"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="fliters.airSize" placeholder="机型" @change="handleAirSize">
          <el-option label="大" value="L"></el-option>
          <el-option label="中" value="M"></el-option>
          <el-option label="小" value="S"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    fliters:{
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "" // 机型大小
    }
    };
  },
  props: {
    data: {}
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
        this.$emit('getFliterValue',this.fliters)
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
        this.$emit('getFliterValue',this.fliters)
    },

    // 选择航空公司时候触发
    handleCompany(value) {
        this.$emit('getFliterValue',this.fliters)
    },

    // 选择机型时候触发
    handleAirSize(value) {
        this.$emit('getFliterValue',this.fliters)
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      this.fliters={
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "" // 机型大小
      }
      this.$emit('getFliterValue',this.fliters)
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>