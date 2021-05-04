<template>
    <div class="app-container" >
        <el-row :gutter="20" >
            <el-col :span="24">
                <el-button class="filter-item" style="margin-leftt:10px;margin-bottom:20px" type="primary" icon="el-icon-edit" @click="handleCreate(-1)" > {{ $t('node.addRoot') }} </el-button>
            </el-col>
            <el-col :span="8" >
                <el-tree :data="nodeList" node-key="Id" :default-expand-all="true" >
                    <span class="custom-tree-node" >
                        <span>{{node.label}}</span>
                        <span> 
                            <el-button v-if="data.TempLevel == 1" type="text" size="mini" icon="el-icon-circle-plus-outline" @click="handleCreate(data.Id)" ></el-button> 
                            <el-button type="text" size="mini" icon="el-icon-edit" @click="handleUpdate(data)" ></el-button>
                            <el-button  type="text" size="small" icon="el-icon-delete" @click="handleDelete(data)" ></el-button>
                        </span>
                    </span>
                </el-tree>
            </el-col>
        </el-row>

        <!--新增编辑节点  v-el-drag-dialog-->
        
        <el-dialog  :title="titleTxt" :close-on-click-modal="false" v-model="dialogFormVisible"   >
           
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px">
                <el-form-item :label="$t('node.name')" prop="Name">
                    <el-input v-model="temp.Name" :placeholder="$t('node.name')" :maxlength="GLOBAL.inputMaxLenght"/>
                </el-form-item>
                <el-form-item :label="$t('node.url')" prop="Url">
                    <el-input v-model="temp.Url" :placeholder="$t('node.url')" :maxlength="GLOBAL.inputMaxLenght"/>
                </el-form-item>
                <el-form-item :label="$t('node.icon')" prop="Icon">
                    <el-input v-model="temp.Icon" :placeholder="$t('node.icon')" :maxlength="GLOBAL.inputMaxLenght"/>
                </el-form-item>
                <el-form-item :label="$t('node.cn')" prop="LangCn">
                    <el-input v-model="temp.LangCn" :placeholder="$t('node.cn')" :maxlength="GLOBAL.inputMaxLenght"/>
                </el-form-item>
                <el-form-item :label="$t('node.tw')">
                    <el-input v-model="temp.LangTw" :placeholder="$t('node.tw')" :maxlength="GLOBAL.inputMaxLenght"/>
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
                    <el-button type="primary" @click="dialogStatus==='create' || dialogStatus==='createRoot'?createData():updateData()" :loading="loadingSaveBtn">{{ $t('common.confirm') }}</el-button>
                </div>
            </template>
           
        </el-dialog>
        
    </div>
</template>

<script lang="ts" >

import { ComponentNodeInfo } from '@/Infos/CommonInfo';
import { NodeInfo } from '@/Infos/ServerInfos';
import { formatDataListTree } from "@/commonUtils/CommonUtils";
import { Options, Vue } from 'vue-class-component';
import { ElForm, locale } from "element-plus";
import local from "./local";

@Options<Node>({
    name:"Node",
    watch:{
        dialogStatus():void
        {
            this.titleTxt = this.$t("node." + this.textMap[this.dialogStatus]);
        }
    }
})
export default class Node extends Vue
{
    private nodeList:ComponentNodeInfo[] = [];
    private dialogFormVisible:boolean = false;
    private loadingSaveBtn:boolean = false;
    private dialogStatus:string = "create";
    private titleTxt:string = "";
    private temp:NodeInfo = {Id:-1,ParentId:-1,Name:"",Sort:"",Url:"",LangCn:"",Description:"",Icon:""};
    
    private rules:{[key:string]:any[]} = {
        Name:[
            {required:true,message:"必须",trigger:"change"}
        ],
        LangCn:[
            {required:true,message:"",trigger:"change"}
        ]

    }

    public created():void
    {
        let self = this;
        if(!this.$gobalI18n.global.getLocaleMessage("zh")["node"])
        {
            this.$gobalI18n.global.mergeLocaleMessage('zh',local.zh);
        }
        this.getList();
        
    }

    private getList():void
    {
        //test
        let responseData:NodeInfo[] = [];
        let parentNode:ComponentNodeInfo = {Id:-1,children:[]};
        formatDataListTree(parentNode,responseData,1);
        this.nodeList = parentNode.children;
    }

    public handleCreate(parentId:number):void
    {
        let self = this;
        self.resetTemp();
        self.temp.ParentId = parentId;
        self.dialogStatus = parentId == -1 ? "createRoot" : "create";
        self.dialogFormVisible = true;
        // self.$nextTick(() => {
        //     (< typeof ElForm>self.$refs["dataForm"]).clearValidate();
        // });

        
    }

    public handleUpdate(data:NodeInfo):void
    {
        let self = this;

        this.dialogStatus = data.ParentId == -1 ? "updateRoot":"update";
        this.dialogFormVisible = true;
    }

    private handleDelete(data:ComponentNodeInfo):void
    {

    }

    private resetTemp():void
    {
        let self = this;
        self.temp.Id = -1;
        self.temp.ParentId = -1;
        self.temp.Name = "";
        self.temp.Url = "";
        self.temp.Icon = "";
        self.temp.Sort = "";
        self.temp.LangCn = "";
        self.temp.Description = "";
    }
}
</script>

<style lang="sass" scoped>

</style>
