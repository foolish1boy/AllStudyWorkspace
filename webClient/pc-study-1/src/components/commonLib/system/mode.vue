<template>
    <div class="modeBox app-container" >
        <div class="title_h4">
            <el-input :placeholder="$t('mode.placeholderSeach')" clearable style="width: 30%;" class="filter-item"></el-input>
            <el-button :loading="searchBtnLoadingBol"  class="filter-item" type="primary" icon="el-icon-search" @click="getListpublic()">{{$t('common.seach')}}</el-button>
            <el-button class="filter-item"  style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handlerCreateMode()">{{ $t('common.add') }}</el-button>
        </div>
        <el-row :gutter="20" >
            <div v-for="(item,index) in list" :key="index">
                <el-col :span="6" v-if="item.ParentId == '-1'" > 
                    <el-card shadow="hover">
                        <div class="conet_box" >
                            <header :class="item.Type == '1'?'':'green'">
                                <span class="li_content_box">{{item.Name}}({{item.Key}})</span>
                                <span class="title_icon_box">
                                <i class="el-icon-plus" @click="fnAddChildren(item)"></i>
                                <i class="el-icon-edit-outline" @click="fnEditParent(item.Id)"></i>
                                <i class="el-icon-close" @click="fnDeleteParent(item)"></i>
                                </span>
                            </header>
                            <ul>
                                <div v-for="(son, index) in list" :key="index">
                                <li v-if="son.ParentId == item.Id">
                                    <i v-if="son.Logs == '1'" class="el-icon-document"></i>
                                    <i v-else class="el-icon-remove-outline"></i>
                                    <span class="li_content_box">{{son.Name}} ({{son.Key}})</span>
                                    <span class="li_icon_box">
                                    <i class="el-icon-edit-outline" @click="fnEditChildren(son.Id)"></i>
                                    <i class="el-icon-close" @click="fnDeleteChildren(son)"></i>
                                    </span>
                                </li>
                                </div>
                            </ul>
                        </div>
                    </el-card>
                </el-col>
            </div>
        </el-row>


        <!--弹出框-->
        <el-dialog v-model="dialogFormVisible" >
            <el-form ref="dataForm" :rules="rules" :model="popupParam" label-position="right" label-width="100px" v-loading="dialogLoading">
                <!-- 类型 -->
                <el-form-item :label="$t('mode.modeName')" v-if="state == 'fatherAdd' || state == 'fatherEdit'">
                    <el-radio-group v-model="popupParam.Type" size="medium">
                        <el-radio :label="1">{{$t('mode.projectMode')}}</el-radio>
                        <el-radio :label="2">{{$t('mode.systemMode')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- 名称 -->
                <el-form-item :label="$t('mode.modeName')" prop="Name">
                    <el-input v-model="popupParam.Name"/>
                </el-form-item>
                <!--节点-->
                <el-form-item :label="$t('mode.nodeName')" prop="NodeId">
                    <el-select v-model="popupParam.NodeId" filterable placeholder="请选择节点" style="width:100%">
                        <el-option-group v-for="group in nodeList" :key="group.Id" :label="group.LangCn">
                        <el-option v-for="item in group.children" :key="item.Id" :label="item.LangCn" :value="item.Id"></el-option>
                        </el-option-group>
                    </el-select>
                </el-form-item>
                <!-- 别名 -->
                <el-form-item :label="$t('mode.modeAlias')" prop="Key">
                    <el-input v-model="popupParam.Key"/>
                </el-form-item>
                <!-- 排序 -->
                <el-form-item :label="$t('mode.modeSort')" prop="sort">
                    <el-input-number style="width: 50%" v-model="popupParam.Sort" :min="0" :max="1000"></el-input-number>
                </el-form-item>
                <!-- 是否追踪 -->
                <el-form-item v-if="state == 'sonAdd' || state == 'sonEdit'" :label="$t('mode.logTrace')">
                    <el-radio-group v-model="popupParam.Logs" size="medium">
                        <el-radio :label="1">{{$t('mode.Trace')}}</el-radio>
                        <el-radio :label="2">{{$t('mode.noTrace')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- 备注 -->
                <el-form-item :label="$t('mode.modeRemark')">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 8}"
                        :placeholder="$t('mode.enterContent')"
                        v-model="popupParam.Description"
                    ></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div  class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">{{$t('common.cancel')}}</el-button>
                    <el-button autofocus type="primary" @click="fnAffirm()">{{$t('common.confirm')}}</el-button>
                </div>
            </template>
            
        </el-dialog>

    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import local from "./local";
import {} from '@/api/system/mode';
import { reqFetchNodeList } from '@/api/system/node';
import { NodeInfo } from "@/Infos/ServerInfos";
import { formatDataListTree } from "@/commonUtils/CommonUtils";
import { ComponentNodeInfo, QueryInfo } from "@/Infos/CommonInfo";
import { ElForm } from "element-plus/lib";

type ModeState = "fatherAdd" | "fatherEdit"  |  "sonAdd"  | "sonEdit" | "";
interface ModeType 
{
    Id:string;
    Type:string;
    Md5:string;

    ParentId:string;
    Name:string;
    Key:string;
    Logs:string;
    Sort:number,
    Description:string;
}

@Options({
    name:"Mode"
})
export default class Mode extends Vue
{
    private nodeList:ComponentNodeInfo[] = [];
    private state:ModeState = "";
    private searchBtnLoadingBol:boolean = false; //搜索按钮等待
    private loading:boolean =  true; //列表loading状态
    private dialogFormVisible:boolean =  false;
    private dialogLoading:boolean =  false; // 模态框loading状态
    private listQuery:QueryInfo|undefined;
    private list:any[] = [];

    public rules:{[key:string]:any[]} | undefined = undefined;  
    private popupParam:ModeType = {
        Id:"",Type:"",Md5:"",ParentId:"",Name:"",Key:"",Logs:"",Sort:100,Description:""
    };

    public created():void
    {
        if(!this.$gobalI18n.global.getLocaleMessage('zh')['mode'])
        {
            this.$gobalI18n.global.mergeLocaleMessage('zh',local.zh);
        }

        this.rules = {
            Name: [
            { required: true,message: this.$t("mode.plaseEnterModeName"),trigger: "change"}
            ],
            Key: [
            {required: true,message: this.$t("mode.plaseEnterModeAliasName"),trigger: "change"}
            ]
        }
    }

    public getListpublic():void
    {
        
    }

    public getNodeList():void
    {
        let self = this;
        reqFetchNodeList<NodeInfo[]>().then(response=>{
            let parentNode:ComponentNodeInfo = {Id:-1,children:[]};
            formatDataListTree(parentNode,response.data.Data,1);
            self.nodeList = parentNode.children;
        }).catch(err=>{
            console.log("error");
        });
    }

    // 父级新增方法
    public handlerCreateMode():void
    {
        let self = this;
        self.state = "fatherAdd";
        this.dialogFormVisible = true;
        this.$nextTick(()=>{
            //let form = ( <typeof ElForm>this.$refs['dataForm']);
        });
    }

}
</script>

<style lang="scss" scoped>

</style>