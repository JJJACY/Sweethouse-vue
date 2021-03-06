import request from "@/global/request/axios";
import API from "@/global/request/api";

const classify = {
  all: function() {
    return request.get(API.classify);
  },
  insert: function(params) {
    return request.post(API.classify, params);
  },
  update: function(id, params) {
    return request.put(API.classifyItem(id), params);
  },
  delete: function(id) {
    return request.delete(API.classifyItem(id));
  }
};

export default classify;
