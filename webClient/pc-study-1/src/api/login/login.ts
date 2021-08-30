import { ResponseInfo } from '@/Infos/ServerInfos';
import Request from '@/utils/JSONRequest'
import { AxiosPromise } from 'axios';

let SYSTEM_QUERY_PRE:string = '/system/user/'

export function reqLoginTokenByUsername<T>(userName:string,password:string):AxiosPromise<ResponseInfo<T>>
{
    return Request({
        url:SYSTEM_QUERY_PRE + "reqToken",
        method:'post',
        data:{Username:userName,Password:password}
    })
}

export function reqLoginByToken<T>(token:string):AxiosPromise<ResponseInfo<T>>
{
    return Request({
        url:SYSTEM_QUERY_PRE + "login",
        method:'post',
        data:{token:token}
    })
}

export function logout()
{
    return Request({
        url:SYSTEM_QUERY_PRE + 'logout',
        method:'get'
    })
}

export function getUserInfo()
{
    return Request({
        url:SYSTEM_QUERY_PRE+'islogin',
        method:'get',
    })
}

export function getSystemConfig<T>():AxiosPromise<ResponseInfo<T>>
{
    console.log(" loginApi getSystemConfig:");
    return Request({
        url:'/system/public/config',
        method:'get'
    })
}