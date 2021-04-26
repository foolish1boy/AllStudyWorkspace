import {service} from '@/utils/Request'


export function reqFetchList()
{
    return service({url:"/LengendTestRouter/test",method:'post'})
}