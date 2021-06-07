import RootStateTypes from "@/InterfaceTypes";
import { Module } from "vuex";

export enum USER_MUTATION_EVENT
{
    
}

export enum USER_ACTION_EVENT
{
    GET_CONIFG = "fnGetConfig",
}

export interface StateUserInfoData
{

}

const StateUseInfo:Module<StateUserInfoData,RootStateTypes> = 
{
    state:
    {

    },
    mutations:
    {

    },
    actions:
    {
        [USER_ACTION_EVENT.GET_CONIFG](this,store,context:any)
        {
            //获取全局系统配置信息
        }
    },
    getters:
    {

    }
}

export default StateUseInfo;