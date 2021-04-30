<template>
    <div style="width:100% height:100%" >
        <van-tabs>
            <van-tab title="我的账号" >
                <p class="test-btn" >您的账号信息</p>
                 <svg-icon icon-class="eye1" iconClass="eye" ></svg-icon>
                <van-form class="gap-10">
                    <van-field label="姓名" placeholder="请输入用户名" v-model="home" ></van-field>
                    <van-field label="手机号码" placeholder="请输入手机号码" ></van-field>
                    <van-field label="级别" placeholder="请输入手机号码" >
                    </van-field>
                    <slot-test >
                        <template #default>
                             <van-button title="我来了2" type="primary" class="widht-100"   >我是按钮2</van-button>
                        </template>
                     
                    </slot-test>
                </van-form>
                <van-button type="primary" size="large" class="gap-10" @click="checkRoomClick()" >查看场所列表</van-button><br>
                <van-button type="primary" size="large" @click="addNewRoomClick()" >添加新的场所</van-button>
            </van-tab>

            <van-tab title="堂主管理" >
                <div>
                    <van-cell title="选择堂主"  is-link :value="selectedAgentData.name" @click="agentShowFlag=true" ></van-cell>
                    <van-cell title="起始日期" is-link  :value="calcTime(agentManagerData.startTime)" @click="showPickTimeHandler(0)" ></van-cell>
                    <van-cell title="结束日期" is-link  :value="calcTime(agentManagerData.endTime)" @click="showPickTimeHandler(1)" ></van-cell>

                    <van-action-sheet v-model:show="agentShowFlag" :actions="agentList" @select="onSelect" />

                    <van-popup  v-model:show="agentTimeFlag" style="width:100%" position="bottom" :round="true"  >
                        <van-datetime-picker :round="true" v-model="timeNum" type="date" :show-toolbar="true"  @confirm="onConfirm" @cancel="onCancel()" ></van-datetime-picker>
                    </van-popup >
                </div>

    
                <van-button type="primary" size="large" class="gap-10" >查看业绩</van-button><br>
                <van-button type="primary" size="large">导出业绩到邮箱</van-button>
            </van-tab>
            
            <van-tab title="完善资料">
                <van-form v-model="agentInfo" style="margin-bottom:20px;margin-left:20px" >
                    <van-field label="姓名" placeholder="请输入姓名" v-model="agentInfo.name"></van-field>
                    <van-cell title="性别"  title-style="text-align:left" required>
                        <template #default>
                            <van-dropdown-menu>
                                <van-dropdown-item v-model="agentInfo.sex" :options="sexList" />   
                            </van-dropdown-menu>
                        </template>
                    </van-cell>

                    <van-field label="手机号码" label-align="left" placeholder="请输入手机号"  required v-model="agentInfo.phone" ></van-field>
                    <van-field label="身份证" placeholder="请输入身份证号" required v-model="agentInfo.id" ></van-field>
                    <p class="text-align-left" style="text-align:left">选择你的开户银行</p>
                    <van-field label="开户人姓名" placeholder="输入您的开户人姓名" v-model="agentInfo.userName" ></van-field>
                    <van-field label="银行卡号" placeholder="输入您的银行卡号" v-model="agentInfo.bankNo" ></van-field>
                    <p  class="txt-align-left" >选择你开户行所属区域</p>
                    <van-cell title="银行所属" is-link :value="agentInfo.bank" title-style="text-align:left" @click="showBankListFlag=true" >
                        
                    </van-cell>
                    <van-field label="开户支行信息" placeholder="输入你的开户支行信息" v-model="agentInfo.subBank"></van-field>
                    <van-field label="电子邮箱" placeholder="输入你的电了邮箱" v-model="agentInfo.email"></van-field>
                    <van-field label="推荐人" placeholder="输入你的推荐人手机号(可不填)" ></van-field>
                    <p class="txt-align-left" >上传照片(手持身份证以及营业执照复印件的露头照)</p>
                    <div style="width:80px;margin-left:20px">
                        <van-uploader accept="image/png,image/jpeg"  ></van-uploader>
                    </div>
                    <van-checkbox shape="square" style="font-size:12px;margin-left:20px" v-model="selectedReadFlag" >已阅读并接爱会员规定《相关条款》</van-checkbox>
                </van-form>

                <van-button  style="margin-bottom:20px" type="primary" size="large" >提交</van-button>

                <van-action-sheet v-model:show="showBankListFlag"  title="请选择银行"  :actions="bankList" @select="selectBankHandler" ></van-action-sheet>
            </van-tab>
        </van-tabs>

    </div>
</template>

<script lang="ts" >
import { Calendar } from "vant";
import { Options, Vue } from "vue-class-component";
import {BankData} from '@/data/commonData'
import { reqFetchList } from '@/api/agent/agent'
import { PERMISSION_ACTION_EVENT, PERMISSION_EVENT } from "@/store/modules/permission";
import { mapGetters, mapMutations } from "vuex";
import TestSlot from "@/components/SlotTest.vue";


@Options({
    name:"Agent",
    components:{
        [Calendar.name]:Calendar,
        [TestSlot.name]:TestSlot
    },
    computed:
    {
        ...mapGetters(['home'])
    },
    methods:
    {
        ...mapMutations({
            changeHome:'home'
        })
    }
})
export default class Agent extends Vue{

    //堂主管理
    public agentShowFlag:boolean = false;
    public selectedAgent:string = "aefe";
    public agentManagerData:{startTime:number,endTime:number} = {startTime:0,endTime:0};
    private agentTimeFlag:boolean = false;
    private timeNum:Date = new Date();
    private agentTimeType:number = 0;   //0:开始时间 1:结束时间
    
    private selectedAgentData:any = {name:""};
    private agentList:{name:string}[] = [];
    private sexList:{text:string,value:number}[] = [];

    private sex:number = 0;
    private agentInfo:{[key:string]:any} = {};

    private showBankListFlag:boolean = false;
    private bankList:{name:string}[] = [];

    private selectedReadFlag:boolean = true;
    private home1:string = "home1";

    public created():void
    {
      let cur_tm_s = new Date().getTime();
      this.agentManagerData.startTime = cur_tm_s;
      this.agentManagerData.endTime = cur_tm_s;

      for(let i = 0; i < 10; i ++)
      {
          this.agentList.push({name:"10"+i});
      }

      this.sexList.push({text:"男",value:0});
      this.sexList.push({text:"女",value:1});

        this.agentInfo.name = "我的名字";
        this.agentInfo.sex = 1;
        this.agentInfo.bankNo = 123141241;
        this.agentInfo.bank="";

        this.bankList = BankData;
    }

    private selectAgentHandler():void
    {
        this.agentShowFlag = true;
        console.log("go this...");
    }

    private onSelect():void
    {

    }

    private checkRoomClick():void
    {
        let self = this;
        reqFetchList().then(response=>{
            console.log("go this..." + JSON.stringify(response.data));
        }).catch(err=>{
            console.log("error");
        })
    }

    private addNewRoomClick():void
    {

        //let home = this.$store.state.permission.getters;
        //console.log("go this...." + home);

        let abc1 = this.$store.state.permission ;

        console.log(abc1.home);

        this.$store.commit(PERMISSION_EVENT.SET_HOME,"bcd");

        /** 
        let abc = this.$store.state.permission as Permission;

        console.log(abc);

        this.$store.dispatch(PERMISSION_ACTION_EVENT.INCREMENT,"abc2");

        let abc2 = this.$store.state.permission as Permission;

        console.log("abc2:" + abc2.home);

        let abc3 =  this.$store.state.permission.getters;

        console.log("abc3:" + abc3);

        let abc4 =  this.$store.getters.home;
        
        debugger
        **/

       this.$store.dispatch(PERMISSION_ACTION_EVENT.INCREMENT,"czh").then(response=>{
           console.log("go this...");
       }).catch(error=>{

       });
    }

    private showPickTimeHandler(type:number):void
    {
        let self = this;
        self.agentTimeType = type;
        self.agentTimeFlag = true;
        console.log("showPickTimeHandler....");
        if( self.agentTimeType == 0 )
        {
            self.timeNum.setTime(self.agentManagerData.startTime);
        }
        else
        {
            self.timeNum.setTime(self.agentManagerData.endTime);
        }
    }

    private onConfirm(date:any):void
    {
        let self = this;
        self.agentTimeFlag = false;
        let selectDate = new Date(date);
        console.log(selectDate.getTime());

        if(self.agentTimeType == 0)
        {
            self.agentManagerData.startTime = selectDate.getTime();
        }
        else
        {
            self.agentManagerData.endTime = selectDate.getTime();
        }
    }

    private onCancel():void
    {
        let self = this;
        self.agentTimeFlag = false;
    }

    private calcTime(time:number):string
    {
        if( time == 0  )
        {
            return "";
        }
        let date = new Date(time);
        return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    }


    private selectBankHandler(action:any, index: number):void
    {
        let self = this;
        self.agentInfo.bank = self.bankList[ index ].name;
        self.showBankListFlag = false;
    }
}
</script>

<style lang="less" >
.test-btn 
{
    float: left;
    margin-left: 20px;
}
.gap-10
{
    margin-bottom: 10px;
}
.txt-align-left
{
    text-align: left;
}
.border
{
    border:2px solid;
    border-radius:25px;
}
.rcorners6 
{
    border-radius: 15px 50px;
    background: #8AC007;
    padding: 20px;
    width: 200px;
    height: 150px;
}
.btn1
{
    margin-right:20px;
    float:"right";
}
.widht-100
{
    width: 80%;
    border-radius: 15px 50px;
    background: #8AC007;
}
.action-sheet-max-height
{
    height: 40;
}
</style>