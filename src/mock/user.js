import Mock from "mockjs";
let { List } = Mock.mock({
  "List|200": [
    {
      id: "@guid()",
      name: "@cname()",
      addr: "@county(true)",
      birth: "@date()",
      sex: "@integer(0,1)",
      "age|18-60": 1,
    },
  ],
});
//get请求从config.url中获取参数，oost从config.body中获取参数
function param2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

export default {
  getUserList: (config) => {
    //返回页数，返回每页的数据
    //需要对configurl里面的参数进行提取
    const { name, page = 1, limit = 20 } = param2Obj(config.url);
    console.log(name, page, limit);
    const mockList = List.filter((user) => {
		if(name && user.name.indexOf(name)===-1 &&user.addr.indexOf(name)===-1)return false
      return true;
    });
    const pageList = mockList.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1)
    );
    return {
      code: 200,
      list: pageList,
      count: mockList.length,
    };
  },
  deleteUser:config=>{
	const {id}=param2Obj(config.url)
	if(!id){
		return {code:-999,message:'参数不正确'}
	}else{
		List=List.filter(u=>u.id!==id)
		return {code:200,message:'删除成功'}
	}
  },
  updateUser:config=>{
	const {id,name,addr,age,birth,sex}=JSON.parse(config.body)
	const sex_num=parseInt(sex)
	List.some(u=>{
		if(u.id===id){
			u.name=name
			u.addr=addr
			u.age=age
			u.birth=birth
			u.sex=sex_num
			return true
		}
	})
	return {
		code:200,
		data:{
			message:'编辑成功'
		}
	}
  },
  addUser:config=>{
	const {name,addr,age,birth,sex}=JSON.parse(config.body)
	List.unshift({
		id:'@guid()',
		name:name,
		addr:addr,
		age:age,
		birth:birth,
		sex:sex
	})
	return {
		code:200,
		data:{
			message:'添加成功'
		}
	}
  }
};

