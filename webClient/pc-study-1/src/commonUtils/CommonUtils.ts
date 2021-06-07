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

        const child:ComponentNodeInfo = {Id:node.Id,children:[]};
        child.ParentId = parentNode.Id;
        child.path = node.Url;
        child.name = node.Name;
        child.level = level;
        child.redirect = node.ParentId == -1 ? "noredirect" : "";
        child.sort = node.Sort;
        child.meta = {title:node.Name,icon:node.Icon,noCache:true};
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