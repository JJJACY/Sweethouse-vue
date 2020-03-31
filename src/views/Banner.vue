<template>
  <div class="container">
    <div class="header">
      <div class="title">轮播图管理</div>
      <el-button type="primary" @click="handleInsert">添加</el-button>
    </div>
    <div class="body">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in pictureData" :key="item.id">
          <el-card
            :body-style="{ padding: '30px 8px 8px 8px' }"
            class="el-card"
          >
            <div class="close" @click="handleDelete(item)">
              <i class="el-icon-circle-close"></i>
            </div>
            <el-image class="image" fit="contain" :src="item.image_url">
            </el-image>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import bannerService from "@/global/service/banner";
export default {
  data() {
    return {
      pictureData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      bannerService.all().then(res => {
        this.pictureData = res.data;
      });
    },
    handleInsert() {
      this.$router.push({ name: "bannerCreate" });
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该轮播图, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let id = row.id;
        console.log(id);
        bannerService
          .delete(id)
          .then(res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.message
              });
              this.getData();
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      });
    }
  }
};
</script>
