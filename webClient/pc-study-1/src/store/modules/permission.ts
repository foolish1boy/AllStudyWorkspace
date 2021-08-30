import { Module } from "vuex";
import RootStateTypes from "@/InterfaceTypes";
import { formatDataListTree } from "@/commonUtils/CommonUtils";
import { ComponentNodeInfo } from "@/Infos/CommonInfo";
import { constantRoutes } from "@/router";

export enum PERMISSION_ACTION_EVENT
{
   GENERATE_ROUTES = "GenerateRoutes",
}

enum PERMISSION_MUTATION_EVENT
{
    SET_ROUTES = "SET_ROUTES",
    SET_HOMEPATH = 'SET_HOMEPATH',
}

export interface StatePermissionInfoData
{
    routes:any[];
    addRoutes:any[];
    home:'';
}


const StatePermissionInfo:Module<StatePermissionInfoData,RootStateTypes> = 
{
    state:
    {
        routes:[],
        addRoutes:[],
        home:'',
    },
    mutations:
    {
        [PERMISSION_MUTATION_EVENT.SET_ROUTES](state:StatePermissionInfoData,payload:any)
        {
            state.addRoutes = payload;
            state.routes = constantRoutes.concat(payload);
        },
        [PERMISSION_MUTATION_EVENT.SET_HOMEPATH](state:StatePermissionInfoData,payload:any)
        {
            state.home = payload;
        }
    },
    actions:
    {
        [PERMISSION_ACTION_EVENT.GENERATE_ROUTES](this,store,payLoad:{menu:any})
        {
            let parentNode:ComponentNodeInfo = {Id:-1,children:[]};
            formatDataListTree(parentNode,payLoad.menu,1);
            this.commit(PERMISSION_MUTATION_EVENT.SET_ROUTES,parentNode.children);
            parentNode.children.push({path:"*",redirect:'/404',hidden:true,children:[]})
            this.commit(PERMISSION_MUTATION_EVENT.SET_HOMEPATH,parentNode.children[0]);
            
            return Promise.resolve(parentNode.children);
        }
    },
    getters:
    {
        
    }
}

export default StatePermissionInfo;