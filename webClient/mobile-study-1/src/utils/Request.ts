import axios from 'axios';
import { Notify } from 'vant';

console.log("rocess.env.NODE_ENV:" + process.env.NODE_ENV + " process.env.VUE_APP_BASEAPI:" + process.env.VUE_APP_BASEAPI);

export const service =   axios.create({
    baseURL:process.env.VUE_APP_BASEAPI,
    timeout:50000,
    headers:
    {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest:
    [
        function(data):string
        {
            let ret = "";
            for(const it in data)
            {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            ret = ret.substring(0,ret.length - 2);
            return ret
        }
    ]
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

        Notify({
            message:response.data.data.Msg || "服务器请求错误",
            type:"danger",
            duration:5000    
        });

        return Promise.reject("error");
    },
    error=>{
        console.log("err" + error);
        Notify({message:"服务器请求错误",type:"danger",duration:5000});
    }    
);