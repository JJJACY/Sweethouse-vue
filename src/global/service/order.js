import request from "@/global/request/axios";
import API from "@/global/request/api";

const order = {
  all: function(params) {
    return request.get(API.order, params);
  },
  single: function(id) {
    return request.get(API.orderItem(id));
  },
  delete: function(id) {
    return request.delete(API.orderItem(id));
  }
};
export default order;
