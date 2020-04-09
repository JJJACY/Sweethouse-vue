import request from "@/global/request/axios";
import API from "@/global/request/api";

const product = {
  all: function(params) {
    return request.get(API.product, params);
  },
  single: function(id) {
    return request.get(API.prdouctItem(id));
  },
  insert: function(params) {
    return request.post(API.product, params);
  },
  update: function(id, params) {
    return request.put(API.prdouctItem(id), params);
  },
  delete: function(id) {
    return request.delete(API.prdouctItem(id));
  },
  uppershelf: function(id) {
    return request.put(API.productUppershelf(id));
  },
  lowershelf: function(id) {
    return request.put(API.productLowershelf(id));
  }
};
export default product;
