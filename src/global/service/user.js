import request from "@/global/request/axios";
import API from "@/global/request/api";

const user = {
  all: function() {
    return request.get(API.user);
  },
  single: function(id) {
    return request.get(API.userItem(id));
  }
};
export default user;
