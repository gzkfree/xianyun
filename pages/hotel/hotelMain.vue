<template>
    <div class='container'>
        <!-- 面包屑 -->
        <div class='hotelNav'>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                 <el-breadcrumb-item :to="{ path: '/' }">酒店</el-breadcrumb-item>
                 <el-breadcrumb-item>地方酒店</el-breadcrumb-item>
                 <el-breadcrumb-item>具体酒店</el-breadcrumb-item>
             </el-breadcrumb>
        </div>
        <!-- 标题 -->
        <div class='hotelName'>
            <el-row type="flex"  class="title">
                <h4>天上人家</h4>
                 <span>
                     <i class='el-icon-medal'></i>
                 </span>
            </el-row>
            <span>tianshangrenjian</span>    
             <el-row>
                 <i class='el-icon-location'></i> <span>地址：XXXXX</span>
             </el-row>
        </div>
        <!-- 图片 -->
        <div class='hotelPic'>
            <div class='main'>
                <div class='left'><img src="http://157.122.54.189:9093/images/hotel-pics/4.jpeg" alt=""></div>
                <div class='right'>
                    <ul>
                        <li>
                            <div>
                                <a href=""><img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt=""></a>
                            </div>
                        </li>
                        <li>
                            <div>
                                <a href=""><img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt=""></a>
                            </div>
                        </li>
                        <li>
                            <div>
                                <a href=""><img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt=""></a>
                            </div>
                        </li>
                        <li>
                            <div>
                                <a href=""><img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt=""></a>
                            </div>
                        </li>
                        <li>
                            <div>
                                <a href=""><img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt=""></a>
                            </div>
                        </li>
                        <li>
                            <div>
                                <a href=""><img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt=""></a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div> 
        <!-- 外部链接及标价 -->
        <div class='externalLinks'>
            <el-main>
                <el-table :data="tableData">
                    <el-table-column prop="date" label="价格来源" width='420px'>
                    </el-table-column>
                    <el-table-column prop="name" label="低价房型" width='420px'>
                    </el-table-column>
                    <el-table-column prop="address" label="最低价格">
                    </el-table-column>
                </el-table>
             </el-main>
        </div>
        <!-- 地图 -->
        <div class='map'>
            <div id="container"></div>
            <div class='tiele'>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
                    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <!-- 酒店详情 -->
       
        <!-- 评分 -->
        <div class='rate'>
            <h4>4条真实用户评论</h4>
            <div class='fenshu'>
                <div>
                    <p>总评数：9</p>
                    <p>好评数：1</p>
                    <p>差评数：8</p>
                </div>
                <div class='xingxing'>
                    <el-rate
                      v-model="value"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate>
                </div>
                <div class='wenzi'>环境</div>
                <div class='wenzi'>产品</div>
                <div class='wenzi'>服务</div>
                </div>
        </div>
    </div>
</template>

<script>
export default {
   data() {
      return {
           activeName: 'second',
           value:3.7
      }
   },
   methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
   activated() {
   },
    mounted(){
        window.onLoad  = function(){
            var map = new AMap.Map('container', {
                zoom:11,//放大级别
                center: [116.397428, 39.90923], //中心点坐标
                viewMode:'3D' //使用3D视图
            });
        }
        
        var key = "7f39dad939dd388e90c30ca343e985cc"; // 你的key
        var url = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad`;
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
    }
  }
  
</script>
<style lang='less' scoped>
    .container{
        margin: auto;
        width: 1000px;
        .hotelNav{
            height: 54px;
            .el-breadcrumb{
              line-height: 54px;  
            }    
        }
        .hotelName{
            .title{
                color: #333;
                font-weight: 400;
                font-size: x-large;
            }
        }
        .hotelPic{
            margin-top: 40px;
            margin-bottom: 40px;
            .main{
                height: 373px;
                .left{
                    width: 640px;
                    height: 364px;
                    margin-right: 10px;
                    float: left;
                    img{
                        width: 640px;
                        height: 364px;
                    }
                }
                .right{
                    width: 340px;
                    float: right;
                    ul{
                        li{
                             float: left;
                            padding-right: 10px;
                            padding-bottom: 13px;
                            a{
                                margin-bottom: 10px;
                                img{
                                    width: 160px;
                                    height: 110px;
                                    }
                            }
                        }
                    }
                    
                }
            }
        }
        .map{
        margin: auto;
        width: 1000px;
        margin-top: 40px;
        margin-bottom: 40px;
        height: 360px;
        #container{
            width: 650px;
            height: 360px;
            float: left;
        }
        .tiele{
          width: 330px;
          float:right;
        }
    }
    .main{
            margin-bottom: 40px;
            table{
                tr{
                    td{
                        height: 60px;
                        line-height: 60px;
                        border-bottom:1px solid gray;
                    }
                    .left{
                        width: 162px;
                    }
                    .right{
                        width: 840px;
                    }
                }
            }
        }
     .rate{
            .fenshu{
                height: 114px;
                padding:20px;
                div{
                    float: left;
                    width: 125px;
                }
                 .xingxing{
                        width: 220px;
                }
              
            }
        }
}
</style>
