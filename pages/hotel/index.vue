<template>
  <section class="container">
    <div class="bar">
      <span>酒店</span>
      <span class="el-icon-arrow-right" style="color:#dccfce"></span>
      <span>南京市酒店预订</span>
    </div>
    <!-- 搜索组件 -->
    <searchForm v-on:gethotels="gethotels"></searchForm>
    <!-- 酒店过滤组件 -->
    <hotelfilter v-on:getfilterdata="getfilterdata" :data="hotelsdata"></hotelfilter>
    <!-- 酒店列表 -->
    <hotelItem v-for="(item,index) in showhotelsdata" :key="index" :data="item"></hotelItem>
  </section>
</template>
<script>
import searchForm from "@/components/hotel/searchForm";
import hotelfilter from "@/components/hotel/hotelfilter";
import hotelItem from "@/components/hotel/hotelItem";
function parseQueryString(params) {
    let qs = ''
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        let v = params[key]
        if (Array.isArray(v)) {
          v.forEach(x => {
            if (x) {
              qs += `&${key}=${x}`
            }
          })
        } else {
          if(v) qs += `&${key}=${v}`
        }
      }
    }
    return qs ? `?${qs}` : qs
  }
export default {
  data() {
    return {
      searchhotel: {
        city: ""
      },
      showhotelsdata: [],
      hotelsdata: [],
      hoteloption:{
        hotellevel:[],
        hoteltype:[],
        hotelbrand:[],
        hotelasset:[]
      }
    };
  },
  components: {
    searchForm,
    hotelfilter,
    hotelItem
  },
  methods: {
    gethotels(value) {
      this.searchhotel.city = value.id;
      this.$axios({
        url: "/hotels",
        method: "GET",
        params: this.searchhotel
      }).then(res => {
        this.hotelsdata = res.data.data;
        this.showhotelsdata = res.data.data;
      });
    },
    //获取子组件过滤的值
    getfilterdata(value) {
    // this.hoteloption.hotellevel=value.assets
    // this.hoteloption.hoteltype=value.brands
    // this.hoteloption.hotelbrand=value.levels
    // this.hoteloption.hotelasset=value.types
    // const  newdata={...this.hoteloption,city:this.searchhotel.city}
    // const qs= parseQueryString(newdata)
      this.showhotelsdata = this.hotelsdata.filter(item => {
        if (item.hotellevel) {
          return (true&&(value.levels.length==0?true:value.levels.indexOf(item.hotellevel.id) !==-1)&&
                        (value.types.length==0?true:value.types.indexOf(item.hoteltype.id)!==-1)&&
                        (value.brands.length==0?true:value.brands.indexOf(item.hotelbrand.id)==-1)&&
                        (value.price>item.price)
          )
          }
        if(value.levels.length==0){
          return true
        }
      });
      // this.$axios({
      //     url: `/hotels${qs}`,
      //     method:"GET"
      // }).then(res=>{
      //   console.log(res)
      // })
    },
  },
  mounted() {
    //获取酒店列表数据
    this.$axios({
      url: "/hotels",
      method: "GET",
      params: this.searchhotel
    }).then(res => {
      this.showhotelsdata = res.data.data;
      this.hotelsdata = res.data.data;
    });
  }
};
</script>
<style lang='less' scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  color: #606266;
  .bar {
    font-size: 14px;
    padding: 15px 0;
  }
}
</style>
