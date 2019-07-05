<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <orderForm :data="infoData" @setAllPrice="setAllPrice"></orderForm>
      </div>

      <!-- 侧边栏 -->
      <div class="aside" v-if="showAside">
        <orderAside :data="infoData" :allPrice="allPrice"></orderAside>
      </div>
    </el-row>
  </div>
</template>

<script>
import orderForm from "@/components/air/orderForm";
import orderAside from "@/components/air/orderAside";
export default {
  data() {
    return {
      //机票信息
      infoData:{},
      showAside:false,
      allPrice:""
    };
  },
  components: {
    orderForm,
    orderAside
  },
  mounted() {
    const { query } = this.$route;
    this.$axios({
      url: `airs/${query.id}`,
      params: {
        seat_xid: query.seat_xid
      }
    }).then(res => {
      console.log(res);
      this.showAside=true
      this.infoData = res.data;
    });
  },
  methods:{
      setAllPrice(price){
          this.allPrice=price
      }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>