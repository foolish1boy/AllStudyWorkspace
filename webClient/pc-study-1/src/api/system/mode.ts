import { ResponseInfo } from '@/Infos/ServerInfos';
import Request from '@/utils/JSONRequest'
import { AxiosPromise } from 'axios';

export function reqGetList<T>(query:{[key:string]:any}):AxiosPromise<ResponseInfo<T>>
{
    return Request({
        url:'/system/mode/list',
        method:'get',
        params:query
    });
}


export function reqModeAdd(query:{[key:string]:any}):AxiosPromise<any> 
{
  console.log("reqModeAdd:");
  console.log(query);

  return Request.post('/system/mode/',query);

    // return Request({
    //   url: '/system/mode/',
    //   method: 'post',
    //   params: query
    // })
  }
  
  export function reqDeleteMode(id:number) :AxiosPromise<any>
  {
    return Request({
      url: '/system/mode/'+id,
      method: 'delete',
    })
  }
  
  export function reqEditData<T>(id:number):AxiosPromise<ResponseInfo<T>>
  {
    return Request({
      url: '/system/mode/' + id,
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
  
  