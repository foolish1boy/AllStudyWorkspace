import { Component } from "@vue/runtime-core";

export interface ComponentNodeInfo
{
    Id:number;
    path?:string;
    name?:string;
    //component?:Component;
    comp?:Component;
    children:ComponentNodeInfo[];
    redirect?:string;
    meta?:{title:string,icon:string,noCache:boolean};
}