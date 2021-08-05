import { ResponseInfo } from '@/Infos/ServerInfos';
import Request from '@/utils/JSONRequest'
import { AxiosPromise } from 'axios';



export function reqFetchList<T>(query:{[key:string]:any}):AxiosPromise<ResponseInfo<T>>
{
    return Request.get('/system/mode/list',{params:query})
}

export function reqFetchDetail<T>(id:number):AxiosPromise<ResponseInfo<T>>
{
    return Request.get('/system/role/' + id);
}

export function reqCreateRole<T>(data:any):AxiosPromise<ResponseInfo<T>>
{
    return Request.post('/system/role/',data)
}


export function reqUpdateRole<T>(data:any):AxiosPromise<ResponseInfo<T>>
{
    return Request.put( '/system/role/',data)
}


export function reqDeleteRole<T>(id:number):AxiosPromise<ResponseInfo<T>>
{
    return Request.delete('/system/role/' + id)
}

export function reqFetchNodeLis<T>():AxiosPromise<ResponseInfo<T>>
{
  return Request.get('/system/node/list');
}


export function reqUpdateNode<T>(data:any):AxiosPromise<ResponseInfo<T>>
{
    return Request.put('/system/role/node',data);
}

export function reqFetchPermissionList<T>(id:number):AxiosPromise<ResponseInfo<T>>
{
    return Request.get('/system/mode/list/')
}

export function reqUpdatePermission<T>(data:any):AxiosPromise<ResponseInfo<T>>
{
  return Request.put('/system/role/permission',data)
}