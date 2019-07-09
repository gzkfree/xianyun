<template>
  <div class="main">
    <el-row type="flex" class="searh">
      <el-autocomplete
        v-model="searchfrom.city"
        :fetch-suggestions="querySearchAsync"
        placeholder="目的地"
        @select="handleSelect"
      ></el-autocomplete>
      <el-date-picker
        v-model="searchfrom.date"
        type="daterange"
        range-separator="-"
        start-placeholder="入住日期"
        end-placeholder="离店日期"
      ></el-date-picker>

      <el-popover
        placement="bottom-start"
        width="300"
        trigger="manual"
        v-model="visible"
        :visible-arrow="false"
      >
        <el-row type="flex">
          <div class="select">
            <span>每间</span>
            <el-select :value="searchfrom.adult+'成人'" placeholder="请选择" size="mini" @change="handleAudltChange">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
              <el-option label="6" value="7"></el-option>
              <el-option label="7" value="7"></el-option>
            </el-select>
            <el-select :value="searchfrom.child+'儿童'" placeholder="请选择" size="mini" @change="handleChildChange">
              <el-option label="0" value="0"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
            </el-select>
          </div>
        </el-row>
        <div slot="reference" @click="visible = !visible" style="margin-left:10px">
          <el-input placeholder="人数未定" suffix-icon="el-icon-user" v-model="searchfrom.peoplenum"></el-input>
        </div>
        <el-button type="primary" size="mini" class="btn_ok" @click="handleOK">确定</el-button>
      </el-popover>
      <el-button type="primary" style=" margin-left: 20px;">查看价格</el-button>
    </el-row>
    <el-row type="flex" class="citydec">
      <el-row class="dec" type="flex">
        <el-row class="area" type="flex">
          <el-col class="title" :span="2">区域：</el-col>
          <el-col class="areaContainer" :span="22">
            <div :class="{'hidden':hidden}">
              <a href>全部</a>
              <a href="#" v-for="(item,index) in cityInfo.scenics" :key="index">{{item.name}}</a>
            </div>
            <div class="btn_exp" @click="handelhidden">
              <span class="el-icon-arrow-down" v-if="hidden"></span>
               <span class="el-icon-arrow-up" v-else></span>
              等{{secences.length}}个区域
            </div>
          </el-col>
        </el-row>
        <el-row class="strategy" type="flex">
          <el-col class="title" :span="2">攻略：</el-col>
          <el-col
            :span="22"
          >北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</el-col>
        </el-row>
        <el-row class="aveprice" type="flex">
          <el-col class="title" :span="2">均价：</el-col>
          <el-col class="title" :span="6">
            <span class="el-icon-star-on"></span>
            <span class="el-icon-star-on"></span>
            <span class="el-icon-star-on"></span>
            <span class="el-icon-star-on"></span>¥332
          </el-col>
          <el-col class="title" :span="6">
            <span class="el-icon-star-on"></span>
            <span class="el-icon-star-on"></span>
            <span class="el-icon-star-on"></span>
            <span class="el-icon-star-on"></span>¥521
          </el-col>
          <el-col class="title" :span="6">
            <span class="el-icon-star-on"></span>
            <span class="el-icon-star-on"></span>
            <span class="el-icon-star-on"></span>
            <span class="el-icon-star-on"></span>¥768
          </el-col>
        </el-row>
      </el-row>
      <div class="map" id="container">地图</div>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchfrom: {
        city: "南京",
        date: "",
        peoplenum: "",
        adult: "2",
        child: "0"
      },
      visible: false,
      hidden: true,
      cityInfo:{},
      secences: []
    };
  },
  methods: {
    //远程搜索输入
    querySearchAsync(value, cb) {
      if (!value) return;
      //请求城市接口
      this.$axios({
        url: "/cities?name=" + value,
        method: "GET"
      }).then(res => {
        console.log(res);
        const { data } = res.data;
        const newData = data.map(v => {
          return {
            ...v,
            value: v.name.replace("市", "")
          };
        });
        cb(newData);
      });
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(newData);
      }, 3000 * Math.random());
    },
    //选择城市触发的事件
    handleSelect(item) {
      this.cityInfo=item
      this.$emit('gethotels',this.cityInfo)
    },
    //选择人数确定的时候触发的时间
    handleOK() {
      this.searchfrom.peoplenum =
      this.searchfrom.adult + "成人 " + this.searchfrom.child + "儿童";
      this.visible = false;
    },
     handleAudltChange: function(v) {
        this.searchfrom.adult = v
      },

      handleChildChange: function(v) {
        this.searchfrom.child = v
      },
    //隐藏景点
    handelhidden() {
      this.hidden = !this.hidden;
    },
  },
  mounted() {
    this.$axios({
      url: "/cities",
      method: "GET",
      params: { name: this.searchfrom.city }
    }).then(res => {
      console.log(res);
      const { data } = res.data;
      this.cityInfo=data[0]
       this.$emit('gethotels',this.cityInfo)
    });
    //加载地图
    window.onLoad = function() {
      var map = new AMap.Map("container");
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=7519550d986c49438a01045df61d476c&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>
<style lang='less' scoped>
.main {
  .searh {
    padding-bottom: 10px;
  }
  .el-autocomplete {
    padding-right: 10px;
  }
  .el-date-picker {
    margin-right: 10px;
  }
  .citydec {
    min-height: 260px;
    .dec {
      flex: 4;
      flex-wrap: wrap;
      .btn_exp {
        font-size: 14px;
        cursor: pointer;
      }
      .area {
        width: 100%;
        font-size: 14px;
        .areaContainer {
          a {
            padding: 0 5px;
            &:hover {
              text-decoration: underline;
              color: #00a6ff;
            }
          }
        }
      }
      .strategy {
        font-size: 14px;
        width: 100%;
      }
      .aveprice {
        width: 100%;
        font-size: 14px;
        .el-icon-star-on {
          color: #ff9900;
        }
      }
    }
    .map {
      flex: 3;
      height: 260px;
      background-color: black;
    }
  }
}
.select {
  padding-bottom: 20px;
  border-bottom: 1px solid #dddddd;
  span {
    margin-right: 40px;
  }
  .el-select {
    width: 100px;
    padding: 0 5px;
  }
}
.btn_ok {
  margin-top: 20px;
  float: right;
}
.hidden {
  height: 40px;
  overflow: hidden;
}
</style>
