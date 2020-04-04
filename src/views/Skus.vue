<template>
  <div class="container">
    <div class="sku">
      <p class="title">商品 SKU</p>
      <p class="tips">
        温馨提示：一个商品最多可以创建8个sku哦！
      </p>
      <el-button type="primary" class="add-btn" @click="handleCreate"
        >新增</el-button
      >
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item, index) in sku" :key="index">
          <el-card :body-style="{ padding: '0px' }" class="el-card">
            <div class="top">
              <div class="close" @click="handleDelete(item)">
                <i class="el-icon-circle-close"></i>
              </div>
              <el-image :src="item.image_url"></el-image>
            </div>
            <div class="bottom">
              <el-form
                class="form"
                :model="item"
                :rules="rules"
                ref="skuForm"
                label-position="left"
                label-width="55px"
              >
                <el-form-item
                  label="商ID"
                  prop="product_id"
                  style="width:100%;"
                >
                  <el-input v-model="item.product_id" clearable></el-input>
                </el-form-item>
                <el-form-item label="图片" prop="image_url" style="width:100%;">
                  <el-input v-model="item.image_url" clearable></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="number" style="width:100%;">
                  <el-input v-model="item.number" clearable></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price" style="width:100%;">
                  <el-input v-model="item.price" clearable></el-input>
                </el-form-item>
                <el-form-item label="库存" prop="stock" style="width:100%;">
                  <el-input v-model="item.stock" clearable></el-input>
                </el-form-item>
                <el-form-item label="已售" prop="sold" style="width:100%;">
                  <el-input v-model="item.sold" clearable></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status" style="width:100%;">
                  <el-input v-model="item.status" clearable></el-input>
                </el-form-item>
                <div class="submit-btn">
                  <el-button type="success" @click="handlechange(item)"
                    >修改</el-button
                  >
                </div>
              </el-form>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
        class="pagination"
        layout="prev, pager, next"
        :page-size="pagination.pageSize"
        :pager-count="7"
        :current-page.sync="pagination.nowPage"
        :total="pagination.total"
        @current-change="onLoad"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import skusService from "@/global/service/skus";
export default {
  data() {
    return {
      pagination: {
        pageSize: 10,
        total: 0,
        nowPage: 1
      },
      sku: [
        {
          id: "",
          product_id: "",
          image_url: "",
          number: "",
          price: "",
          stock: "",
          sold: "",
          status: ""
        }
      ],
      rules: {
        product_id: [
          { required: true, message: "请输入商品id", trigger: "blur" }
        ],
        price: [{ required: true, message: "请输入金额", trigger: "blur" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
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
  created() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      let params = {
        pageSize: this.pagination.pageSize,
        nowPage: this.pagination.nowPage,
        price: this.sku.price,
        sold: this.sku.sold
      };
      skusService.all(params).then(res => {
        this.sku = res.data;
        this.pagination.total = res.total;
      });
    },
    select() {
      this.pagination.nowPage = 1;
      this.onLoad();
    },
    handleCreate() {
      this.$router.push({ name: "skuscreate" });
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该sku, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let id = row.id;
        console.log(id);
        skusService
          .delete(id)
          .then(res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.message
              });
              this.onLoad();
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
    },
    handlechange(row) {
      console.log(123);
      let params = {
        product_id: row.product_id,
        price: row.price,
        stock: row.stock,
        number: row.number,
        image_url: row.image_url,
        status: row.status,
        sold: row.sold
      };
      let id = row.id;
      skusService.update(id, params).then(res => {
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.onLoad();
        } else {
          this.$message.error("出错！");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
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
</style>
