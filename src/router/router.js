const Login = () => import(/* webpackChunkName: "Login" */ "@/views/Login"); //登录页
const Dashboard = () =>
  import(/* webpackChunkName: "Dashboard" */ "@/views/Dashboard"); //概览页
const Index = () => import(/* webpackChunkName: "Index" */ "@/views/Index"); //首页页
const Classify = () =>
  import(/* webpackChunkName: "Classify" */ "@/views/Classify"); //分类页
const Banner = () => import(/* webpackChunkName: "Banner" */ "@/views/Banner"); //轮播图管理
const BannerCreate = () =>
  import(/* webpackChunkName: "BannerCreate" */ "@/views/BannerCreate"); //分类页
const Manage = () => import(/* webpackChunkName: "Manage" */ "@/views/Manage"); //管理员页
const ManageCreate = () =>
  import(/* webpackChunkName: "ManageCreate" */ "@/views/ManageCreate"); //管理员新增页
const ManageEdit = () =>
  import(/* webpackChunkName: "ManageEdit" */ "@/views/ManageEdit"); //管理员编辑页
const Order = () => import(/* webpackChunkName: "Order" */ "@/views/Order"); //订单页
const OrderSingle = () =>
  import(/* webpackChunkName: "OrderSingle" */ "@/views/OrderSingle"); //订单查询页
const Product = () =>
  import(/* webpackChunkName: "Product" */ "@/views/Product"); //商品页
const ProductCreate = () =>
  import(/* webpackChunkName: "ProductCreate" */ "@/views/ProductCreate"); //商品新增页
const ProductSingle = () =>
  import(/* webpackChunkName: "ProductSingle" */ "@/views/ProductSingle"); //商品详情页
const Skus = () => import(/* webpackChunkName: "Skus" */ "@/views/Skus"); //商品skus页
const SkusCreate = () =>
  import(/* webpackChunkName: "SkusCreate" */ "@/views/SkusCreate"); //商品skus新增页
const User = () => import(/* webpackChunkName: "User" */ "@/views/User"); //用户页
const UserSingle = () =>
  import(/* webpackChunkName: "UserSingle" */ "@/views/UserSingle"); //用户查询页
import BasicLayout from "@/components/BasicLayout";

export default [
  {
    path: "/",
    component: Login,
    name: "login"
  },
  {
    path: "/admin",
    component: BasicLayout,
    name: "admin",
    redirect: { name: "Dashboard" },
    children: [
      {
        path: "/admin",
        name: "DashboardRoot",
        component: { render: h => h("router-view") },
        // redirect: { name: "Dashboard"},
        meta: {
          nav: {
            icon: "el-icon-pie-chart",
            title: "概况"
          },
          breadcrumb: {
            title: "概况"
          }
        },
        children: [
          {
            path: "/admin",
            name: "Dashboard",
            component: Dashboard
          }
        ]
      },
      {
        path: "/admin/index",
        name: "indexRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "index" },
        meta: {
          nav: {
            icon: "el-icon-monitor",
            title: "首页管理"
          },
          breadcrumb: {
            title: "首页管理"
          }
        },
        children: [
          {
            path: "/admin/index",
            name: "index",
            component: Index
          },
          {
            path: "/admin/classify",
            name: "Classify",
            component: { render: h => h("router-view") },
            meta: {
              nav: {
                icon: "el-icon-menu",
                title: "分类管理"
              },
              breadcrumb: {
                title: "分类管理"
              }
            },
            children: [
              {
                path: "/admin/classify",
                name: "classify",
                component: Classify
              }
            ]
          },
          {
            path: "/admin/banner",
            name: "bannerRoot",
            component: { render: h => h("router-view") },
            redirect: { name: "banner" },
            meta: {
              nav: {
                icon: "el-icon-c-scale-to-original",
                title: "轮播图管理"
              },
              breadcrumb: {
                title: "轮播图管理"
              }
            },
            children: [
              {
                path: "/admin/banner",
                name: "banner",
                component: Banner
              },
              {
                path: "/admin/bannerCreate",
                name: "bannerCreate",
                component: BannerCreate,
                meta: {
                  breadcrumb: {
                    title: "轮播图添加"
                  }
                }
              }
            ]
          }
        ]
      },
      {
        path: "/admin/manage",
        name: "manageRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "manage" },
        meta: {
          nav: {
            icon: "el-icon-user",
            title: "管理员管理"
          },
          breadcrumb: {
            title: "管理员管理"
          }
        },
        children: [
          {
            path: "/admin/manage",
            component: Manage,
            name: "manage"
          },
          {
            path: "/admin/manage/create",
            component: ManageCreate,
            name: "managecreate"
          },
          {
            path: "/admin/manage/edit",
            component: ManageEdit,
            name: "manageedit"
          }
        ]
      },
      {
        path: "/admin/order",
        name: "orderRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "order" },
        meta: {
          nav: {
            icon: "el-icon-s-order",
            title: "订单查询"
          },
          breadcrumb: {
            title: "订单查询"
          }
        },
        children: [
          {
            path: "/admin/order",
            component: Order,
            name: "order"
          },

          {
            path: "/admin/order/single",
            component: OrderSingle,
            name: "ordersingle"
          }
        ]
      },
      {
        path: "/admin/product",
        name: "productRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "product" },
        meta: {
          nav: {
            icon: "el-icon-present",
            title: "商品管理"
          },
          breadcrumb: {
            title: "商品管理"
          }
        },
        children: [
          {
            path: "/admin/product",
            component: Product,
            name: "product",
            meta: {
              nav: {
                icon: "el-icon-shopping-bag-1",
                title: "商品列表"
              },
              breadcrumb: {
                title: "商品列表"
              }
            }
          },
          {
            path: "/admin/product/create",
            component: ProductCreate,
            name: "productcreate",
            meta: {
              nav: {
                icon: "el-icon-circle-plus-outline",
                title: "商品添加"
              },
              breadcrumb: {
                title: "商品添加"
              }
            }
          },
          {
            path: "/admin/product/single",
            component: ProductSingle,
            name: "productsingle",
            meta: {
              breadcrumb: {
                title: "商品详情"
              }
            }
          }
        ]
      },
      {
        path: "/admin/skus",
        name: "skusRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "skus" },
        meta: {
          nav: {
            icon: "el-icon-menu",
            title: "商品skus管理"
          },
          breadcrumb: {
            title: "商品skus管理"
          }
        },
        children: [
          {
            path: "/admin/skus",
            component: Skus,
            name: "skus",
            meta: {
              nav: {
                icon: "el-icon-tickets",
                title: "商品skus列表"
              },
              breadcrumb: {
                title: "商品skus列表"
              }
            }
          },
          {
            path: "/admin/skus/create",
            component: SkusCreate,
            name: "skuscreate",
            meta: {
              nav: {
                icon: "el-icon-document-add",
                title: "商品skus添加"
              },
              breadcrumb: {
                title: "商品skus添加"
              }
            }
          }
        ]
      },
      {
        path: "/admin/user",
        name: "userRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "user" },
        meta: {
          nav: {
            icon: "el-icon-user-solid",
            title: "用户查询"
          },
          breadcrumb: {
            title: "用户查询"
          }
        },
        children: [
          {
            path: "/admin/user",
            name: "user",
            component: User
          },
          {
            path: "/admin/user/single",
            name: "usersingle",
            component: UserSingle,
            meta: {
              breadcrumb: {
                title: "用户信息"
              }
            }
          }
        ]
      }
    ]
  }
];
