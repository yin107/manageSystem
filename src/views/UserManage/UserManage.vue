<template>
  <div style="margin-top: 20px">
    <!-- 对表格数据的操作 -->
    <div class="manage-header">
      <el-button type="primary" @click="addUser" size="small">+新增</el-button>
      <el-form :inline="true" :model="searchform" class="demo-form-inline">
        <el-form-item>
          <el-input
            v-model="searchform.keyword"
            placeholder="输入关键字"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="getdata(searchform.keyword)"
            size="small"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column label="序号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            (config.page - 1) * 20 + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        width="180"
        v-for="(item, index) in tableLabel"
        :key="item.label"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="config.total"
        :page-size="20"
        @current-change="changePage"
      >
      </el-pagination>
    </div>
    <!-- 更新用户、新增用户 form表单-->
    <el-dialog
      :title="oprateType == 'edit' ? '更新用户' : '新增用户'"
      :visible.sync="isshow"
      width="30%"
    >
      <span slot="footer" class="dialog-footer"
        ><el-form
          label-position="right"
          label-width="80px"
          :model="formLabelAlign"
          ref="form"
        >
          <el-form-item
            :label="item.label"
            v-for="(item, index) in formLable"
            :key="item.label"
          >
            <el-input
              v-model="formLabelAlign[item.model]"
              v-if="item.type == 'input'"
              :placeholder="'请输入' + item.label"
            ></el-input>

            <el-select
              v-if="item.type == 'select'"
              v-model="formLabelAlign[item.model]"
            >
              <el-option
                v-for="item in item.opts"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-date-picker
              v-if="item.type == 'date'"
              placeholder="'选择日期'"
              v-model="formLabelAlign[item.model]"
              type="date"
              value-format="yyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <el-button @click="isshow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { request1 } from "api/config.js";
export default {
  data() {
    return {
      oprateType: "add",
      tableLabel: [
        { prop: "name", label: "姓名" },
        { prop: "age", label: "年龄" },
        {
          prop: "sex",
          label: "性别",
        },
        { prop: "birth", label: "出生日期" },
        { prop: "addr", label: "地址" },
      ],
      tableData: [],
      config: { page: 1, total: 30, load: false },
      isshow: false,
      formLabelAlign: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      formLable: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      searchform: { keyword: "" },
    };
  },
  methods: {
    getdata(name = "") {
      this.config.load = true;
      //搜索时，页码需要设置为1，才能正确返回数据格式，因为数据是从第一页开始返回的
      name ? (this.config.page = 1) : "";
      request1({
        url: "/user/getUser",
        method: "get",
        params: {
          page: this.config.page,
          name,
        },
      }).then((res) => {
        this.config.total = res.data.count;
        const response = res.data;
        this.tableData = response.list;
        this.tableData = this.tableData.filter((item) => {
          //对返回的数据进行修改，不用render函数
          item.sex = item.sex == 1 ? "男" : "女";
          return item;
        });
      });
    },
    //编辑元素
    handleEdit(index, row) {
      this.oprateType = "edit";
      this.isshow = true;
      this.formLabelAlign = row;
    },
    //删除元素
    handleDelete(index, row) {
      //不是删除获取来的数据，要返回给后端进行删除
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let id = row.id; //根据唯一的id号去后端进行删除
          request1({
            url: "/user/del",
            method: "get",
            params: { id },
          }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getdata();
          });
        })
        .catch((error) => {
          console.log(error);
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    changePage(page) {
      console.log(page);
      this.config.page = page;
      this.getdata();
    },
    //确认编辑操作
    confirm() {
      const data = this.formLabelAlign;
      //修改数据的时候，也是将修改的内容，传递给后端，来修改数据的
      if (this.oprateType == "edit") {
        request1({
          url: "/user/edit",
          method: "post",
          data: data,
        }).then((res) => {
          this.isshow = false;
          this.getdata();
        });
      } else {
        //添加用户
        request1({
          url: "/user/add",
          method: "post",
          data: data,
        }).then((res) => {
          this.isshow = false;
          this.getdata();
        });
      }
    },
    //新增用户
    addUser() {
      this.oprateType = "add";
      this.isshow = true;
    },
  },
  mounted() {
    this.getdata();
  },
};
</script>

<style>
.manage-header {
  width: 100%;
  margin: 20px 20px;
  display: flex;
  justify-content: space-between;
}
</style>
