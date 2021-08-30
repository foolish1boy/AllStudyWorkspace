<template>
    <div class="app-container" >
        <div class="title_h4">
            <search-type-two :showAddBtn="true" :showDateTime="false" :options="selectInputOption" 
                    @getParams="getQueryParams" @resetParams="resetQyeryParams" @addElement="handleCreate" > </search-type-two>
        </div>
        <el-table :data="list" :key="tableKey" border fit highlight-current-row style="width:100%" class="mgt-10">
          <el-table-column :label="$t('admin.id')" align="center">
              <template #default="scope">
                  <span>{{scope.row.Id}}</span>
              </template>
          </el-table-column>
          <el-table-column :label="$t('admin.username')" align="center">
              <template #default="scope">
                  <span>{{scope.row.Username}}</span>
              </template>
          </el-table-column>
          <el-table-column :label="$t('admin.name')" align="center">
              <template #default="scope">
                  <span>{{scope.row.Name}}</span>
              </template>
          </el-table-column>
          <el-table-column :label="$t('admin.status')" width="80" align="center">
              <template #default="scope">
                  <el-tag :type="scope.row.Status == 1?'sucess':'info'">{{scope.row.Status}}</el-tag>
              </template>
          </el-table-column>
          <el-table-column :label="$t('admin.mobile')" align="center">
              <template #defalut="scope">
                  <span>{{ scope.row.Mobile }}</span>
              </template>
          </el-table-column>
          <el-table-column :label="$t('admin.loginTime')" class-name="status-col" >
              <template #defalut="scope">
                  <span>{{ scope.row.LoginTime }}</span>
              </template>
          </el-table-column>
           <el-table-column :label="$t('admin.loginIp')" class-name="status-col" >
              <template #defalut="scope">
                  <span>{{ scope.row.loginIp }}</span>
              </template>
          </el-table-column>
          <el-table-column :label="$t('admin.createTime')" class-name="status-col" width="200" >
              <template #defalut="scope">
                  <span>{{ scope.row.createTime }}</span>
              </template>
          </el-table-column>
          <el-table-column :label="$t('admin.actions')" align="center" width="180" fixed="right" class-name="small-padding fixed-width">
              <template #default="scope">
                  <el-button type="primary" size="mini" @click="handleUpdate(scope.row.Id)" > {{$t('common.edit')}} </el-button>
                  <el-button type="primary" size="mini" @click="handleDelete(scope.row.Id)" > {{$t('common.del')}} </el-button>
              </template>
          </el-table-column>
        </el-table>

        <el-dialog :title="dialogStatus == 'create' ? $t('admin.add') : $t('admin.edit')" v-model="dialogFormVisible" @close="loadingSaveBtn = false">
            <el-form ref="dataForm"  :model="temp" label-position="right" label-width="100px">
              <el-form-item :label="$t('admin.username')" prop="Username">
                  <el-input v-model="temp.Username" :placeholder="$t('admin.username')" :maxlength="GLOBAL.inputMaxLenght" :disabled="dialogStatus==='update'"></el-input>
              </el-form-item>
              <el-form-item :label="$t('admin.password')"  prop="Password" v-if="dialogStatus==='create'">
                  <el-input v-model="temp.Password" auto-complete="new-password" type="password" :placeholder="$t('admin.password')" :maxlength="GLOBAL.inputMaxLenght" ></el-input>
              </el-form-item>
              <el-form-item :label="$t('admin.confimPass')" prop="ConfirmPassword" v-if="dialogStatus==='create'">
                  <el-input v-model="temp.ConfirmPassword" auto-complete="new-password" type="password" :placeholder="$t('admin.confimPass')" :maxlength="GLOBAL.inputMaxLenght" />
              </el-form-item>
              <el-form-item :label="$t('admin.name')">
                <el-input v-model="temp.Name" :placeholder="$t('admin.name')" :maxlength="GLOBAL.inputMaxLenght" />
              </el-form-item>
              <el-form-item :label="$t('admin.mobile')">
                <el-input v-model="temp.Mobile" :placeholder="$t('admin.mobile')" :maxlength="GLOBAL.inputMaxLenght" />
              </el-form-item>
              <el-form-item :label="$t('admin.role')">
                <el-select v-model="temp.Role" multiple placeholder="请选择" style="width:100%">
                    <!--
                    <el-option
                    v-for="item in systemConfig.Role"
                    :key="item.Id"
                    :label="item.Name"
                    :value="item.Id">
                    </el-option>
                    -->
                </el-select>
              </el-form-item>
            </el-form>
            
            <template #footer class="dialog-footer">
                <el-button @click="dialogFormVisible = false">{{ $t('common.cancel') }}</el-button>
                <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()" :loading="loadingSaveBtn">{{ $t('common.confirm') }}</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import SearchTypeTwo, { SearchTypeTwoParam } from "@/components/ListSearch/SearchTypeTwo.vue";
import { DialogStatus, Pagination, QueryInfo } from "@/Infos/CommonInfo";
import { Options, Vue } from "vue-class-component";
import { reqFetchList,reqFetchDetail, reqDeleteUser, reqUpdateUser, reqCreateUser} from '@/api/system/admin'
import local from './local';
import { ElForm, ElMessage, ElMessageBox } from "element-plus";
import { clearNullOfArray, stringTranslateNumber } from "@/commonUtils/CommonUtils";
import {ServiceResponse} from '@/Infos/CommonDefine'
import { AxiosResponse } from "axios";
import { ResponseInfo } from "@/Infos/ServerInfos";

interface InputInterface
{
    label:string;
    value:string;
}

interface AdminType<T>
{
    Id:number|undefined,
    Username:string;    // 登录账号
    Password:string;    // 密码
    ConfirmPassword:string; // 确认密码
    Name:string;    // 姓名
    Role:T;     // 角色
    Mobile:string;  // 手机号
}

@Options<Admin>({
    name:"Admin",
    components:{
        SearchTypeTwo:SearchTypeTwo
    }
})
export default class Admin extends Vue
{
    private listLoading:boolean = true;
    private loadingSaveBtn:boolean = false;
    public selectInputOption:InputInterface[] = [];
    //public listQuery:QueryInfo = {Page:1,KeyWord:"",PageSize:this.$store.getters.pageSize};
    public listQuery:QueryInfo = {Page:1,KeyWord:"",PageSize:15};
    public list:AdminType<any>[] = [];
    public total:number = 0;
    private tableKey:number = 0;
    private temp:AdminType<any> = {Id:undefined,Username:"",Password:"",ConfirmPassword:"",Name:"",Role:[],Mobile:''};
    private dialogStatus:DialogStatus = DialogStatus.NONE;
    private dialogFormVisible:boolean = false;
    private downloadLoading:boolean = false;

    public created():void
    {
        let self = this;
        
        self.selectInputOption.push({label:"全部",value:"All"});
        self.selectInputOption.push({label:"账户账号",value:"Username"});
        
        if(!this.$gobalI18n.global.getLocaleMessage('zh')['admin'])
        {
            this.$gobalI18n.global.mergeLocaleMessage('zh',local.zh)
        }

        self.getList();
    }

    public getList():void
    {
        let self = this;
        self.listLoading = true;
        console.log(self.listQuery);
        reqFetchList<{Items:AdminType<any>[],Pagination:Pagination}>(self.listQuery).then(respose=>{
           self.list = respose.data.Data.Items;
           self.total = respose.data.Data.Pagination.MaxCount;
           self.listLoading = false
        }).catch(err=>{
            self.listLoading = false;
        });
    }

    private handleFilter():void
    {
        this.listQuery.Page = 1;
        this.getList();
    }

    private resetTemp():void
    {
        this.temp = {Id:undefined,Username:'',Password:'',ConfirmPassword:'',Name:'',Role:[],Mobile:''};
    } 

    private async createData()
    {
        let form:InstanceType<typeof ElForm> =  this.$refs.dataForm as InstanceType<typeof ElForm>;
        let validateFlag:boolean = await form.validate();
        if( !validateFlag )
        {
            return;
        }

        this.loadingSaveBtn = true;
        this.temp.Role = '';
        // let responseData: AxiosResponse<ResponseInfo<AdminType<string>>> = await reqCreateUser(this.temp);
        // if( responseData.data.Data == undefined )
        // {
        //     this.loadingSaveBtn = false;
        //     return;
        // }
        // this.dialogFormVisible = false;
        // ElMessage.success(this.$t('common.addSuccess'));
        // this.loadingSaveBtn = false;
        // this.getList();

        reqCreateUser(this.temp).then(response=>{
            console.log("createSucess")
            this.dialogFormVisible = false;
            ElMessage.success(this.$t('common.addSuccess'));
            this.loadingSaveBtn = false;
            this.getList();
        }).catch(err=>{
            console.log("createError")
            this.loadingSaveBtn = false;
        })
    }   


    // 点击编辑   
    private handleUpdate(id:number):void
    {
        reqFetchDetail<any>(id).then(response=>{
             this.temp = Object.assign({},response.data.Data);
             this.temp.Role = response.data.Data.Role.split(",");
             this.temp.Role = clearNullOfArray(this.temp.Role);
             this.temp.Role = stringTranslateNumber(this.temp.Role);
             this.temp.Role = '';
        })
        .catch(err=>{
             console.log("go this..");
         });

        this.dialogStatus = DialogStatus.UPDATE;
        this.dialogFormVisible = true;
        this.$nextTick(()=>{
            let form:InstanceType<typeof ElForm> =  this.$refs.dataForm as InstanceType<typeof ElForm>;
            form.clearValidate();
        })
    }

    private  async updateData()
    {
        let form:InstanceType<typeof ElForm> =  this.$refs.dataForm as InstanceType<typeof ElForm>;
        debugger
        let validateFlag = await form.validate();
        if(!validateFlag)
        {
            return;
        }

        this.loadingSaveBtn = true;
        const tempData = Object.assign({},this.temp);
        // reqUpdateUser<AdminType<string>>(tempData).then(response=>{
        //     let data:AdminType<string> = response.data.Data;
        //     console.log(response.data.Data);
            
        //     this.dialogFormVisible = false;
        //     ElMessage.success(this.$t('common.editSucess'));
        //     this.loadingSaveBtn = false;
        //     this.getList();
        // })
        // .catch(err=>{
        //     this.loadingSaveBtn = false;
        // });  

        let responseData: AxiosResponse<ResponseInfo<AdminType<string>>> = await reqUpdateUser<AdminType<string>>(tempData);
        console.log(responseData.data.Data);
       if( responseData.data.Data == undefined )
       {
           this.loadingSaveBtn = false;
           return;
       }

        this.dialogFormVisible = false;
        ElMessage.success(this.$t('common.editSucess'));
        this.loadingSaveBtn = false;
        this.getList();
    }


    private async handleDelete(row:any)
    {
        let confirmResp =  await ElMessageBox.confirm(this.$t('common.confirmDelete'),this.$t('common.hint'),{
            confirmButtonText:this.$t('common.confirm'),
            cancelButtonText:this.$t('common.cancel'),
            type:'warning'
            });

        if( confirmResp.action != 'confirm' )
        {
            return;
        }

        let deleteResp =  await reqDeleteUser(row.Id);

        if( deleteResp )
        {
             ElMessage.success(this.$t('common.deleteSuccess'));
             this.getList();
        }
            
    }

    private getQueryParams(value:SearchTypeTwoParam):void
    {
        let self = this;
        self.listQuery.Page = 1;
        self.listQuery.BeginTime = value.BeginTime;
        self.listQuery.KeyWord = '';
        if( value.filterKey == "All" ||  value.filterKey == "Username")
        {
            self.listQuery.KeyWord = value.filterValue;
        } 

        self.getList();
    }

    private resetQyeryParams():void
    {
        let self = this;
        self.listQuery.Page = 1;
        self.listQuery.KeyWord = '';
        self.listQuery.Sort = '';
        self.listQuery.BeginTime = '';
        self.listQuery.EndTime = '';

        self.getList();
    }

    //点击新增
    private handleCreate():void
    {
        let self = this;
        self.dialogStatus = DialogStatus.CREATE;
        self.dialogFormVisible = true;
        self.$nextTick(()=>{
           let form:InstanceType<typeof ElForm> =  this.$refs.dataForm as InstanceType<typeof ElForm>;
           form.clearValidate();
        });
    }
}
</script>

<style lang="scss" scoped>

</style>