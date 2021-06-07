export interface ResponseInfo<T>
{
    Data:T;
    Message:String;
    Code:number;
}

export interface NodeInfo
{
    Id:number,
    ParentId:number,
    Name:string, // 节点名称
    Url: string, // 链接地址
    Icon: string, //Icon图标
    Sort: number, // 排序编号
    LangCn: string, //简体中文
    LangTw?: string, //繁体中文
    Description: string // 备注说明
}