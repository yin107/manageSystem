const dynamicUser = [
  {
    name: "管理员",
    avatar:
      "https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/ccb565eca95535ab2caac9f6129b8b7a~300x300.image",
    desc: "管理员 - admin",
    username: "admin",
    // password: "654321",
    token: "rtVrM4PhiFK8PNopqWuSjsc1n02oKc3f",
    routes: [
      {
        path: "/",
        name: "home",
        icon: "s-home",
        meta: {
          title: "首页",
        },
        url: "/Home/Home",
      },
      {
        path: "/mall",
        name: "mall",
        icon: "video-play",
        meta: {
          title: "商品管理",
        },
        url: "/MallManage/MallManage",
      },
      {
        path: "/user",
        name: "user",
        icon: "user",
        meta: {
          title: "用户管理",
        },
        url: "/UserManage/UserManage",
      },
      {
        path: "/other",
        icon: "location",
        meta: {
          title: "其他",
        },
        url: "/Other/index",
        children: [
          {
            path: "/page1",
            name: "page1",
            icon: "setting",
            meta: {
              title: "页面1",
            },
            url: "/Other/PageOne",
          },
          {
            path: "/page2",
            name: "page2",
            icon: "setting",
            meta: {
              title: "页面2",
            },
            url: "/Other/PageTwo",
          },
        ],
      },
    ],
  },
  {
    name: "普通用户",
    avatar:
      "https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/6364348965908f03e6a2dd188816e927~300x300.image",
    desc: "普通用户 - people",
    username: "people",
    // password: "123456",
    token: "4es8eyDwznXrCX3b3439EmTFnIkrBYWh",
    routes: [
      {
        path: "/",
        name: "home",
        icon: "s-home",
        meta: {
          title: "首页",
        },
        url: "/Home/Home",
      },
      {
        path: "/mall",
        name: "mall",
        icon: "video-play",
        meta: {
          title: "商品管理",
        },
        url: "/MallManage/MallManage",
      },
    ],
  },
];

export default {
  getdynamicUser: (config) => {
    const { username, password } = JSON.parse(config.body);
    //先判断用户是否存在
    if (username === "admin" || username === "people") {
      //判断账号和密码是否对象
      if (username === "admin" && password === "654321") {
        return {
          code: 200,
          message: "登录成功",
          data: dynamicUser.filter((item) => {
            return item.username === username;
          }),
        };
      } else if (username === "people" && password === "123456") {
        return {
          code: 200,
          message: "登录成功",
          data: dynamicUser.filter((item) => {
            return item.username === username;
          }),
        };
      } else {
        return { code: 404, data: { message: "密码错误" } };
      }
    } else {
      return { code: 404, data: { message: "用户不存在" } };
    }
  },
};
