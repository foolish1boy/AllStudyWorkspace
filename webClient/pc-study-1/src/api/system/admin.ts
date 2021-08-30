import { ResponseInfo } from '@/Infos/ServerInfos';
import Request from '@/utils/JSONRequest'
import { AxiosPromise } from 'axios';

let ADMIN_QUERY_PRE:string = '/system/admin/'

export function reqFetchList<T>(query:{[key:string]:any}):AxiosPromise<ResponseInfo<T>>
{
    return Request({
        url: ADMIN_QUERY_PRE + 'list',
        method:'get',
        params:query
    });
}

export function reqFetchDetail<T>(id:string|number):AxiosPromise<ResponseInfo<T>>
{
    return Request({
        url:ADMIN_QUERY_PRE  + id,
        method:'get'
    })
}

export function reqCreateUser<T>(data:any):AxiosPromise<ResponseInfo<T>>
{
    return Request({
        url:ADMIN_QUERY_PRE,
        method:'post',
        data:data
    })
}

export function reqUpdateUser<T>(data:any):AxiosPromise<ResponseInfo<T>>
{
    return Request({
        url:ADMIN_QUERY_PRE,
        method:"put",
        data:data
    })
}

export function reqDeleteUser<T>(id:number):AxiosPromise<ResponseInfo<T>>
{
    return Request({
        url:ADMIN_QUERY_PRE+id,
        method:'delete'
    })
}