
import nProgress from 'nprogress'
import {router} from '@/router/index'
import { getToken } from './auth';
import store from '@/store';
import { USER_ACTION_EVENT } from '@/store/modules/user';
import { PERMISSION_ACTION_EVENT } from '@/store/modules/permission';
import { awaitWrap } from '@/Infos/CommonDefine';

nProgress.configure({showSpinner:true});


const whiteList:string[] = ['/login','/auth-redirect'];



router.beforeEach( async (to, from, next) => {
    nProgress.start();

    console.log("getToken:" + getToken() + " to.path:" + to.path );

    if( getToken() == undefined )
    {
        if( whiteList.indexOf(to.path) >= 0 )
        {
            next();
        }
        else
        {
            next(`/login?redirect=${to.path}`);
            nProgress.done();
        }
        return;
    }

    if( to.path == '/login' )
    {
        next({path:'/'});
        nProgress.done();
        return;
    }


    console.log("store.getters.roles.length:" + store.getters.roles.length);

    if(store.getters.roles.length != 0)
    {
        next();
        return;
    }

     // 获取系统全局配置
    let [err,res]  =  await  awaitWrap(store.dispatch(USER_ACTION_EVENT.GET_CONIFG));

    if(err != null || res == null)
    {
        console.log('GET_CONIFG has error');
        next();
        return;
    }
    console.log('GET_USER_INFO ready');

     // 判断当前用户是否已拉取完user_info信息
    store.dispatch(USER_ACTION_EVENT.GET_USER_INFO)
    .then(res=>{
        let menu = res.data.Data.Nav;
        console.log('GET_USER_INFO success' + menu);
        // 根据roles权限生成可访问的路由表
        store.dispatch(PERMISSION_ACTION_EVENT.GENERATE_ROUTES, {menu:menu})
        .then(accessRoutes=>{
            router.addRoute(accessRoutes);  // 动态添加可访问路由表
            next({...to,replace:true});
        })
    })
    .catch(res=>{
        console.log('GET_USER_INFO has error');
        store.dispatch(USER_ACTION_EVENT.FEED_LOG_OUT)
        .then(res=>{
            next({path:'/'});
        })
    })
    
})

router.afterEach( route => {
   nProgress.done();
})