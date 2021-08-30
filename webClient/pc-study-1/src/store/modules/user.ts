import RootStateTypes from "@/InterfaceTypes";
import { Module } from "vuex";
import { getSystemConfig, getUserInfo, reqLoginByToken } from '@/api/login/login'
import { removeToken, setToken } from '@/utils/auth'

enum USER_MUTATION_EVENT
{
    SET_TOKEN       ="SET_TOKEN",
    SET_CONFIG      ="SET_CONFIG",
    SET_ACCOUNT     ='SET_ACCOUNT',
    SET_ADMININFO   ='SET_ADMININFO',
    SET_ROLES       ='SET_ROLES',
}

export enum USER_ACTION_EVENT
{
    GET_CONIFG = "fnGetConfig",
    LOGIN_BY_TOKEN = "LoginByToken",
    GET_USER_INFO = "GetUserInfo",              //获取用户信息
    FEED_LOG_OUT = "FedLogOut",                          //客户端登出
}

export interface StateUserInfoData
{
    token:string;
    roles:any[];
    systemConfig:string;
    adminInfo:string;
    accountInfo:string;
}

const StateUseInfo:Module<StateUserInfoData,RootStateTypes> = 
{
    state:
    {
        token:'',
        roles:[],
        systemConfig:'',
        adminInfo:'',
        accountInfo:'',
    },
    mutations:
    {
        [USER_MUTATION_EVENT.SET_TOKEN](state:StateUserInfoData,token:string)
        {
            state.token = token;
        },
        [USER_MUTATION_EVENT.SET_CONFIG](state:StateUserInfoData,payload:any)
        {
            state.systemConfig = payload;
        },
        [USER_MUTATION_EVENT.SET_ACCOUNT](state:StateUserInfoData,payload:any)
        {
            state.accountInfo = payload;
        },
        [USER_MUTATION_EVENT.SET_ADMININFO](state:StateUserInfoData,payload:any)
        {
            state.adminInfo = payload;
        },
        [USER_MUTATION_EVENT.SET_ROLES](state:StateUserInfoData,payload:any)
        {
            state.roles = payload;
        }
    },
    actions:
    {
        [USER_ACTION_EVENT.GET_CONIFG](this,store,context:any)
        {
            //获取全局系统配置信息
            return new Promise((resolve,reject)=>{
                getSystemConfig<any>()
                .then(response=>{
                    if( response.data.Data == undefined )
                    {
                        reject('请重新登陆');
                        return;
                    }

                    let data = response.data.Data;
                    this.commit(USER_MUTATION_EVENT.SET_CONFIG,data);
                    resolve(response);
                })
                .catch(err=>{reject(err)});
            });
        },
        [USER_ACTION_EVENT.LOGIN_BY_TOKEN](this,store,context:{token:string})
        {
            return new Promise((resolve,reject)=>{
                reqLoginByToken<{Token:string}>(context.token)
                .then(response=>{

                    console.log("response.data.Data:");
                    console.log(response.data.Data);

                    this.commit(USER_MUTATION_EVENT.SET_TOKEN,response.data.Data.Token);
                    setToken(response.data.Data.Token);
                    resolve(response);
                })
                .catch(err=>{
                    reject(err);
                })
            }) 
        },
        [USER_ACTION_EVENT.GET_USER_INFO](this,store,context:any)       //获取用户信息
        {
            return new Promise((resolve,reject)=>{
                getUserInfo()
                .then(response=>{
                    if( response.data.Data == undefined )
                    {
                        reject('请重新登陆');
                    }
                    let data = response.data.Data;
                    this.commit(USER_MUTATION_EVENT.SET_TOKEN,data.Token);
                    this.commit(USER_MUTATION_EVENT.SET_ACCOUNT,data.Account);
                    this.commit(USER_MUTATION_EVENT.SET_ADMININFO,data);
                    setToken(data.Token);
                    if( data.Role )
                    {
                        this.commit(USER_MUTATION_EVENT.SET_ROLES,data.Role);
                    }
                    else
                    {
                        reject('获取用户信息错误');
                    }
                    resolve(response);
                })
                .catch(err=>{
                    reject(err);
                })
            });
        },
        [USER_ACTION_EVENT.FEED_LOG_OUT](this,store,context:any)
        {
            return new Promise(resolve=>{
                this.commit(USER_MUTATION_EVENT.SET_TOKEN,'');
                removeToken();
                resolve({});
            })
        }
    },
    getters:
    {

    }
}

export default StateUseInfo;