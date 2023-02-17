<template>
  <el-container style="height: 100%">
    <!-- 左侧栏 -->
    <el-aside width="auto">
      <!-- 左侧栏控件 -->
      <common-aside></common-aside>
    </el-aside>
    <!-- 右侧栏 -->
    <el-container>
      <!-- header部分 -->
      <el-header> 
		<common-header></common-header>
	</el-header>
      <!-- 内容区域 -->
      <el-main>
		<!-- 加入面包屑tab区域 -->
		<common-tab></common-tab>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import commonTab from 'components/CommonTab'
import commonAside from "components/CommonAside";
import commonHeader from 'components/CommonHeader'
export default {
  name: "mainIndex",
  components: { commonAside,commonHeader,commonTab },
  mounted(){

  }
};
</script>

<style>
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 0px;
  background-color: #f5f5f5;
}
</style>
