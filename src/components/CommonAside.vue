<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    style="height: 100%; width: auto"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="$store.state.iscollapse"
  >
    <h3 style="text-align: center">small</h3>
    <!-- 分为有子路由和无子路由的导航 -->
    <el-menu-item
      v-for="item in noChildren"
      :key="item.name"
      :index="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.meta.title }}</span>
    </el-menu-item>
	<el-submenu
      v-for="(item, index) in hasChildren"
      :key="index"
      :index="item.meta.title"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.meta.title}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="subItem.path"
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
          @click="clickMenu(subItem)"
        >
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{ subItem.meta.title }}</span></el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  
  </el-menu>
</template>

<script>
export default {
  name: "commonAside",
  computed: {
    noChildren() {
      return this.menuList.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menuList.filter((item) => item.children);
    },
    menuList() {
      return this.$store.state.currentMenu;
    },
  },
  data() {
    return {
      //   menuList: [
      //     {
      //       path: "/",
      //       name: "home",
      //       label: "首页",
      //       icon: "s-home",
      //       url: "Home/Home",
      //     },
      //     {
      //       path: "/mall",
      //       name: "mall",
      //       label: "商品管理",
      //       icon: "video-play",
      //     },   {
      //       path: '/user',
      //       name: 'user',
      //       label: '用户管理',
      //       icon: 'user',
      //       url: 'UserManage/UserManage'
      //     },
      //     {
      //       label: "其他",
      //       icon: "location",
      //       children: [
      //         {
      //           path: "/page1",
      //           name: "page1",
      //           label: "页面1",
      //           icon: "setting",
      //           url: "Other/PageOne",
      //         },
      //         {
      //           path: "/page2",
      //           name: "page2",
      //           label: "页面2",
      //           icon: "setting",
      //         },
      //       ],
      //     },
      //   ],//这个路由数组不能写死了，要根据登录的对象来选择，由后端返回，可以放在vuex中进行存储
    };
  },
  mounted() {
    let matched = this.$route.matched.filter((item) => item.name);
    this.$store.commit("selectMenu", matched[0]);
  },
  methods: {
    // 点击后实现路由的跳转
    clickMenu(item) {
      //使用动态路由将路由添加进去
      this.$router.push({ name: item.name });
    },
  },
  watch: {
    $route: {
      //监听路由的修改改变面包屑
      handler() {
        let matched = this.$route.matched.filter((item) => item.name);
        //以及修改面包屑
        this.$store.commit("selectMenu", matched[0]);
      },
    },
  },
};
</script>

<style>
.el-menu {
  text-align: left;
  border-right: 0px;
}
</style>
