<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page="currentPage"
      :page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      :pager-count="pagerCount"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  name:"Pagination",
  props:
  {
    total:{type:Number,require:true},
    page:{type:Number,default:1},
    limit:{type:Number,default:20},
    pageSizes:{type:Array,default:[10, 20, 30, 50, 100]},
    layout:{type:String,default:'total, sizes, prev, pager, next, jumper'},
    background:{type:Boolean,default:true},
    autoScroll:{type:Boolean,default:true},
    hidden:{type:Boolean,default:false},
    pagerCount:{type:Number,default:7}
  }
})
export default class Pagination extends Vue 
{
  private total:number =1;
  private page:number = 1;
  private limit:number = 20;
  private pageSizes:number[] = [10, 20, 30, 50, 100];
  private layout:string='total, sizes, prev, pager, next, jumper';
  private background:boolean = true;
  private hidden:boolean = false;
  private pagerCount:number = 7;


  public get currentPage():number
  {
    return this.page;
  }

  public set currentPage(val:number)
  {
    this.$emit('update:page', val)
  }

  public get pageSize():number
  {
    return this.limit;
  }

  public set pageSize(val:number)
  {
    this.$emit('update:limit', val)
  }


  public handleSizeChange(val:number):void
  {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      this.$store.dispatch('setPageSize', val)

  }
  public handleCurrentChange(val:number):void
  {
      this.$emit('pagination', { page: val, limit: this.pageSize })

    }
}
</script>

<style scoped>

</style>
