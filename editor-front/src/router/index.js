import {createRouter,createWebHistory} from 'vue-router'
import { useUserStore } from '../stores/userStore.js'
 
 
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue')
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../views/Home.vue')
        },
    ]
})

//-前置守卫路由:登录校验
router.beforeEach((to,from,next)=>{
    const store = useUserStore()
    //-：获取是否登录的状态
    let isLogin = store.isLogin
    //-:访问的请求不是 login，不是reg 也没有登录
    if(to.name!=='login'&&!isLogin){
        next({name: 'login'})
    }else if(to.name=='login'&&isLogin){//-:已经登录了，还在访问登录请求
        next({name: 'home'})
    }else{//否则，该干啥干啥
        next()
    }
})

export default router