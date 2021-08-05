import RootStateTypes from "@/InterfaceTypes";
import { Module } from "vuex";

export enum APP_MUTATION_EVENT
{
    
}

export enum APP_ACTION_EVENT
{
    SET_PAGE_SIZE = "setPageSize",
}

export interface StateAppInfoData
{
    pageSize:number
}

const StateAppInfo:Module<StateAppInfoData,RootStateTypes> = 
{
    state:
    {
        pageSize:20
    },
    mutations:
    {
        [APP_ACTION_EVENT.SET_PAGE_SIZE](state: StateAppInfoData, payload?: any)
        {
            state.pageSize = payload;
        }
    },
    actions:
    {
       [APP_ACTION_EVENT.SET_PAGE_SIZE](this,store,context:any)
       {
         this.commit(APP_ACTION_EVENT.SET_PAGE_SIZE,context);
       }
    },
    getters:
    {

    }
}

export default StateAppInfo;