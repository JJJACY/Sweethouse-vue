<template>
  <div class="container">
    <div class="header">
      <div class="title">用户信息</div>
      <el-button type="info" @click="handleReturn">返回</el-button>
    </div>
    <div class="body">
      <div class="user-avatar">
        <el-image
          v-if="userInfo.avatar"
          style="width: 70px; height: 70px"
          :src="userInfo.avatar"
          fit="fill"
        ></el-image>
      </div>
      <div class="user-info">
        <div class="user-item">
          <div class="user-title">用户昵称:</div>
          <div class="user-value">{{ userInfo.nickname }}</div>
        </div>
      </div>
      <el-table :data="addressData" style="width: 100%;margin:40px 0">
        <el-table-column label="用户地址">
          <el-table-column prop="name" label="收货人电话">{{
            addressData[0].phone
          }}</el-table-column>
          <el-table-column prop="sex" label="性别"> </el-table-column>
          <el-table-column label="收货地址">
            <template slot-scope="scope">
              <div>{{ scope.row.located }}{{ scope.row.descript }}</div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="tag" label="标签"></el-table-column> -->
          <el-table-column label="默认">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.default === '是' ? 'success' : 'info'"
                disable-transitions
                >{{ scope.row.default === "是" ? "是" : "否" }}</el-tag
              >
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table :data="orderData" style="width: 100%;">
        <el-table-column label="用户订单">
          <el-table-column prop="order" label="订单编号"> </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag :type="tagType(scope.row.status)" disable-transitions>{{
                scope.row.status
              }}</el-tag>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="total" label="金额"> </el-table-column> -->
          <el-table-column prop="created_time" label="下单日期">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import userService from "@/global/service/user";
export default {
  data() {
    return {
      addressData: [
        {
          phone: ""
        }
      ],
      orderData: [],
      userInfo: {}
    };
  },
  created() {
    this.onload();
  },
  methods: {
    onload() {
      let id = this.$route.params.id;
      userService.single(id).then(res => {
        this.userInfo = res.data.user;
        res.data.address.forEach(arr => {
          arr.default == 0 ? (arr.default = "是") : (arr.default = "否");
          arr.sex === 1 ? (arr.sex = "女") : (arr.sex = "男");
        });
        this.addressData = res.data.address;
        res.data.order.forEach(arr => {
          switch (arr.status) {
            case 0:
              arr.status = "已完成";
              break;
            case 1:
              arr.status = "未完成";
              break;
            case 2:
              arr.status = "已取消";
              break;
            default:
              arr.status = "不存在";
          }
        });
        this.orderData = res.data.order;
      });
    },
    handleReturn() {
      this.$router.push({ name: "user" });
    },
    tagType(status) {
      let value = "";
      switch (status) {
        case "已完成":
          value = "info";
          break;
        case "未完成":
          value = "success";
          break;
        case "已取消":
          value = "";
          break;
        default:
          value = "warning";
      }
      return value;
    }
  }
};
</script>

<style lang="less">
.body {
  background-color: #fff;
  padding: 25px;
}
.user-info {
  padding: 8px;
  .user-item {
    display: flex;
    height: 30px;
    align-items: center;
    .user-title {
      font-size: 20px;
      color: #303133;
      margin-right: 20px;
    }
    .user-value {
      font-size: 14px;
      color: #1989fa;
    }
  }
}
.user-avatar {
  padding: 10px;
}
</style>
