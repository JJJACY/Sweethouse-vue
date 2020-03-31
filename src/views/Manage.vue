<template>
  <div class="container">
    <section v-if="!lock">
      <div class="header">
        <div class="title">管理员列表</div>
        <el-button type="primary" @click="handlecreate">添加</el-button>
      </div>
      <div class="body">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="role" label="角色" width="180">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status === '管理员' ? 'warning' : 'success'"
                >{{ scope.row.status }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="phone" label="手机号"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleEdit(scope.row)"
                >修改</el-button
              >
              <el-button
                v-if="scope.row.status !== '管理员'"
                size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
    <section v-else>
      <div class="auth">您没有管理员权限</div>
    </section>
  </div>
</template>

<script>
import manageService from "@/global/service/manage";
import DataStore from "@/global/storage/index";

export default {
  data() {
    return {
      tableData: [],
      lock: false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      manageService.all().then(res => {
        if (res.data) {
          res.data.forEach(arr => {
            switch (arr.status) {
              case 0:
                arr.status = "管理员";
                break;
              case 1:
                arr.status = "运营";
                break;
              default:
                arr.status = "we are under attack!";
            }
            this.tableData = res.data;
          });
        }
      });
      let status = DataStore.getStatus();
      status === 0 ? (this.lock = false) : "";
    },
    handlecreate() {
      this.$router.push({ name: "managecreate" });
    },
    handleEdit(row) {
      let id = row.id;
      this.$router.push({ name: "manageedit", params: { id } });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let id = row.id;
          manageService.delete(id).then(res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.message
              });
              this.tableData.splice(index, 1);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      this.getData();
    }
  }
};
</script>
