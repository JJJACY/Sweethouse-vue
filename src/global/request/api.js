const PREFIX = "/api";

const API = {
  login: `${PREFIX}/authLogin`,
  qiniuToken: `${PREFIX}/qiniu-uploadtoken`,
  qiniu_API: `https://q7wbnfs08.bkt.clouddn.com`,
  manage: `${PREFIX}/manage`,
  manageItem: id => `${PREFIX}/manage/${id}`,
  classify: `${PREFIX}/classify`,
  classifyItem: id => `${PREFIX}/classify/${id}`,
  order: `${PREFIX}/manage`,
  orderItem: id => `${PREFIX}/manage/${id}`,
  product: `${PREFIX}/product`,
  prdouctItem: id => `${PREFIX}/product/${id}`,
  productUppershelf: id => `${PREFIX}/product/uppershelf/${id}`,
  productLowershelf: id => `${PREFIX}/product/lowershelf/${id}`,
  skus: `${PREFIX}/skus`,
  skusItem: id => `${PREFIX}/skus/${id}`,
  user: `${PREFIX}/user`,
  banner: `${PREFIX}/banner`,
  bannerItem: id => `${PREFIX}/banner/${id}`
};

export default API;
