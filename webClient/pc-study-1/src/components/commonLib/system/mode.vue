<template>
    <div class="modeBox app-container" >
        <div class="title_h4">
            <el-input :placeholder="$t('mode.placeholderSeach')" clearable style="width: 30%;" class="filter-item"></el-input>
            <el-button :loading="searchBtnLoadingBol"  class="filter-item" type="primary" icon="el-icon-search" @click="getListpublic()">{{$t('common.seach')}}</el-button>
            <el-button class="filter-item"  style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handlerCreateMode()">{{ $t('common.add') }}</el-button>
        </div>

        <el-row :gutter="20" v-loading="loading" >
            <div v-for="(item , index) in list" :key="index">
                <!--<el-col :span="6" v-if="item.ParentId == '-1'">-->
                    <el-card shadow="hover"  class="conet_box" v-if="item.ParentId == '-1'" >
                        <template #header>
                            <div :class="item.Type == 1?'':'green'">
                                <span class="li_content_box">{{item.Name}}({{item.Key}})</span>
                                <span class="title_icon_box">
                                    <i class="el-icon-plus add_cursor" @click="fnAddChildren(item)"  ></i>
                                    <i class="el-icon-edit-outline add_cursor" @click="fnEditParent(item.Id)"></i>
                                    <i class="el-icon-close add_cursor" @click="fnDeleteParent(item)"></i>
                                </span>
                            </div>
                        </template>
                        
                        <ul>
                            <div v-for="(son, index) in list" :key="index">
                            <li v-if="son.ParentId == item.Id">
                                <i v-if="son.Logs == 1" class="el-icon-document"></i>
                                <i v-else class="el-icon-remove-outline"></i>
                                <span class="li_content_box">{{son.Name}} ({{son.Key}})</span>
                                <span class="li_icon_box">
                                    <i class="el-icon-edit-outline" @click="fnEditChildren(son.Id)"></i>
                                    <i class="el-icon-close" @click="fnDeleteChildren(son)"></i>
                                </span>
                            </li>
                            </div>
                        </ul>
                     
                    </el-card>
                <!--</el-col>-->
            </div>
        </el-row>


         <!--弹出框-->
        <el-dialog v-model="dialogFormVisible" title="弹出框" >
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
                        <el-option-group v-for="group in nodeList" :key="group.Id" :label="group.langCn">
                        <el-option v-for="item in group.children" :key="item.Id" :label="item.langCn" :value="item.Id"></el-option>
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
import { reqDeleteMode, reqEditData, reqEditMode, reqGetList, reqModeAdd } from '@/api/system/mode';
import { reqDeleteNode, reqFetchNodeList } from '@/api/system/node';
import { NodeInfo } from "@/Infos/ServerInfos";
import { formatDataListTree } from "@/commonUtils/CommonUtils";
import { ComponentNodeInfo, QueryInfo } from "@/Infos/CommonInfo";
import { ElForm, ElMessage, ElMessageBox } from "element-plus";
import { APP_ACTION_EVENT, APP_MUTATION_EVENT } from "@/store/modules/app";

type ModeState = "fatherAdd" | "fatherEdit"  |  "sonAdd"  | "sonEdit" | "";
interface ModeType 
{
    Id:number;
    Type:number;
    Md5:string;

    ParentId:number;
    Name:string;
    Key:string;
    Logs:number;
    Sort:number,
    Description:string;

    Func?:number
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
    private listQuery:QueryInfo = {KeyWord:"",Page:1,PageSize:20};
    private list:any[] = [];

    public rules:{[key:string]:any[]} | undefined = undefined;  
    private popupParam:ModeType = {
        Id:NaN,Type:0,Md5:"",ParentId:-1,Name:"",Key:"",Logs:0,Sort:100,Description:""
    };

    public created():void
    {
        if(!this.$gobalI18n.global.getLocaleMessage('zh')['mode'])
        {
            this.$gobalI18n.global.mergeLocaleMessage('zh',local.zh);
        }

        this.listQuery.PageSize = this.$store.state.app.pageSize;

        this.rules = {
            Name: [
            { required: true,message: this.$t("mode.plaseEnterModeName"),trigger: "change"}
            ],
            Key: [
            {required: true,message: this.$t("mode.plaseEnterModeAliasName"),trigger: "change"}
            ]
        };

        this.getNodeList();
        this.getListpublic();
    }

    public getListpublic():void
    {
        let self = this;
        self.searchBtnLoadingBol = true;
        reqGetList<ModeType[]>(self.listQuery).then( respose=>{
            self.list = respose.data.Data;
            self.loading = false;
            self.searchBtnLoadingBol = false;
        } );
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
            let eleform =  this.$refs["dataForm"];
            (eleform as InstanceType<typeof ElForm>).clearValidate();
        });

        let size:number = this.$store.state.app.pageSize;

        console.log("size:" + size);
    }

    public fnDeleteParent(item:ModeType):void
    {
        this.fnAlertDelete(item.Id);
    }

    public fnEditParent(id:number):void
    {
        this.state = "fatherEdit";
        this.Editfunc(id);
    }

     //子代新增
    public fnAddChildren(item:ModeType):void
    {
        this.state = "sonAdd";
        this.$nextTick(()=>{
            let eleform =  this.$refs["dataForm"];
            (eleform as InstanceType<typeof ElForm>).clearValidate();
        });
        this.fnResetParam(item.Id);
        this.dialogFormVisible = true;
    }

    //子代编辑
    public fnEditChildren(id:number):void
    {
        console.log("fnEditChildren id:" + id);
        this.state = "sonEdit";
        this.Editfunc(id);
    }

    //子代删除
    public fnDeleteChildren(item:ModeType):void
    {
        this.fnAlertDelete(item.Id);
    }

    public fnResetParam(ParentId:number):void 
    {
      this.popupParam.Id = 0;
      this.popupParam.ParentId = ParentId;
      this.popupParam.Func = 1;
      this.popupParam.Name = "";
      this.popupParam.Key = "";
      this.popupParam.Md5 = "";
      this.popupParam.Type = 1;
      this.popupParam.Logs = 1;
      this.popupParam.Sort = 100;
      this.popupParam.Description = "";
    }

    public Editfunc(id:number):void 
    {
      this.dialogLoading = true;
      this.dialogFormVisible = true;
      
      reqEditData<ModeType>(id).then(response => {
        this.dialogLoading = false;
        var res = response.data.Data;
        this.popupParam = res;
      });
    }

    public fnAlertDelete(id:number):void
    {
       ElMessageBox.confirm(this.$t('mode.deleteAffirm'),this.$t('mode.hint'),{
           confirmButtonText:this.$t('common.confirm'),
           cancelButtonText:this.$t('common.cancel'),
           type:'warning'
       })
       .then(value=>{

           console.log(value);

           this.loading = true;
           reqDeleteMode(id).then(response=>{
               this.getListpublic();
               ElMessage.success(this.$t('mode.deleteSucceed'));
           }).catch(err=>{
               this.getListpublic();
           });
       })
       .catch(err=>{

       });
    }

    //模态框保存按钮
    public fnAffirm():void
    {
         let eleform =  this.$refs["dataForm"];
        (eleform as InstanceType<typeof ElForm>).validate(valid=>{
            if(!valid)
            {
                return;
            }
            this.dialogFormVisible = false;
            this.loading = true;
            if( this.state == 'fatherAdd' || this.state == 'sonAdd' )
            {
                console.log("go this...");
                console.log( this.popupParam );
                reqModeAdd(this.popupParam).then(response=>{
                    ElMessage.success(this.$t('mode.addSuccess'));
                    this.loading = false;
                    this.getListpublic();
                });
            }
            else
            {
                reqEditMode(this.popupParam).then(response=>{
                    ElMessage.success('修改成功');
                });
                this.loading = false;
                this.getListpublic();
            }
        });

    }

}
</script>

<style lang="scss" scoped>
.cursor
{
    cursor: pointer
}
</style>