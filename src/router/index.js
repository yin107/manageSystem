import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
const routers = [
	{
		path:'/',
		name:'login',
		component:()=>import('views/Login/Login')
	}
//   {
//     path: "/",
//     component: () => import("views/Mainindex"),
//     children: [
//       {
//         path: "/",
//         name: "home",
//         meta: {
//           title: "首页",
//         },
//         component: () => import("views/Home/Home"),
//       },
//       {
//         path: "/mall",
//         name: "mall",
//         meta: {
//           title: "商品管理",
//         },
//         component: () => import("views/MallManage/MallManage"),
//       },     {
//         path: "/user",
//         name: "user",
//         meta: {
//           title: "用户管理",
//         },
//         component: () => import("views/UserManage/UserManage"),
//       },
//       {
//         path: "/other",
//         component: () => import("views/Other/index"),
//         children: [
//           {
//             path: "/page1",
//             name: "page1",
//             meta: {
//               title: "页面1",
//             },
//             component: () => import("views/Other/PageOne"),
//           },
//           {
//             path: "/page2",
//             name: "page2",
//             meta: {
//               title: "页面2",
//             },
//             component: () => import("views/Other/PageTwo"),
//           },
//         ],
//       },
//     ],
//   },
];
const router = new Router({ routes: routers });
export default router;
