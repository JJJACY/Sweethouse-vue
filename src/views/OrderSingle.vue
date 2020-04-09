<template>
  <div class="container">
    <div class="header">
      <div class="title">订单详情</div>
      <el-button @click="handleback">返回</el-button>
    </div>
    <div class="body">
      <div class="order-list">
        <div class="order-item">
          <div class="order-title">订单编号:</div>
          <div class="order-value">{{ orderData.verse }}</div>
        </div>
        <div class="order-item">
          <div class="order-title">订单状态:</div>
          <div class="order-value">{{ orderData.statu }}</div>
        </div>
        <div class="order-item">
          <div class="order-title">下单时间:</div>
          <div class="order-value">{{ orderData.created_time }}</div>
        </div>
        <div class="order-item">
          <div class="order-title">订单金额:</div>
          <div class="order-value">{{ orderData.money }}</div>
        </div>
        <div class="order-item">
          <div class="order-title">用户姓名:</div>
          <div class="order-value">{{ orderData.nickname }}</div>
        </div>
        <div class="order-item">
          <div class="order-title">用户电话:</div>
          <div class="order-value">{{ orderData.phone }}</div>
        </div>
        <div class="order-item">
          <div class="order-title">地址:</div>
          <div class="order-value">
            {{ orderData.located }}{{ orderData.descript }}
          </div>
        </div>
        <!-- <div class="order-item">
          <div class="order-title"></div>
          <div class="order-value"></div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import orderService from "@/global/service/order";
export default {
  data() {
    return {
      orderData: {}
    };
  },
  created() {
    let id = this.$route.params.id;
    orderService.single(id).then(res => {
      console.log(res.data.statu);
      switch (res.data.statu) {
        case 0:
          res.data.statu = "已完成";
          break;
        case 1:
          res.data.statu = "未完成";
          break;
        case 2:
          res.data.statu = "已取消";
          break;
        default:
          res.data.statu = "错误";
      }

      this.orderData = res.data;
    });
  },
  methods: {
    handleback() {
      this.$router.push({ name: "order" });
    }
  }
};
</script>

<style lang="less" scoped>
.body {
  background-color: #fff;
  padding: 25px;
}
.order-list {
  padding: 10px;
  .order-item {
    display: flex;
    height: 50px;
    align-items: center;
    .order-title {
      font-size: 18px;
      color: #303133;
      margin-right: 20px;
    }
    .order-value {
      font-size: 15px;
      color: #555;
    }
  }
}
</style>
