import axios from 'axios';
import { ElMessage } from 'element-plus';

console.log("rocess.env.NODE_ENV:" + process.env.NODE_ENV + " process.env.VUE_APP_BASEAPI:" + process.env.VUE_APP_BASEAPI);

const service =   axios.create({
    baseURL:process.env.VUE_APP_BASEAPI,
    timeout:50000,
    headers:
    {
        'Content-Type': 'application/json'
    }
});

//请求前的拦截处理
service.interceptors.request.use(
    config=>{
        //
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