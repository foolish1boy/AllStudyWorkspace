import { Component } from "@vue/runtime-core";

export enum DialogStatus
{
    NONE = '',
    CREATE = 'create',
    UPDATE = 'update',
    CREATE_ROOT = 'createRoot',
    UPDATE_ROOT = 'updateRoot',
}

export enum ItemStatus
{
    NONE = '',
    CREATE = 'add',
    UPDATE = 'edit',
    CREATE_ROOT = 'addRoot',
    UPDATE_ROOT = 'editRoot',
}

export interface QueryInfo
{
    KeyWord:string;
    Page:number;
    PageSize:number;
    Sort?:string;
    BeginTime?:number | string;
    EndTime?:number | string;
}

export interface ComponentNodeInfo
{
    ParentId?:number;
    Id?:number;
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
    hidden?:boolean;
    isLib?:number;     //是否是库对象
}

export interface Pagination
{
    MaxCount:number;
}