<template>
    <div class="app-container" >
        <el-row :gutter="20" >
            <el-col :span="24">
                <el-button class="filter-item" style="margin-leftt:10px;margin-bottom:20px" type="primary" icon="el-icon-edit" @click="handleCreate(-1)" > {{ $t('node.addRoot') }} </el-button>
            </el-col>
            <el-col :span="8" >
                <el-tree :data="nodeList" node-key="Id" :props="treeProps" :default-expand-all="true" >
                    <template #default="{ node, data }">
                        <span class="custom-tree-node" >
                        <span>{{data.name}}</span>
                        <span> 
                            <el-button v-if="data.level == 1" type="text" size="mini" icon="el-icon-circle-plus-outline" @click="handleCreate(data.Id)" ></el-button> 
                            <el-button type="text" size="mini" icon="el-icon-edit" @click="handleUpdate(data)" ></el-button>
                            <el-button  type="text" size="small" icon="el-icon-delete" @click="handleDelete(data,node)" ></el-button>
                        </span>
                    </span>
                    </template>
                    
                </el-tree>
            </el-col>
        </el-row>

        <!--新增编辑节点 v-el-draggable-dialog elDraggableDialog -->
         <el-dialog :title="titleTxt" :close-on-click-modal="false" v-model="dialogFormVisible"   >
           
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px">
                <el-form-item :label="$t('node.name')" prop="Name">
                    <el-input v-model="temp.Name" :placeholder="$t('node.name')" :maxlength="GLOBAL.inputMaxLenght"/>
                </el-form-item>
                <el-form-item :label="$t('node.url')" prop="Url" >
                    <el-input v-model="temp.Url" :placeholder="$t('node.url')" :maxlength="GLOBAL.inputMaxLenght" />
                </el-form-item>
                <el-form-item :label="$t('node.icon')" prop="Icon">
                    <el-input v-model="temp.Icon" :placeholder="$t('node.icon')" :maxlength="GLOBAL.inputMaxLenght"/>
                </el-form-item>
                <el-form-item :label="$t('node.cn')" prop="LangCn">
                    <el-input v-model="temp.LangCn" :placeholder="$t('node.cn')" :maxlength="GLOBAL.inputMaxLenght"/>
                </el-form-item>
                <el-form-item :label="$t('node.sort')" prop="Sort">
                    <el-input-number v-model="temp.Sort" :step="1" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item :label="$t('node.description')" prop="Description">
                    <el-input v-model="temp.Description" :placeholder="$t('node.description')" :maxlength="GLOBAL.inputMaxLenght"/>
                </el-form-item>
            </el-form>
            
            <template #footer>
                 <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">{{ $t('common.cancel') }}</el-button>
                    <el-button type="primary" @click="(dialogStatus==='create' || dialogStatus==='createRoot')?createData():updateData()" :loading="loadingSaveBtn">{{ $t('common.confirm') }}</el-button>
                </div>
            </template>
           
        </el-dialog>
        
    </div>
</template>

<script lang="ts" >

import { ComponentNodeInfo, DialogStatus, ItemStatus } from '@/Infos/CommonInfo';
import { NodeInfo } from '@/Infos/ServerInfos';
import { formatDataListTree } from "@/commonUtils/CommonUtils";
import { Options, Vue } from 'vue-class-component';
import { ElForm, ElMessage, ElMessageBox } from "element-plus";
import local from "./local";
import { reqCreateNode, reqDeleteNode, reqFetchNodeDetail, reqFetchNodeList, reqUpdateNode } from '@/api/system/node';
import {RuleItem} from 'async-validator';
import { USER_ACTION_EVENT } from '@/store/modules/user'
import { awaitWrap } from '@/Infos/CommonDefine';

@Options<Node>({
    name:"Node",
})
export default class Node extends Vue
{
    private nodeList:ComponentNodeInfo[] = [];
    public treeProps:{label:string,children:string}= {label:'name',children:'children'}

    private dialogFormVisible:boolean = false;
    private loadingSaveBtn:boolean = false;
    private dialogStatus:string = DialogStatus.CREATE;
    private temp:NodeInfo = {Id:-1,ParentId:-1,Name:"",Sort:0,Url:"",LangCn:"",Description:"",Icon:"",IsLib:0};
    private listLoading:boolean = false;
        
    private textMap:{update:string,[key:string]:string} = {
        update: ItemStatus.UPDATE,
        create: ItemStatus.CREATE,
        createRoot: ItemStatus.CREATE_ROOT,
        updateRoot: ItemStatus.UPDATE_ROOT,
      };


    private rules:{[key:string]:RuleItem[]} = {
        Name:[
            {required:true,message:"必填名字"}
        ],
        LangCn:[
            {required:true,message:"需要名字"}
        ],
        Url:[
            {
                required:true,message:"地址不能空"
            }
        ]

    }

    public created():void
    {
        console.log("node created")
        let self = this;
        if(!this.$gobalI18n.global.getLocaleMessage("zh")["node"])
        {
            this.$gobalI18n.global.mergeLocaleMessage('zh',local.zh);
        }
        this.getList();     
    }

    private async getList()
    {
        this.listLoading = true;
        let [err,response] = await awaitWrap( reqFetchNodeList<NodeInfo[]>());
        if( err != null || response == null  )
        {
            this.listLoading = false;
            return;
        }

        let responseData:NodeInfo[] = response.data.Data;
        let parentNode:ComponentNodeInfo = {Id:-1,children:[]};
        formatDataListTree(parentNode,responseData,1);
        this.nodeList = parentNode.children; 
        this.listLoading = true;
    }

    public handleCreate(parentId:number):void
    {
        let self = this;
        self.resetTemp();
        self.temp.ParentId = parentId;
        self.dialogStatus = parentId == -1 ? DialogStatus.CREATE_ROOT : DialogStatus.CREATE;
        self.dialogFormVisible = true;
        self.$nextTick(() => {
            let eleform =  self.$refs['dataForm'];
            (eleform as InstanceType<typeof ElForm>).clearValidate();
         });
    }
   
    private async createData()
    {
        let self = this;

        let validteFlag =  await (self.$refs["dataForm"] as InstanceType<typeof ElForm>).validate();
        if(!validteFlag)
        {
            return;
        }

        self.loadingSaveBtn = true;
        let [err,response] = await awaitWrap(reqCreateNode(self.temp));
        if( err != null || response == null )
        {
            this.loadingSaveBtn = false;
            return;
        }

        self.dialogFormVisible = false;
        ElMessage.success(this.$t("common.addSuccess"));
        self.loadingSaveBtn = false;
        this.getList();
        self.$store.dispatch(USER_ACTION_EVENT.GET_CONIFG); 
    }

    public handleUpdate(data:ComponentNodeInfo):void
    {
        let self = this;
        reqFetchNodeDetail<NodeInfo>(data.Id as number ).then(response=>{
            self.temp = Object.assign({},response.data.Data);
        }).catch(err=>{})

        this.dialogStatus = data.ParentId == -1 ? DialogStatus.UPDATE_ROOT:DialogStatus.UPDATE;
        this.dialogFormVisible = true;
        self.$nextTick(()=>{
            (self.$refs['dataForm'] as InstanceType<typeof ElForm>).clearValidate();
        });
    }

    public updateData():void
    {
        let self = this;
        (self.$refs['dataForm'] as InstanceType<typeof ElForm >).validate(valide=>{
            if(!valide)
            {
                return;
            }
            self.dialogFormVisible = false;
            const tmpData = Object.assign({},self.temp);
            reqUpdateNode(tmpData).then( ()=>{
                self.dialogFormVisible = false;
                ElMessage.success(self.$t("common.editSuccess"));
                self.loadingSaveBtn = false;
                self.getList();
                self.$store.dispatch(USER_ACTION_EVENT.GET_CONIFG).then(()=>{});
            }).catch(err=>{

            })

        });
    }

    private handleDelete(data:ComponentNodeInfo):void
    {
        let self = this;
        ElMessageBox.confirm(self.$t('common.confirmDelete'),self.$t('common.hint'),
        {confirmButtonText:self.$t('common.confirm'),cancelButtonText:self.$t('common.cancel')})
        .then(()=>{
            reqDeleteNode(data.Id as number ).then(response=>{
                ElMessage.success(self.$t('common.deleteSuccess'));
                self.getList();
                self.$store.dispatch(USER_ACTION_EVENT.GET_CONIFG).then(res=>{});
            }).catch(err=>{

            });
        }).catch(()=>{});
    }

    private resetTemp():void
    {
        let self = this;
        self.temp.Id = -1;
        self.temp.IsLib = 0;
        self.temp.ParentId = -1;
        self.temp.Name = "";
        self.temp.Url = "";
        self.temp.Icon = "";
        self.temp.Sort = 0;
        self.temp.LangCn = "";
        self.temp.Description = "";
    }

    private get titleTxt():string
    {
        return this.$t("node." + this.textMap[this.dialogStatus]);
    }
}
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
