import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import './plugins/element.js'
import  router from "./router/index.js"
import {getToken} from "./util/TokenUtil";
import {removeToken} from "./util/TokenUtil";
import axios from "axios";
// import ld from '../public/static/live2dw/lib/L2Dwidget.min'
// // // import request from "request"
// Vue.prototype.$Ld=ld;
const  Writerouter=['/login','loginface']; //indexOf判断是否存在某个对象，如果不存在，则返回-1
const user=['/userlab','/applaymyproject','/myproject','/usercenter','/getface']
//路由守卫
const token=getToken();
// console.log(token+'im token')

router.beforeEach((to,from,next)=>{
    // console.log(to)
    // const _this=this;
    if (getToken()){
        // console.log("存在")
        axios.defaults.headers.common['token'] = getToken();


        if (user.indexOf(to.path)!==-1){
            console.log('imTest')
            axios.post("http://localhost:8098/cloudzuul/keyanservice/user/islogin")
                .then(function (res) {
                    if (res.code=='401'){
                        removeToken();
                        // console.log('asdasdasda')
                        router.push({ name: 'login' })
                    }
                })

        }else {
            axios.post("http://localhost:8098/cloudzuul/keyanservice/admin/islogin")
                .then(function (res) {
                    console.log(res)
                    if (res.code=='401'){
                        removeToken();
                        // console.log('asdasdasda')
                        router.push({ name:'login'})
                    }
                })
        }

    } else {
        console.log("不存在");
        if (Writerouter.indexOf(to.path)!==-1){
            next()//检测到白名单，放行
        }else {
            // router.push({ name:'login'})
            next('/login')//路由指向
        }
    }
    next();

});

if (token!=="") {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    // console.log(getToken()+'我是axios')
    axios.defaults.headers.common['token'] = getToken();
}


axios.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.log(error.response.status+"error")
        console.log('error')
        var tamp=error.response.status
        // 针对特定的http状态码进行处理
        if (tamp=='401') {
            removeToken();
            router.push({ name: 'login' })
            return new Promise(() => {}) // pending的promise，中止promise链
        }

        return Promise.reject(error.response)
    }
)



Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
