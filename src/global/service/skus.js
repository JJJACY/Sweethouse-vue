import request from "@/global/request/axios";
import API from "@/global/request/api";

const skus = {
  all: function(params) {
    return request.get(API.skus, params);
  },
  insert: function(params) {
    return request.post(API.skus, params);
  },
  update: function(id, params) {
    return request.put(API.skusItem(id), params);
  },
  delete: function(id) {
    return request.delete(API.skusItem(id));
  }
};
export default skus;
