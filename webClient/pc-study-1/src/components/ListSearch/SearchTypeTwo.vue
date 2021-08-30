<template>
    <div class="filter-container w_auto">
    <el-input
      :placeholder="$t('common.plaseInput')"
      clearable
      v-model="param.filterValue"
      :maxlength="GLOBAL.inputMaxLenght"
      class="input-with-select"
      v-if="showInput"
      size="small"
    >
     <template #prepend>
         <el-select v-model="param.filterKey" :placeholder="$t('common.placeholder')" style="width:130px" size="small">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            ></el-option>
        </el-select>
     </template>
      
    </el-input>
    <!--
    <el-select
      v-model="param.GameId"
      filterable
      placeholder="子游戏选择"
      v-if="showGame"
      size="small"
    >
      <el-option label="全部子游戏" value></el-option>
      <el-option v-for="(val,key) in gameList" :key="key" :label="val.gameName" :value="key"></el-option>
    </el-select>
    -->
    
    <range-date
      @chooseDateTime="chooseTime"
      :inputType="dateTimeType"
      :valueFormat="valueFormat"
      :defaultDateTime="dataTime"
      :limitNumber="limitNumber"
      :showOptions="showOptions"
      v-if="showDateTime"
    />

    <el-button type="primary" icon="el-icon-search" @click="handleFilter" size="small">{{ $t('common.seach') }}</el-button>
    <el-button type="warning" icon="el-icon-refresh" @click="handleReset" size="small">{{ $t('common.reset') }}</el-button>
    <el-button
      type="success"
      icon="el-icon-edit"
      @click="handleCreate"
      v-if="showAddBtn"
      class="btn_add"
      size="small"
    >{{ addTitle }}</el-button>
    <el-button
      type="success"
      icon="el-icon-check"
      @click="handleMoreManual"
      v-if="showBatchManualABtn"
      size="small"
    >{{ $t('common.batchManual') }}</el-button>
    <el-button
      type="warning"
      icon="el-icon-close"
      @click="handleMoreReject"
      v-if="showBatchRejectABtn"
      size="small"
    >{{ $t('common.batchReject') }}</el-button>
  </div>
</template>

<script lang='ts' >

export interface SearchTypeTwoParam
{
  filterKey:string;
  filterValue:string;
  BeginTime:string|number;
  EndTime:string|number;
}

import { Options, prop, Vue } from 'vue-class-component';

@Options<SearchTypeTwo>({
    name:"SearchTypeTwo",
    props:
    {
        options:{type:Array},
        showAddBtn:{type:Boolean,default:false},
        showInput:{type:Boolean,default:true},
        defaultDateTime:{type:Array,default:()=>[]},
        showBatchManualABtn:{type:Boolean,default:false},
        showBatchRejectABtn:{type:Boolean,default:false},
        showDateTime:{type:Boolean,default:true},
        dateTimeType:{type:String,default:'datetimerange'},
        valueFormat:{type:String,default:'timestamp'},
        limitNumber:{type:Number,default:0},
        addTitle:{type:String,default:"新增"},
        defaultValue:{type:String,default:''},
        defaultKey:{type:String,default:'All'},
        showOptions:{type:Boolean,default:true}
    },
    emits:{
      getParams():boolean
      {
        return true;
      },
      resetParams():boolean
      {
        return true;
      },
      addElement():boolean
      {
        return true;
      },
      manualElement():boolean
      {
        return true;
      },
      rejectElement():boolean
      {
        return true;
      }
    },
})
export default class SearchTypeTwo extends Vue
{
    
    private options:any[] = [];
    private showAddBtn:boolean = false;
    private showInput:boolean=true;
    private defaultDateTime:any[] = [];
    private showBatchManualABtn:boolean = false;
    private showBatchRejectABtn:boolean = false;
    private showDateTime:boolean = true;
    private dateTimeType:String = "datetimerange";
    private valueFormat:string = "timestamp";
    private limitNumber:number = 0;
    private addTitle:string = "新增";
    private defaultValue:string = '';    
    private defaultKey:string = 'All';
    private showOptions:boolean = true;

    public dataTime:any[] = [];
    public param:SearchTypeTwoParam = {
        filterKey:this.defaultKey,
        filterValue:this.defaultValue,
        BeginTime: this.defaultDateTime[0] ? Math.floor(this.defaultDateTime[0] / 1000) : "",
        EndTime: this.defaultDateTime[1] ? Math.floor(this.defaultDateTime[1] / 1000) : ""
    } 

    //获取选择的时间
    public chooseTime(val:any[]):void
    {
      this.param.BeginTime = val[0];
      this.param.EndTime = val[1];
    }

    //点击查询
    public handleFilter():void 
    {
      this.$emit("getParams", this.param);
    }

    //点击重置
    public handleReset():void
    {
        this.param = {
            filterKey:'All',
            filterValue:'',
            BeginTime: this.defaultDateTime[0] ? Math.floor(this.defaultDateTime[0] / 1000) : "",
            EndTime: this.defaultDateTime[1] ? Math.floor(this.defaultDateTime[1] / 1000) : ""
        }

      this.dataTime = this.defaultDateTime.length ? this.defaultDateTime : [];
      this.$emit("resetParams", this.param);
    }

    //点击新增
    public handleCreate():void
    {
        this.$emit("addElement");
    }

    //点击批量人工
    public handleMoreManual():void
    {
        this.$emit("manualElement");
    }

        //点击批量拒绝
    public handleMoreReject():void
    {
        this.$emit("rejectElement");
    }

}
</script>

<style scoped>

</style>
