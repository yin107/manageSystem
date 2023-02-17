<template>
  <div style="color: aliceblue;height: 60px;line-height: 60px;display: flex;justify-content: space-between;">
    <div class="l-content" style="display: flex;align-content:space-around;align-items: center;">
      <el-button icon="el-icon-menu" @click="collapseMenu"></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left:20px;" separator="/">
        <el-breadcrumb-item v-for="(item,index) in $store.state.menu"  :key="index" :to="{name:item.name}"> {{ item.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="r-content" >
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <div style="height: 60px; display: flex; align-items: center">
            <el-avatar :size="40" :src="$store.state.userInfo.img"></el-avatar>
          </div>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "commonHeader",
  data(){
	return {

	}
  },
  computed:{
	current(){
		return this.$store.state.currentMenu
	}
  },
  methods: {
	gotoclick(item){
		console.log(item);
	},
    collapseMenu() {
      this.$store.commit("collapseMenu");
    },
	logOut(){
		//登出的时候，需要清除token以及
		this.$store.commit('clearToken')
		location.reload()//强制页面刷新
	}
  },
};
</script>

<style></style>
