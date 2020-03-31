<template v-if="isRouterAlive">
  <div class="container">
    <div class="header">
      <div class="title">商品分类</div>
      <el-button type="text" @click="dialogFormVisible = true">添加</el-button>
      <el-dialog title="请添加分类" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item
            label="名称"
            :label-width="formLabelWidth"
            size="medium"
          >
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handlecreate">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="body">
      <el-table :data="tableDate">
        <el-table-column label="分类名称">
          <template slot-scope="scope">
            <el-tag type="info">{{ scope.row.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleEdit(scope.$index, scope.row)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import classifyService from "@/global/service/classify";
export default {
  data() {
    return {
      tableDate: [],
      dialogFormVisible: false,
      form: {
        name: ""
      },
      formLabelWidth: "40px"
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      classifyService.all().then(res => {
        this.tableDate = res.data;
      });
    },
    handlecreate() {
      let params = {
        name: this.form.name
      };
      console.log(params);
      classifyService.insert(params).then(res => {
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
        }
        this.getData();
        this.dialogFormVisible = false;
      });
    },
    handleEdit(index, row) {
      let id = row.id;
      this.$prompt("请输入商品分类", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (!value) {
            this.$message.error("不能提交空值");
            return;
          }
          let params = { name: value };
          classifyService.update(id, params).then(res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "你成功将分类修改为: " + value
              });
            }
          });
          this.getData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    handleDelete(index, row) {
      let id = row.id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          classifyService.delete(id).then(res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.message
              });
            }
          });
          this.tableDate.splice(index, 1);
          this.getData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
script
