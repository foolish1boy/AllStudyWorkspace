import { ComponentNodeInfo } from "@/Infos/CommonInfo";
import { NodeInfo } from "@/Infos/ServerInfos";

export function formatDataListTree(parentNode:ComponentNodeInfo,list:NodeInfo[],level:number):void
{
    for(const node of list)
    {
        if( node.ParentId != node.Id )
        {
            continue;
        }

        const child:ComponentNodeInfo = {Id:node.Id,children:[]};
        child.path = node.Url;
        child.name = node.Name;
        child.redirect = node.ParentId == -1 ? "noredirect" : "";
        child.meta = {title:node.Name,icon:node.Icon,noCache:true};
        child.comp = require('@/view' + node.Url + '.vue' );
        formatDataListTree(child,list,level+1);
        parentNode.children.push(child);
    }
}