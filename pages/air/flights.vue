<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <flightsFilters :data="airList" v-on:getFliterValue="getFliterValue"></flightsFilters>
        </div>

        <!-- 航班头部布局 -->
        <div>
          <FlightsListHead></FlightsListHead>
        </div>
        <!-- 航班信息 -->
        <div>
          <flightsItem v-for="(item,index) in flightData" :key="index" :data="item"></flightsItem>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="flghtFilterData.length"
          ></el-pagination>
        </el-row>
      </div>
      <!-- 侧边栏 -->
      <div class="aside">
        <flightsAside></flightsAside>
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead.vue";
import flightsItem from "@/components/air/flightsItem.vue";
import flightsFilters from "@/components/air/flightsFilters.vue";
import flightsAside from "@/components/air/flightsAside.vue";
export default {
  data() {
    return {
      flightData: [],
      flghtFilterData: [],
      airList: {
        flights: [],
        info: {
          departCity: "",
          departDate: "",
          destCity: ""
        },
        options: {
          airport: [],
          company: [],
          flightTimes: []
        },
        toatl: ""
      },
      pageSize: 5,
      pageNum: 1,
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "" // 机型大小
    };
  },
  components: {
    FlightsListHead,
    flightsItem,
    flightsFilters,
    flightsAside
  },
  methods: {
    //获取机票列表
    getAirList() {
      this.$axios({
        url: "/airs",
        method: "GET",
        params: this.$route.query
      }).then(res => {
        console.log(res);
        this.airList = res.data;
        this.flightData = res.data.flights;
        this.flghtFilterData = res.data.flights;
        this.setFlightData();
      });
    },
    //设置flightData数据
    setFlightData() {
      this.flightData = this.flghtFilterData;
      this.flightData = this.flghtFilterData.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageSize * this.pageNum
      );
    },
    //改变页码时候触发
    handleSizeChange(v) {
      this.pageSize = v;
      this.setFlightData();
    },
    //当前页改变时候触发
    handleCurrentChange(v) {
      this.pageNum = v;
      this.setFlightData();
    },
    //获取子组件过滤去机场的值
    getFliterValue(value) {
      this.flightData = this.airList.flights;
      console.log(value)
      this.flghtFilterData = this.flightData.filter(v => {
        return (
          true &&
          (value.company == "" ? true : value.company === v.airline_name) &&
          (value.airSize == "" ? true : v.plane_size === value.airSize) &&
          (value.airport == "" ? true : value.airport === v.org_airport_name) &&
          (value.flightTimes == ""
            ? true
            : value.flightTimes.split(":")[0] <= parseInt(v.dep_time) &&
              parseInt(v.dep_time) <= value.flightTimes.split(":")[1])
        );
      });
      this.flightData = this.flghtFilterData;
    }
  },
  mounted() {
    this.getAirList();
  },
  watch:{
    $route:function(){
      this.getAirList();
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>