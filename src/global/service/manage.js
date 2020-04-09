import request from "@/global/request/axios";
import API from "@/global/request/api";

const manage = {
  all: function() {
    return request.get(API.manage);
  },
  insert: function(params) {
    return request.post(API.manage, params);
  },
  single: function(id) {
    return request.get(API.manageItem(id));
  },
  update: function(id, params) {
    return request.put(API.manageItem(id), params);
  },
  delete: function(id) {
    return request.delete(API.manageItem(id));
  }
};
export default manage;
