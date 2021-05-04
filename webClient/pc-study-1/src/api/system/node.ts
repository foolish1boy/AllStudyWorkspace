import { NodeInfo } from '@/Infos/ServerInfos';
import Request from '@/utils/Request'
import { AxiosPromise } from 'axios';

export function reqFetchNodeList():AxiosPromise<any>
{
    return Request({
        url:'/system/node/list',
        method:'get'
    });
}


export function reqCreateNode(data:NodeInfo):AxiosPromise<any>
{
    return Request({
        url:'/system/node/',
        method:"post",
        data:data
    });
}


export function reqFetchNodeDetail(id:number):AxiosPromise<any>
{
    return Request({
        url:"/system/node/" + id,
        method:'get'
    });
}


export function reqUpdateNode(data:NodeInfo) {
    return Request({
      url: '/system/node/',
      method: 'put',
      data
    })
  }
  
  
  export function reqDeleteNode(id:number) {
    return Request({
      url: '/system/node/' + id,
      method: 'delete',
    })
  }
  