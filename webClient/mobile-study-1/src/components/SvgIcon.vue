<template>

  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>

</template>

<script lang="ts" >
import { Options, Vue } from "vue-class-component"

@Options({
  name:"SvgIcon",
  props:
  {
    iconClass: 
    {
      type: String,
      required: true
    },
    className: 
    {
      type: String,
      default: ''
    }
  },
  watch:
  {
    iconClass:{
      handler(newValue:string,oldValue:string):void
      {
        console.log("svgIcon class:" + newValue);
      },
      immediate:true
    }
  }
})
export default class SvgIcon extends Vue {

  public iconClass:string = "";
  public className:string = "";

  public created():void
  {
    console.log("svgicon test");
  }

  public get iconName():String
  {
    let icon:string = `#icon-${this.iconClass}`;
    console.log("iconName:" + icon);
    return `#icon-${this.iconClass}`;
  }

  public get svgClass() {

      console.log("svgClass:" + this.className);

      return 'svg-icon eye';

      // if (this.className) {
      //   return 'svg-icon ' + this.className
      // } else {
      //   return 'svg-icon'
      // }
    }
 
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
