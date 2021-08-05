import { Component } from "@vue/runtime-core";

export interface QueryInfo
{
    KeyWord:string;
    Page:number;
    PageSize:number;
}

export interface ComponentNodeInfo
{
    ParentId?:number;
    Id:number;
    path?:string;
    langCn?:string;
    langTw?:string;
    name?:string;
    //component?:Component;
    comp?:Component;
    children:ComponentNodeInfo[];
    redirect?:string;
    meta?:{title:string,icon:string,noCache:boolean};
    level?:number;
    sort?:number;
}