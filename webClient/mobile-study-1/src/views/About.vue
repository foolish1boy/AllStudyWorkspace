<template>
  <div class="about">
    <h1>This is an about page</h1>
      <van-cell-group v-for="(item,idx) in list" :key="idx">
        <van-cell :title="'【钻石' + item.gold + '】'" :value="'￥' + item.rmb" is-link @click="clickHandler(item)" />
    </van-cell-group>

  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';

@Options({
  name:"About"
})
export default class About extends Vue {
  public list:{gold:number,rmb:number}[] = [];

  public created():void
  {
    let self = this;
    self.list.push({gold:880,rmb:88});
    self.list.push({gold:1880,rmb:188});
    self.list.push({gold:2880,rmb:288});
    self.list.push({gold:3880,rmb:388});
    self.list.push({gold:4880,rmb:488});
    self.list.push({gold:5880,rmb:588});
  }


  private clickHandler(item:any):void
  {
     console.log(item.gold);
  }

}
</script>