<template>
  <div style="height: 100%" ref="echart">rcharts</div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: {
    //接受父组件数据：1、chartData（series数据+x轴坐标系数据）
    //2、isAxisChart（是否有x坐标系，如果为false，则xData就为空）
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        };
      },
    },
    isAxisChart: {
      type: Boolean,
      default: true,
    },
  },
  computed:{
options(){
	return this.isAxisChart?this.axisOption:this.normalOption
}
  },
  data() {
    return {
      echart: null,
      axisOption: {
        legend: { textStyle: { color: "#333" } },
        grid: { left: "20%" },
        tooltip: { trigger: "axis" },
        xAxis: {
          type: "category",
          data: [], //横坐标
          axisLine: { lineStyle: { color: "#17b3a3" } },
          axisLabel: { color: "#333" },
          boundaryGap: false,
        },
        yAxis: [
          {
            type: "value",
            axisLine: { lineStyle: { color: "#17b3a3", type: "dashed" } },
            axisLabel: { color: "#333" },
          },
        ],
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
          "#e5cf0d",
          "#97b552",
          "#95706d",
          "#dc69aa",
          "#07a2a4",
          "#9a7fd1",
          "#588dd5",
          "#f5994e",
          "#c05050",
          "#59678c",
          "#c9ab00",
          "#7eb00a",
          "#6f5553",
          "#c14089",
        ],
        series: [], //要展示的数据
      },
      normalOption: {
        tooltip: { trigger: "item" },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      },
    };
  },
  mounted() {
    this.initChart();
	//resize改变图标尺寸，在容器大小发生改变时需要手动调用，（因为侧边栏是可以收缩的，所以图标根据是否收缩来改变尺寸）
	window.addEventListener('resize',this.resizeChart)
  },
  watch: {
	//实际中数据是在不断变化的
    chartData: {
      handler: function () {
        this.initChart();
      },
      deep: true,
    },
  },
  methods: {
    initChart() {
      //获取处理好的数据
      this.initChartData();
      if (this.echart) {
        this.echart.setOption(this.options);
      } else {
        this.echart = echarts.init(this.$refs.echart);
        this.echart.setOption(this.options);
      }
    },
    //处理数据
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
      } else {
        //饼状图不需要横坐标
        this.normalOption.series = this.chartData.series;
      }
    },
	resizeChart(){
		this.echart?this.echart.resize():""
	}
  },
  destoryed(){
	window.removeEventListener('resize',this.resizeChart)
  }
};
</script>

<style></style>
