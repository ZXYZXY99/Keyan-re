import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../views/Login'
import FaceLogin from '../views/FaceLogin'
import Aside from '../views/Aside.vue'
import UserManage from '../views/UserManage'
import Laboratory from '../views/Laboratory'
import Laboratory_inspect from '../views/Laboratory-applay'
import Project_sys from '../views/Project_sys'
import Project_SH from '../views/Project_SH'
import UserAside from '../views/UserAside'
import Laboratory_user from '../views/Laboratory-User'
import Myproject from '../views/MyProject'
import UserCenter from "../views/UserCenter";
import AdminCenter from "../views/AdminCenter";
import UserProject from "../views/UserProject";
import GetFaceInfo from "../views/GetFaceInfo";
import UserLab from "../views/UserLab";
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: '登陆',
    component: Login
  },{
  path:'/login',
      name:'登陆',
      component:Login

    },
    {
  path:'/facelogin',
      name:'刷脸',
      component:FaceLogin
    },
    {
      path:'/aside',
      name:'布局',
      component:Aside,
        show:true,
        redirect:'/usermanage',
        children:[
            {
                path:'/usermanage',
                name:'用户管理',
                component:UserManage

            },
            {
            path:'/laboratory',
                name:'实验室审核',
                component:Laboratory
            },
            {
                path:'/labinspect',
                name:'实验室审核',
                component:Laboratory_inspect
            },{
          path:'/project',
          name:'项目管理',
                component:Project_sys
            },
            {
                path:'/projectsh',
                name:'项目审核',
                component:Project_SH
            },{
          path:'/admincenter',
                name:'管理员中心',
                component:AdminCenter
            }


        ]
    },
      {
       path:'/useraside',
          name:'用户',
          component:UserAside,
          show:true,
          redirect:'/usercenter',
          children: [
              {
                  path:'/userlab',
                  name:'用户申请实验室',
                  component:Laboratory_user

              },{
                    path:'/myproject',
                  name:'我的科研项目',
                  component:Myproject
              },
              {
                  path:'/usercenter',
                  name:'用户中心',
                  component:UserCenter
              },{
           path:'/applaymyproject',
                  name:'科研项目申请',
                  component:UserProject

              },{
                path:"/mylab",
                  name:'我的实验室',
                  component:UserLab

              },{
                  path:"/getface",
                  name:"注册刷脸信息",
                  component:GetFaceInfo
              }


          ]

      },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
