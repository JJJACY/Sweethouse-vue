<template>
  <div class="sku">
    <div class="header">
      <p class="title">商品 SKU</p>
      <el-button type="parimary" @click="handleback">🔙</el-button>
    </div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div class="top">
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              action=""
              :http-request="handleSkuImage"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="skuFrom.image_url"
                :src="skuFrom.image_url"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="bottom">
            <el-form
              class="form"
              :model="skuFrom"
              :rules="rules"
              ref="skuForm"
              label-position="left"
              label-width="55px"
            >
              <el-form-item label="id" prop="product_id" style="width:100%;">
                <el-input v-model="skuFrom.product_id" clearable></el-input>
              </el-form-item>
              <el-form-item label="数量" prop="number" style="width:100%;">
                <el-input v-model="skuFrom.number" clearable></el-input>
              </el-form-item>
              <el-form-item label="价格" prop="price" style="width:100%;">
                <el-input v-model="skuFrom.price" clearable></el-input>
              </el-form-item>
              <el-form-item label="图片" prop="image_url" style="width:100%;">
                <el-input v-model="skuFrom.image_url" clearable></el-input>
              </el-form-item>
              <el-form-item label="库存" prop="stock" style="width:100%;">
                <el-input v-model="skuFrom.stock" clearable></el-input>
              </el-form-item>
              <el-form-item label="已售" prop="sold" style="width:100%;">
                <el-input v-model="skuFrom.sold" clearable></el-input>
              </el-form-item>
              <el-form-item label="状态" prop="status" style="width:100%;">
                <el-input v-model="skuFrom.status" clearable></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="footer">
      <el-button type="success" @click="handleSubmit">上传</el-button>
    </div>
  </div>
</template>

<script>
import qiniuService from "@/global/service/qiniu";
import skusService from "@/global/service/skus";
export default {
  data() {
    return {
      skuFrom: {
        product_id: "",
        image_url: "",
        number: "",
        price: "",
        stock: "",
        sold: "",
        status: ""
      },
      rules: {
        product_id: [
          { required: true, message: "请输入商品id", trigger: "blur" }
        ],
        price: [{ required: true, message: "请输入金额", trigger: "blur" }],
        number: [{ required: true, message: "请输入数量", trigger: "blur" }],
        image_url: [
          { required: true, message: "请输入图片地址", trigger: "blur" }
        ],
        stock: [{ required: true, message: "请输入库存", trigger: "blur" }],
        status: [{ required: true, message: "请输入状态", trigger: "blur" }],
        sold: [{ required: true, message: "请输入已售数量", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    handleSkuImage(files) {
      qiniuService.upload(files.file).then(res => {
        this.skuFrom.image_url = res;
      });
    },
    handleback() {
      this.$router.push({ name: "skus" });
    },
    handleSubmit() {
      if (
        !this.skuFrom.product_id ||
        !this.skuFrom.image_url ||
        !this.skuFrom.number ||
        !this.skuFrom.price ||
        !this.skuFrom.stock ||
        !this.skuFrom.sold ||
        !this.skuFrom.status
      ) {
        this.$message.error("缺少参数");
        return;
      }
      let params = {
        image_url: this.skuFrom.image_url,
        number: this.skuFrom.number,
        price: this.skuFrom.price,
        stock: this.skuFrom.stock,
        sold: this.skuFrom.sold,
        status: this.skuFrom.status
      };
      skusService.insert(params).then(res => {
        if (res.code === 200) {
          this.$message({
            meessage: res.message,
            type: "success"
          });
          this.$router.push({ name: "skus" });
        } else {
          this.$message(res.message);
        }
      });
    }
  }
};
</script>

<style lang="less">
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
.footer {
  margin-top: 20px;
}
</style>
