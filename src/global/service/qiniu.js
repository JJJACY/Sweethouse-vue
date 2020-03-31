import request from "@/global/request/axios";
import API from "@/global/request/api";
import * as qiniu from "qiniu-js";

const qiniuToken = {
  getqiniuToken: function() {
    return request.get(API.qiniuToken);
  },
  upload: function(file) {
    return new Promise(resolve => {
      this.getqiniuToken().then(res => {
        const key = Date.now() + "-" + file.name;
        //获取token
        let token = res.token;
        let domain = res.domain;

        var config = {
          useCdnDomain: true,
          region: qiniu.region.z2
        };

        var putExtra = {
          fname: "",
          params: {},
          mimeType: ["image/png", "image/jpeg", "image/gif"]
        };
        var observable = qiniu.upload(file, key, token, putExtra, config);
        //var subscription = observable.subscribe(observer) // 上传开始
        observable.subscribe({
          next(res) {
            console.log(res);
          },
          error(err) {
            // ...
            console.log(err);
          },
          complete(res) {
            // ...
            let imageUrl = domain + "/" + res.key;
            resolve(imageUrl);
          }
        }); // 这样传参形式也可以
      });
      return;
    });
  }
};
export default qiniuToken;
