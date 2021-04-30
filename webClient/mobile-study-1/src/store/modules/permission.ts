import RootStateTypes from "@/InterfaceTypes";
import { constRoutes } from "@/router";
import { Getter, Module, Store } from "vuex";

export interface Permission extends RootStateTypes
{
    routes:any[];
    addRoutes:any[];
    home:string;
    count:number;
}

export enum PERMISSION_EVENT
{
    SET_ROUTES  =   "SET_ROUTES",
    SET_HOME = "SET_HOME",
}

export enum PERMISSION_ACTION_EVENT
{
    INCREMENT = "INCREMENT",
}

const permission:Module<Permission,RootStateTypes> = {
    state:
    {
        routes:[],
        addRoutes:[],
        home:"abc",
        count:0,
        getters:{}
    },
    mutations:
    {
        [PERMISSION_EVENT.SET_ROUTES]:( state:Permission,routes )=>
        {
            state.addRoutes = routes;
            state.routes = constRoutes.concat(routes)
        },
        [PERMISSION_EVENT.SET_HOME]:(state:Permission,home:string)=>{
            console.log("go this.:" + home)
            state.home = home;
        }
    },
    actions:
    {
        [PERMISSION_ACTION_EVENT.INCREMENT](this,store,context:any):void
        {
            store.commit(PERMISSION_EVENT.SET_HOME,context);

            console.log( "context" + context );
        }
    },
    getters:
    {
        addRoutes:(state:Permission)=>{
            return state.addRoutes;
        },
        home:(state:Permission)=>{
            return "home:" + state.home;
        }
    }

};



export default permission;