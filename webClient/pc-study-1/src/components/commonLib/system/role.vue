<template>
    <div class="app-container"  >
        <search-type-two :showAddBtn="true" :showDateTime="false" :options="selectInputOption"
                @getParams="getQueryParams" @resetParams="resetQyeryParams" @addElement="handleCreate">
        </search-type-two>

        <el-table :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" class="mgt-10">
            <el-table-column label="ID" align="center" width="100">
                <template #default="scope">
                <span>{{ scope.row.Id }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('role.name')" width="260" align="center">
                <template #default="scope">
                <span>{{ scope.row.Name }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('role.description')" min-width="150" align="center">
                <template #default="scope">
                <span>{{ scope.row.Description }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.actions')" align="center" width="300">
                <template #default="scope">
                <el-button
                    :disabled="scope.row.Type == 1&&AdminId!=-1?true:false"
                    type="primary"
                    size="mini"
                    @click="handleUpdate(scope.row.Id)"
                >{{ $t('common.edit') }}</el-button>
                <el-button
                    :disabled="scope.row.Type == 1&&AdminId!=-1?true:false"
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row,'deleted')"
                >{{ $t('common.del') }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <pagination
            v-show="total>0"
            :total="total"
            :page="listQuery.Page"
            :limit="listQuery.PageSize"
            @pagination="getList"
        />

        <!--新增角色-->
        <el-dialog
        :title="dialogStatus=='create'?$t('role.add'):$t('role.edit')"
        :close-on-click-modal="false"
        :visible="dialogFormVisible"
        height="900"
        v-el-drag-dialog
        @close="loadingSaveBtn = false"
        >
        <el-form
            ref="dataForm"
            :rules="rules"
            :model="temp"
            label-position="right"
            label-width="100px"
            v-loading="dialogLoad"
        >
            <el-form-item :label="$t('role.name')" prop="Name">
            <el-input
                v-model="temp.Name"
                :placeholder="$t('role.name')"
                :maxlength="GLOBAL.inputMaxLenght"
            />
            </el-form-item>
            <el-form-item :label="$t('role.description')" prop="Description">
            <el-input
                v-model="temp.Description"
                :placeholder="$t('role.description')"
                :maxlength="GLOBAL.inputMaxLenght"
            />
            </el-form-item>
            <el-row :gutter="20">
            <el-col :span="24" style="height:400px;overflow-y:scroll">
                <el-form-item :label="$t('role.node')">
                <el-tree
                    ref="nodeTree"
                    :data="nodeList"
                    show-checkbox
                    node-key="PubliceId"
                    :default-expand-all="false"
                    class="permission-tree"
                    :check-strictly="checkType"
                />
                </el-form-item>
            </el-col>
            </el-row>
        </el-form>
        <template #footer class="dialog-footer">
             <el-button @click="dialogFormVisible = false">{{ $t('common.cancel') }}</el-button>
             <el-button
            type="primary"
            @click="dialogStatus==='create'?createData():updateData()"
            :loading="loadingSaveBtn"
            >{{ $t('common.confirm') }}</el-button>
        </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SearchTypeTwo from '@/components/ListSearch/SearchTypeTwo.vue'
import Pagination from '@/components/Pagination.vue'
import {} from '@/api/system/role'
import { QueryInfo } from "@/Infos/CommonInfo";

@Options({
    name:"Role",
    components:
    {
        SearchTypeTwo:SearchTypeTwo,
        Pagination:Pagination
    }
})
export default class Role extends Vue{
    private checkType:boolean =  false;
      // AdminId: this.$store.getters.accountInfo.AdminId,
    private AdminId:number =  -1;
    private MyRoles:any[] = [];
    private MyNodes:any[] =  [];
    private tableKey:number =  0;
    private list:any =  null; //角色列表
    private nodeList:any =  null; //节点列表
    private permissionList:any =  null; //权限列表
    private  total:number =  0;
    private checkStrictlyMode:boolean =  false;
    private checkStrictlyNode:boolean =  false;
    private listLoading:boolean =  true;
    private loadingSaveBtn:boolean =  false;
    private dialogLoad:boolean =  true;
    private selectInputOption:any= [
        {
            label: "全部",
            value: "All"
        },
        {
            label: "角色名称",
            value: "Name"
        }
    ];
    // 查询条件
    private listQuery:QueryInfo =  {
        Page: 1,
        PageSize: this.$store.getters.pageSize,
        KeyWord: ""
    };
    // 新增/编辑数据字段
    private temp:any =  {
        Id: undefined,
        Name: "", // 角色名称
        Description: "" // 备注
    };
    private dialogFormVisible:boolean =  false;
    private nodeFormVisible:boolean =  false;
    private perFormVisible:boolean =  false;
    private dialogStatus:string =  "";
    // 弹出框标题
    private textMap:any =  {
        update: "edit",
        create: "add"
    };
    private rules:any = {
        Name: [
            {
            required: true,
            message: this.$t("rules.required"),
            trigger: "blur"
            }
        ]
    }


    public created():void
    {
        console.log("go this..");
    }
}
</script>

<style lang="scss" scoped>
.scrollNo::-webkit-scrollbar,
.box-card::-webkit-scrollbar {
  display: none;
}

.el-card__body {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>