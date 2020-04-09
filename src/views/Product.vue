<template>
  <div class="container">
    <div class="header">
      <div class="title">商品列表</div>
      <el-button type="primary" @click="handlecreate">添加</el-button>
    </div>
    <div class="body">
      <div class="classify_select">
        <el-select
          v-model="classify_select"
          placeholder="请选择"
          clearable
          @change="handleselect"
        >
          <el-option
            v-for="item in classify"
            :key="item.id + Math.random()"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <el-row :gutter="20">
        <el-col
          :span="4"
          v-for="item in goodsData"
          :key="item.id + Math.random()"
        >
          <el-card :body-style="{ padding: '8px' }" class="el-card">
            <el-image :src="item.image_url" class="image" fit="contain">
            </el-image>
            <div class="bottom">
              <div class="item category">分类：{{ item.classify_name }}</div>
              <div class="item name">名称：{{ item.name }}</div>
              <div class="item desc">商品描述：{{ item.descript }}</div>
              <div class="item stock">库存：{{ item.stock }}</div>
              <div class="item sold">已售：{{ item.sold }}</div>
              <!-- <div class="item ">id: {{item.skus_id }}</div> -->
              <div class="item price">
                <div class="item-price">¥ {{ item.price }}</div>
                <div class="item-price-discount" v-if="item.price_discount">
                  ¥ {{ item.price_discount }}
                </div>
              </div>
              <div class="item handle">
                <el-button type="text" @click="hanledDetail(item.id)"
                  >管理</el-button
                >
                <el-button type="text" @click="hanleLowershelf(item.id)"
                  >下架</el-button
                >
              </div>
            </div>
            <div class="uppershelf" v-if="item.status !== '0'">
              <p>该商品已下架咯~</p>
              <p class="uppershelf-btn" @click="hanleUppershelf(item.id)">
                上架
              </p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
        class="pagination"
        layout="prev, pager, next"
        :page-size="pagination.pageSize"
        :current-page.sync="pagination.nowPage"
        :total="pagination.total"
        @current-change="getData"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import classifyService from "@/global/service/classify";
import productService from "@/global/service/product";

export default {
  data() {
    return {
      goodsData: [],
      pagination: {
        pageSize: 8,
        total: 0,
        nowPage: 1
      },
      classify_select: "",
      classify: []
    };
  },
  created() {
    this.getData();
    classifyService.all().then(res => {
      this.classify = res.data;
    });
  },
  methods: {
    getData() {
      let params = {
        pageSize: this.pagination.pageSize,
        nowPage: this.pagination.nowPage,
        classify_id: this.classify_select
      };
      console.log(params);
      productService.all(params).then(res => {
        console.log(123, res);
        this.goodsData = res.data;
        this.pagination.total = res.total;
        console.log(this.pagination);
      });
    },
    handlecreate() {
      this.$router.push({ name: "productcreate" });
    },
    handleselect() {
      this.pagination.nowPage = 1;
      this.getData();
    },
    hanledDetail(id) {
      this.$router.push({ name: "productsingle", params: { id } });
    },
    hanleLowershelf(id) {
      console.log(id);
      productService.lowershelf(id).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: res.message
          });
          this.getData();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    hanleUppershelf(id) {
      productService.uppershelf(id).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: res.message
          });
          this.getData();
        } else {
          this.$message.error(res.message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.body {
  background-color: #ffffff;
  padding: 15px;
  .select {
    margin: 10px;
  }
}
.el-card {
  margin: 20px 0;
  width: 100%;
  position: relative;
}
.pagination {
  padding: 20px;
  background-color: #fff;
  display: flex;
  justify-content: center;
}
.bottom {
  .item {
    margin: 5px 0;
    display: flex;
    align-items: center;
  }
  .name {
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .desc {
    font-size: 13px;
    color: #999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .category {
    font-size: 14px;
    color: #777;
  }
  .price {
    margin: 10px 0;
    font-size: 16px;
    color: #ff1493;
    .item-price {
      margin-right: 6px;
    }
    .item-price-discount {
      font-size: 13px;
      color: #999;
      text-decoration: line-through;
    }
  }
  .sold {
    font-size: 14px;
    color: #777;
  }
  .handle {
    justify-content: space-between;
    padding: 5px;
  }
  .el-button {
    padding: 0;
  }
}
.uppershelf {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(51, 51, 51, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 17px;
    color: #fff;
    letter-spacing: 1px;
  }
  .uppershelf-btn {
    font-size: 16px;
    color: #00ffff;
    cursor: pointer;
    margin-top: 20px;
  }
  .uppershelf-btn:hover {
    color: #409eff;
  }
}
</style>
