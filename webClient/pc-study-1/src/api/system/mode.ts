import Request from '@/utils/Request'
import { AxiosPromise } from 'axios';

export function reqGetList(query:{[key:string]:any}):AxiosPromise<any>
{
    return Request({
        url:'/system/mode/list',
        method:'get',
        params:query
    });
}


export function reqModeAdd(query:{[key:string]:any}):AxiosPromise<any> 
{
    return Request({
      url: '/system/mode/',
      method: 'post',
      params: query
    })
  }
  
  export function reqDeleteMode(id:number) :AxiosPromise<any>
  {
    return Request({
      url: '/system/mode/'+id,
      method: 'delete',
    })
  }
  
  export function reqEditData(query:{[key:string]:any}):AxiosPromise<any> 
  {
    return Request({
      url: '/system/mode/' + query,
      method: 'get'
    })
  }
  
  export function reqEditMode(data:{[key:string]:any}) :AxiosPromise<any>
  {
    return Request({
      url: '/system/mode/',
      method: 'put',
      data
    })
  }
  
  