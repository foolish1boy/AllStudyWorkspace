import { ComponentNodeInfo } from "@/Infos/CommonInfo";
import { NodeInfo } from "@/Infos/ServerInfos";

/**
 * 递归节点
 * @param parentNode 
 * @param list 
 * @param level 
 */
export function formatDataListTree(parentNode:ComponentNodeInfo,list:NodeInfo[],level:number,requireCom:boolean = false):void
{
    for(const node of list)
    {
        if( node.ParentId != parentNode.Id )
        {
            continue;
        }

        console.log("parentNode");
        console.log(parentNode);

        const child:ComponentNodeInfo = {Id:node.Id,children:[]};
        child.ParentId = parentNode.Id;
        child.path = node.Url;
        child.name = node.Name;
        child.level = level;
        child.redirect = node.ParentId == -1 ? "noredirect" : "";
        child.sort = node.Sort;
        child.meta = {title:node.Name,icon:node.Icon,noCache:true};
        child.langCn = node.LangCn;
        child.isLib = node.IsLib;
        
        if( requireCom )
        {
            child.comp = require('@/view' + node.Url + '.vue' );
        }
        formatDataListTree(child,list,level+1,requireCom);
        parentNode.children.push(child);

        parentNode.children.sort(sortFun);
    }
}

export function sortFun(node1:ComponentNodeInfo,node2:ComponentNodeInfo):number
{
    if( node1.sort == undefined || node2.sort == undefined )
    {
        return 0;
    }

    return node1.sort - node2.sort;
}

//清空数组空元素
export function clearNullOfArray<T>(arr:T[]):T[]
{
    if(arr)
    {
        for(let i = arr.length - 1;i >= 0; i --)
        {
            if( arr[i]+"" == '' ||  typeof(arr[i]) == "undefined" )
            {
                arr.splice(i,1);
            }
        }
    }

    return arr;
}

//将字符串数组转化为数值数组
export function stringTranslateNumber(arr:string[]):number[]
{
    let list:number[] = [];

    for(let i = 0; i < arr.length;i++)
    {
        if(arr[i] != '')
        {
            list.push(Number(arr[i]));
        }   
    }

    return list;
}