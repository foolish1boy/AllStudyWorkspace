import { ResponseInfo } from '@/Infos/ServerInfos';
import { AxiosResponse } from "axios";

export type ServiceResponse<T> = AxiosResponse<ResponseInfo<T>>

export function awaitWrap<T, U = any>(promise: Promise<T>): Promise<[U | null, T | null]> 
{
    return promise
     .then<[null, T]>((data: T) => [null, data])
     .catch<[U, null]>(err => [err, null])
}