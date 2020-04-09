<template>
  <div class="container">
    <div class="header">
      <div class="title">订单列表</div>
    </div>
    <div class="body">
      <div class="select">
        <el-input
          style="width:200px;margin-right:20px"
          v-model="verse"
          placeholder="请输入订单号"
          clearable
          @change="onLoad"
        >
        </el-input>
        <el-select
          v-model="statu"
          placeholder="请选择订单状态"
          clearable
          @change="onLoad"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <el-table :data="orderData" style="width: 100%;">
        <el-table-column prop="verse" label="订单编号"> </el-table-column>
        <el-table-column prop="count" label="订单数量"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag :type="tagType(scope.row.statu)" disable-transitions>{{
              scope.row.statu
            }}</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="" label="金额"> </el-table-column> -->
        <el-table-column prop="created_time" label="下单日期">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleSingle(scope.row)"
              >详情</el-button
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
import orderService from "@/global/service/order";
export default {
  data() {
    return {
      verse: "",
      statu: "",
      count: "",
      options: [
        {
          value: "0",
          label: "已完成"
        },
        {
          value: "1",
          label: "未完成"
        },
        {
          value: "2",
          label: "已取消"
        }
      ],
      orderData: [],
      pagination: {
        pageSize: 10,
        total: 0,
        nowPage: 1
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
        verse: this.verse,
        statu: this.statu,
        count: this.count
      };
      orderService.all(params).then(res => {
        res.data.forEach(arr => {
          switch (arr.statu) {
            case 0:
              arr.statu = "已完成";
              break;
            case 1:
              arr.statu = "未完成";
              break;
            case 2:
              arr.statu = "已取消";
              break;
            default:
              arr.statu = "null";
          }
        });
        this.orderData = res.data;
        this.pagination.total = res.total;
      });
    },
    tagType(statu) {
      let value = "";
      switch (statu) {
        case "已取消":
          value = "info";
          break;
        case "未完成":
          value = "warning";
          break;
        case "已完成":
          value = "success";
          break;
        default:
          value = "";
      }
      return value;
    },
    handleSingle(row) {
      let id = row.id;
      this.$router.push({ name: "ordersingle", params: { id } });
    },
    handleDelete(row) {
      let id = row.id;
      console.log(id);
    }
  }
};
</script>

<style lang="less" scope>
.body {
  background-color: #fff;
  padding: 20px;
}
.select {
  display: flex;
  padding: 10px;
}
.pagination {
  padding: 20px;
  background-color: #fff;
  display: flex;
  justify-content: center;
}
</style>
