<template>
    <div class="login-container">
        <div class="login-main shadow">
            <el-form ref="loginForm" :model="loginFormData" class="login-form" aria-autocomplete="on" label-position="left" >
                <div class="title-container">
                    <h3 class="title">
                    自己玩的测试
                    </h3>
                </div>
              <el-form-item prop="username">
                  <span class="svg-container">
                      
                  </span>
                 
                  <el-input v-model="loginFormData.username" placeholder="用户名" name="username" type="text" auto-complete="off" ></el-input>
              </el-form-item>

              <el-form-item prop="password">
                  <el-input v-model="loginFormData.password" placeholder="密码" name="password" auto-complete="off" :type="passwordType" @keyup.enter="handleLogin"></el-input>
              </el-form-item>

              <el-button type="primary" :loading="loading" style="width:100%;margin-bottom:30px;" @click="handleLogin" >登陆</el-button>

            </el-form>
        </div>
    </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import {ElForm} from 'element-plus';
import { USER_ACTION_EVENT } from '@/store/modules/user';
import {reqLoginTokenByUsername} from '@/api/login/login'
import { awaitWrap } from '@/Infos/CommonDefine';
import { PERMISSION_ACTION_EVENT } from '@/store/modules/permission';
import { ComponentNodeInfo } from '@/Infos/CommonInfo';

interface LoginFormInterface
{
    username:string;
    password:string;
}

@Options<Login>({
    name:"Login",
    watch:
    {
        $route:{
            handler(newvalue:any,oldValue:any):void
            {
                this.redirect = newvalue.query && newvalue.query.redirect
            },immediate:true
        }
    }
})
export default class Login extends Vue{
   
   private loginFormData:LoginFormInterface = {username:"test1",password:"test1"};
   private passwordType:string = 'password';
   private loading:boolean = false;
   private showDialog:boolean = false;
   private redirect: any = undefined;


   public created():void
   {
     console.log("login index");

     if(__DEV__)
     {
       console.log("...........................................___DEV__true");
     }
     else
     {
        console.log("...........................................___DEV__false");
     }
   }

   private async handleLogin()
   {
      let form:InstanceType<typeof ElForm> =  this.$refs.loginForm as InstanceType<typeof ElForm>;
      let validteFlag:boolean = await form.validate();
      if( validteFlag == false )
      {
        return;
      }

      this.loading = true;

      let [err,response] = await awaitWrap( reqLoginTokenByUsername<string>(this.loginFormData.username,this.loginFormData.password) );

      if( err != null || response == null )
      {
        console.log("handleLogin 1  error")
        this.loading = false;
        return;
      }

      console.log("response.data.Data");
      console.log(response.data.Data);

      let token = response.data.Data; 
      let [err1,res] =  await awaitWrap(this.$store.dispatch(USER_ACTION_EVENT.LOGIN_BY_TOKEN,{token:token}));
      if(err1 != null || res == null)
      {
        this.loading = false;
        return;
      }

      this.loading = false;
      let menu = res.data.Data.Nav;

     console.log('menu:');
      console.log( res.data.Data );

     let [err2,accessRoutes] = await awaitWrap<ComponentNodeInfo[],any>(this.$store.dispatch(PERMISSION_ACTION_EVENT.GENERATE_ROUTES,{menu:menu}));
     if(err2 != null || accessRoutes == null)
     {
       console.log("login accessRoutes");
        return;
     }

      console.log(accessRoutes)

     if( accessRoutes.length == 0 || accessRoutes[0].children == undefined || accessRoutes[0].children.length == 0 )
      {
        this.$router.push({path:"node"});
      }
      else
      {
        let pathStr:string = accessRoutes[0].children[0].path as string;
        this.$router.push({path:pathStr});
      }

   }

   private showPwd():void
   {
       let self = this;
       if( self.passwordType == 'password' )
       {
           self.passwordType = ''
       }
       else
       {
           self.passwordType = 'password';
       }
   }

}
</script>


<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#eee;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.shadow {-webkit-box-shadow:0 0 20px #57b4bc; -moz-box-shadow:0 0 20px #57b4bc; box-shadow:0 0 20px #57b4bc; }
.login-main {
  background-color: $bg;
  margin: 0 auto;
  width: 400px;
  padding: 30px;
  padding-top: 40px;
  border-radius: 4px;
  position: absolute;
  top: 24%;
  right: 10%;
}


.login-container {
  background-image: url(../../assets/index/bg1.jpg);
  background-position: top left;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    // width: 420px;
    max-width: 100%;
    padding: 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size:18px;
      right: 0px;
      cursor: pointer;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}
</style>
