<template>
  <div class="container">
    <div class="header">
      <div class="header-title">商品添加</div>
      <el-button type="success" @click="handleback">🔙</el-button>
    </div>
    <div class="body">
      <div class="block">
        <div class="tips">
          0000000000000000000
        </div>
        <div class="show-image">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="handleCover"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="image_Url" :src="image_Url" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-form
            class="form"
            :model="ruleForm"
            :rules="rules"
            ref="priceForm"
            label-position="left"
            label-width="90px"
          >
            <el-form-item
              label="* 划线价"
              prop="price_discount"
              style="width:350px;"
            >
              <el-input v-model="ruleForm.price_discount" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="info">
        <div class="block-half">
          <el-form
            class="block-form"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-position="left"
            label-width="80px"
          >
            <el-form-item label="名称" prop="name" style="width:400px;">
              <el-input v-model="ruleForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="descript" style="width:400px;">
              <el-input
                v-model="ruleForm.descript"
                :rows="4"
                type="textarea"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="商品分类"
              prop="category_id"
              style="width:400px;"
            >
              <el-select
                v-model="ruleForm.classify_id"
                placeholder="请选择分类"
              >
                <el-option
                  v-for="item in classify_value"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="block-half">
          <div class="rich-text">
            <p class="rich-title">商品详情 <span>tips: 图片不能超过2M</span></p>
            <quill-editor
              class="quill-editor"
              v-model="quill"
              ref="myQuillEditor"
              :options="editorOption"
              style="height:300px;"
            >
            </quill-editor>
          </div>
        </div>
      </div>
      <div class="banner">
        <p class="banner-title">
          商品轮播图<span>tips：点击图片的预览功能查看图片实际大小</span>
        </p>
        <el-upload
          action=""
          list-type="picture-card"
          :http-request="handleBanner"
          :before-upload="beforeAvatarUpload"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" v-if="dialogImageUrl" :src="dialogImageUrl" />
        </el-dialog>
      </div>
      <div class="submit-btn">
        <el-button type="success" @click="handleSubmit()">确认修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import qiniuService from "@/global/service/qiniu";
import classifyService from "@/global/service/classify";
import productService from "@/global/service/product";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

const uploadConfig = {
  number: "image_url",
  size: 2048, // 图片大小，单位为Kb, 1M = 1024Kb
  accept: "image/png, image/gif, image/jpeg", // 可选 可上传的图片格式
  QINIU_API: "http://upload-z2.qiniup.com"
};
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
  ["link", "image", "video"]
];
const handlers = {
  image: function() {
    let fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("accept", uploadConfig.accept);
    fileInput.classList.add("ql-image");
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (uploadConfig.size && file.size >= uploadConfig.size * 1024) {
        fileInput.value = "";
        return;
      }
      qiniuService.upload(file).then(res => {
        let length = this.quill.getSelection(true).index;
        this.quill.insertEmbed(length, "image", res);
        this.quill.setSelection(length + 1);
      });
    });
    fileInput.click();
  }
};

export default {
  data() {
    return {
      image_Url: "",
      ruleForm: {
        price_discount: "",
        name: "",
        descript: "",
        classify_id: ""
      },
      rules: {
        price: [{ required: true, message: "请输入金额", trigger: "blur" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        descript: [{ required: true, message: "请输入描述", trigger: "blur" }],
        classify_id: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        stock: [{ required: true, message: "请输入数量", trigger: "blur" }]
      },
      classify_value: [],
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: handlers
          }
        }
      },
      quill: "",
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  created() {
    let id = this.$route.params.id;
    productService.single(id).then(res => {
      if (!res.data) {
        this.$message.error("查询失败");
        return;
      }
      this.image_Url = res.data.image_Url;
      this.ruleForm.price_discount = res.data.price_discount;
      this.ruleForm.name = res.data.name;
      this.ruleForm.descript = res.data.descript;
      this.ruleForm.classify_id = res.data.classify_id;
      this.quill = res.data.Quill;
      this.fileList = res.data.banner;
    });

    classifyService.all().then(res => {
      this.classify_value = res.data;
    });
  },
  methods: {
    handleback() {
      this.$router.push({ name: "product" });
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    handleCover(files) {
      qiniuService.upload(files.file).then(res => {
        this.image_Url = res;
      });
    },
    handleBanner(files) {
      qiniuService.upload(files.file).then(res => {
        this.fileList.push({ url: res });
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    handleSubmit() {
      let params = {
        image_Url: this.image_Url,
        price_discount: this.ruleForm.price_discount,
        name: this.ruleForm.name,
        descript: this.ruleForm.descript,
        classify_id: this.ruleForm.classify_id,
        quill: this.quill,
        banner: this.fileList
      };
      let id = this.$route.params.id;
      productService.update(id, params).then(res => {
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.$router.push({ name: "product" });
        } else {
          this.$message.error(res.message);
        }
      });
    }
  },
  components: {
    "quill-editor": quillEditor
  }
};
</script>

<style lang="less" scoped>
.block {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  border-radius: 6px;
  .tips {
    font-size: 14px;
    color: #a1aab2;
    margin: 10px 10px 30px 10px;
  }
}
.info {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .block-half {
    background-color: #fff;
    width: 49%;
    padding: 15px;
    border-radius: 6px;
    .block-form {
      padding: 30px 0 0 30px;
    }
    .rich-text {
      height: 420px;
      .rich-title {
        margin-bottom: 10px;
        text-align: center;
        font-size: 14px;
        color: #606266;
        span {
          margin-left: 10px;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
.banner {
  margin-top: 20px;
  background-color: #fff;
  border-radius: 6px;
  padding: 15px;
  .banner-title {
    margin-bottom: 10px;
    text-align: center;
    font-size: 15px;
    color: #606266;
    span {
      margin-left: 10px;
      font-size: 12px;
      color: #858586;
    }
  }
}
.sku {
  margin-top: 20px;
  background-color: #fff;
  border-radius: 6px;
  padding: 15px;
  .title {
    text-align: center;
  }
  .tips {
    font-size: 14px;
    color: #a1aab2;
    margin: 10px;
  }
  .add-btn {
    margin: 8px;
  }
}
.submit-btn {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.avatar-uploader,
.el-upload {
  width: 130px;
  height: 130px;
  border: 1px dashed #4169e1;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 10px 0 10px 50px;
}
.avatar-uploader:hover {
  border-color: #000080;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 130px;
  height: 130px;
  line-height: 130px;
  text-align: center;
}
.avatar {
  width: 130px;
  height: 130px;
  display: block;
}
.el-card {
  margin: 20px 0;
  width: 100%;
  .top {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0 20px 0;
    position: relative;
    .sku-image {
      display: block;
      width: 100%;
    }
    .sku-upload {
      width: 130px;
      height: 130px;
      border: 1px dashed #4169e1;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      margin: 10px 0;
    }
    .close {
      position: absolute;
      right: 10px;
      top: 10px;
      display: none;
    }
  }
  .top:hover {
    .close {
      display: block;
    }
  }
  .bottom {
    display: flex;
    justify-content: center;
    padding: 8px 15px;
  }
}
.banner-avatar {
  width: 130px;
  height: auto;
  display: block;
}
.show-image {
  display: flex;
  justify-content: space-between;
  .form {
    margin: 30px 200px 10px 10px;
  }
}
</style>
