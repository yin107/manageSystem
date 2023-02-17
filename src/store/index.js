import Vue from "vue";
import Vuex from "vuex";
import Cookie from "js-cookie";
Vue.use(Vuex);
function findItem(arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] == val) {
      return i;
    }
  }
  return -1;
}
const store = new Vuex.Store({
  state: {
    userInfo: {},
    iscollapse: false, //false表示侧边导航栏展开
    menu: [{ path: "/", name: "home", title: "首页" }],
    currentMenu: [],
    tabsList: [{ path: "/", name: "home", title: "首页" }],
    token: "",
  },
  mutations: {
    // 存放token
    setToken(state, val) {
      state.token = val;
      Cookie.set("token", val);
    },
    // 获取token
    getToken(state) {
      state.token = Cookie.get("token");
    },
    // 清除token
    clearToken(state) {
      state.token = "";
      Cookie.remove("token");
    },
    setMenu(state, val) {
      state.currentMenu = val;
    },
    addMenu(state, router) {
      //添加动态路由 主路由为Main.vue
      let currentMenu = {
        path: "/",
        component: () => import(`@/views/Mainindex`),
        children: [],
      };
      //将根据登录用户返回的路由添加到main的子路由中
      //   currentMenu.children.push(...state.currentMenu);//...state.currentMenu 会造成里面import导入的component属性丢失
      //如果是以及菜单，那么菜单名称肯定有路由 如果是二级菜单，一级没有，二级有路由
      state.currentMenu.forEach((item) => {
        if (item.children) {
          item.children = item.children.map((item) => {
            item.component = () => import(`@/views${item.url}`);
            return item;
          });
          currentMenu.children.push(...item.children);
        } else {
          item.component = () => import(`@/views${item.url}`);
          currentMenu.children.push(item);
        }
      });
      router.addRoute(currentMenu);
    },
    // 侧边栏是否展开
    collapseMenu(state) {
      state.iscollapse = !state.iscollapse;
    },
    //获取用户信息
    getuserInfo(state, payload) {
      state.userInfo = payload;
    },
    //选择标签，选择面包屑
    selectMenu(state, payload) {
      let obj = {
        path: payload.path,
        title: payload.meta.title,
        name: payload.name,
      };
      if (
        payload.name != "home" &&
        findItem(state.tabsList, "title", obj.title) == -1
      ) {
        state.tabsList.push(obj);
      }
      if (payload.name != "home") {
        if (state.menu.length == 2) {
          state.menu.pop();
        }
        state.menu.push(obj);
      }
      if (payload.name == "home" && state.menu.length == 2) {
        state.menu.pop();
      }
    },
    closetag(state, payload) {
      state.tabsList.splice(state.tabsList.indexOf(payload), 1);
    },
  },
});
export default store;
