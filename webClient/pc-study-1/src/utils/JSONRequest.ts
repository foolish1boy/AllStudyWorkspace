import store from '@/store';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { getToken } from './auth';

console.log("rocess.env.NODE_ENV:" + process.env.NODE_ENV + " process.env.VUE_APP_BASEAPI:" + process.env.VUE_APP_BASEAPI);

const service =   axios.create({
    baseURL:process.env.VUE_APP_BASEAPI,
    timeout:50000,
    headers:
    {
        'Content-Type': 'application/json'
    },
    transformRequest: [
        function (data:any,headers?: any) 
        {
          let jsonStr:string = JSON.stringify(data);
          return jsonStr
        }
      ]
});

//请求前的拦截处理
service.interceptors.request.use(
    config=>{
        // Do something before request is sent
        let token = getToken();
        console.log("store.getters.token 2:" + token);
        if( token )
        {
            // 让每个请求携带Authorization
            config.headers['Authorization'] = getToken();

            console.log("token:" + getToken());
        }

        return config;
    },
    error=>{
        console.log(error);
        Promise.reject(error);
    }
);

service.interceptors.response.use(
    response=>{
        if( response.data.Code == 200 )
        {
            return response;
        }

        //debugger;

        ElMessage({
            message:response.data.Msg || "服务器请求错误",
            type:"error",
            duration:5000    
        });

        return Promise.reject("error");
    },
    error=>{
        console.log("err" + error);
        ElMessage({message:"服务器请求错误",type:"error",duration:5000});
    }    
);


export default service;