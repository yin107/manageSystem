<template>
  <el-row :gutter="20" v-if="this.tableData.length">
    <el-col :span="8">
      <el-card class="box-card" style="margin-top: 10px">
        <div slot="header" class="clearfix">
          <div class="user">
            <div class="userimg">
              <el-avatar :size="200" :src="user.img"></el-avatar>
            </div>
            <div class="userinfo">
              <p class="name" style="font-size: 25px">{{ user.name }}</p>
              <p class="acess">{{ user.type }}</p>
            </div>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录的时间：{{ user.lastlogin }}</p>
          <p>上次登录的地点：{{ user.lastaddress }}</p>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 10px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="课程"> </el-table-column>
          <el-table-column prop="todayBuy" label="今日购买"> </el-table-column>
          <el-table-column prop="monthBuy" label="本月购买"> </el-table-column>
          <el-table-column prop="totalBuy" label="总购买"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          class="num-item"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <div class="item-icon" :style="'backgroundColor:' + item.color">
            <i :class="'el-icon-' + item.icon"></i>
          </div>
          <div class="item-text">
            <p style="font-size: 25px">￥ {{ item.value }}</p>
            <p>{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="margin-top: 20px"
        ><Echarts
          :chartData="echartData.order"
          style="height: 280px"
          v-if="echartData.order.xData.length"
        ></Echarts>
      </el-card>
      <el-row>
        <el-col :span="12" style="margin-top: 20px">
          <el-card>
            <Echarts
              :chartData="echartData.user"
              style="height: 240px"
              v-if="echartData.user.xData.length"
            ></Echarts>
          </el-card>
        </el-col>
        <el-col :span="12" style="margin-top: 20px">
          <el-card>
            <Echarts
              :chartData="echartData.video"
              style="height: 240px"
              v-if="echartData.video.series.length"
              :isAxisChart="false"
            ></Echarts>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import Echarts from "components/ECharts";
import { request } from "api/config";
export default {
  name: "homeView",
  components: { Echarts },
  data() {
    return {
      tableData: [],
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData: {
        order: {
          //折线图
          xData: [],
          series: [],
        },
        user: {
          //直方图
          xData: [],
          series: [],
        },
        //饼状图，不需要横坐标
        video: {
          series: [],
        },
      },
    };
  },
  mounted() {
    this.getTableData();
    this.getUserInfo();
  },
  computed: {
    user() {
      return this.$store.state.userInfo;
    },
  },
  methods: {
    getTableData() {
      request({
        url: "/home/getData",
        methods: "get",
      }).then((res) => {
        this.tableData = res.data.data.tableData; //获取表格数据
        //订单折线图
        const order = res.data.data.orderData;
        this.echartData.order.xData = order.date;
        //数据处理
        //1、取出series需要的name部分-键名
        let keyArray = Object.keys(order.data[0]); //['苹果','vivo','oppo','。。。']
        //2、循环添加数据
        keyArray.forEach((key) => {
          this.echartData.order.series.push({
            name: key === "wechat" ? "小程序" : key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        //用户柱状图
        const user = res.data.data.userData;
        this.echartData.user.xData = user.map((item) => item.date);
        this.echartData.user.series.push({
          name: "新增客户",
          data: user.map((item) => item.new),
          type: "bar",
        });
        this.echartData.user.series.push({
          name: "活跃客户",
          data: user.map((item) => item.active),
          type: "bar",
          barGap: 0,
        });
        //饼状图
        const video = res.data.data.videoData;
        this.echartData.video.series.push({
          data: video,
          type: "pie",
        });
      });
    },
    getUserInfo() {
      request({
        url: "/home/userinfo",
        methods: "get",
      }).then((res) => {
        this.$store.commit("getuserInfo", res.data.data);
      });
    },
  },
};
</script>

<style scoped>
.num {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-around;
}
.num-item {
  width: 290px;
  margin-top: 20px;
}
.item-icon {
  width: 40%;
  line-height: 116.9px;
}
.item-text {
  text-align: center;
  flex: 1;
}
.user {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
}
.userinfo {
  margin-left: 60px;
}
</style>
