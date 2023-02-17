import axios from "axios";
export function request(config) {
  const instance = axios.create({
    //https://www.fastmock.site/mock/b7da26133fab0e187542cfe12815754f/system
    baseURL:
      "https://www.fastmock.site/mock/b7da26133fab0e187542cfe12815754f/system",
    timeout: 50000,
  });
  //再次基础上可以添加请求拦截器和响应拦截器

  return instance(config);
}
export function request1(config) {
  const instance = axios.create({
    baseURL: "http://localhost:8080/",
    timeout: 50000,
  });
  //再次基础上可以添加请求拦截器和响应拦截器

  return instance(config);
}
