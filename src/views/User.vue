<template>
  <div class="container">
    <div class="header">
      <div class="title">用户页</div>
    </div>
    <div class="body">
      <div class="select">
        <el-input
          style="width:200px;margin:20px"
          v-model="nickname"
          placeholder="请输入昵称"
          @change="getData"
          clearable
        >
        </el-input>
      </div>
      <el-table :data="userData" style="width: 100%;">
        <el-table-column label="头像">
          <template slot-scope="scope">
            <el-image
              style="width: 60px; height: 60px"
              :src="scope.row.avatar"
              fit="fill"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称"> </el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleSingle(scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        layout="prev, pager, next"
        :page-size="pagination.pageSize"
        :pager-count="7"
        :current-page.sync="pagination.nowPage"
        :total="pagination.total"
        @current-change="getData"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import userService from "@/global/service/user.js";
export default {
  data() {
    return {
      nickname: "",
      userData: [],
      pagination: {
        pageSize: 10,
        total: 0,
        nowPage: 1
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let params = {
        pageSize: this.pagination.pageSize,
        nowPage: this.pagination.nowPage,
        nickname: this.nickname
      };
      userService.all(params).then(res => {
        if (res.data) {
          res.data.forEach(arr => {
            switch (arr.sex) {
              case 0:
                arr.sex = "男";
                break;
              case 1:
                arr.sex = "女";
                break;
              default:
                arr.sex = "参数不存在！！！";
            }
            this.userData = res.data;
            this.pagination.total = res.total;
          });
        }
      });
    },
    handleSingle(row) {
      let id = row.id;
      this.$router.push({ name: "usersingle", params: { id } });
    }
  }
};
</script>
