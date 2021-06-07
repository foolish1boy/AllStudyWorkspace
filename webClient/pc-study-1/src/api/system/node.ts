import { NodeInfo, ResponseInfo } from '@/Infos/ServerInfos';
import Request from '@/utils/JSONRequest'
import { AxiosPromise } from 'axios';

export function reqFetchNodeList<T>():AxiosPromise<ResponseInfo<T>>
{
    return Request({
        url:'/system/node/list',
        method:'get'
    });
}


export function reqCreateNode<T>(data:NodeInfo):AxiosPromise<ResponseInfo<T>>
{
    return Request({
        url:'/system/node/',
        method:"post",
        data:data
    });
}


export function reqFetchNodeDetail<T>(id:number):AxiosPromise<ResponseInfo<T>>
{
    return Request({
        url:"/system/node/" + id,
        method:'get'
    });
}


export function reqUpdateNode<T>(data:NodeInfo) :AxiosPromise<ResponseInfo<T>>
{
    return Request({
      url: '/system/node/',
      method: 'put',
      data
    })
  }
  
  
  export function reqDeleteNode<T>(id:number) :AxiosPromise<ResponseInfo<T>>
  {
    return Request({
      url: '/system/node/' + id,
      method: 'delete',
    })
  }
  