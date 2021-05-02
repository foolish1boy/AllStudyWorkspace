import RootStateTypes from "@/InterfaceTypes";
import {  Module } from "vuex";

export type StateUserInfoData = 
{
    user:string;
    roles:any[];
    gamesData:string;
}

export enum STATE_USERINFO_EVENT
{
    SET_ROUTES  =   "SET_ROUTES",
}



const StateUserInfo:Module<StateUserInfoData,RootStateTypes> = {
    state:
    {
        user:'',
        roles:[],
        gamesData:"abc"
    },
    mutations:
    {
        /** 
        SET_ROUTES:( state:StateUserInfoData,routes )=>
        {
           
        },
        SET_HOME:(state:StateUserInfoData,home:string)=>{
           
        }
        **/
    },
    actions:
    {

    },
    getters:
    {
        roles:(state:StateUserInfoData)=>{
            return state.roles;
        },
        user:(state:StateUserInfoData)=>{
            return state.user;
        }
    }

};



export default StateUserInfo;