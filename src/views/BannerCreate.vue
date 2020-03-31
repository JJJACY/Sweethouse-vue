<template>
  <div class="container">
    <div class="header">
      <div class="title">轮播图添加</div>
      <el-button type="success" @click="handleReturn">返回</el-button>
    </div>
    <div class="body">
      <div class="uploader">
        <p class="uploader-title">* 展示图</p>
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :http-request="handleCover"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="image_url" :src="image_url" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="path">
        <div style="margin-top: 15px;" class="input-path">
          <el-input
            placeholder="请输入目标网址"
            v-model="page_path"
            @change="changePath"
          >
            <template slot="prepend">http://</template>
            <template slot="append">.com</template>
          </el-input>
        </div>
      </div>
    </div>
    <div class="submit-btn">
      <el-button type="success" @click="handleSubmit">确认添加</el-button>
    </div>
  </div>
</template>

<script>
import qiniuService from "@/global/service/qiniu";
import bannerService from "@/global/service/banner";

export default {
  data() {
    return {
      image_url: "",
      page_path: ""
    };
  },
  created() {},
  methods: {
    handleReturn() {
      this.$router.push({ name: "banner" });
    },
    handleCover(files) {
      qiniuService.upload(files.file).then(res => {
        this.image_url = res;
      });
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    changePath() {
      let page_url = "http://" + this.page_path + ".com";
      console.log(page_url);
    },
    handleSubmit() {
      if (!this.image_url || !this.page_path) {
        this.$message.error("缺少参数");
        return;
      }
      let params = {
        image_url: this.image_url,
        page_url: "http://" + this.page_path + ".com"
      };
      console.log(params);
      bannerService.insert(params).then(res => {
        if (res.code === 200) {
          this.$message({
            meessage: res.message,
            type: "success"
          });
          this.$router.push({ name: "banner" });
        } else {
          this.$message(res.message);
        }
      });
    }
  }
};
</script>

<style>
.uploader {
  display: flex;
  font-size: 15px;
  color: #606266;
}
.uploader-title {
  width: 100px;
  font-size: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.input-path {
  width: 400px;
}
.submit-btn {
  float: left;
  margin-top: 30px;
}
</style>
