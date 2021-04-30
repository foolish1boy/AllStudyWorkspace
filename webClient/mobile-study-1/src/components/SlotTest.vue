<template>
    <slot></slot>
    <p>我来了</p>
    <slot name="slot2">
        <div>
            <van-button>我是原始默认按扭2</van-button>
        </div>
    </slot>
</template>

<script lang="ts" >
import { Options, Vue } from "vue-class-component";


@Options({
    name:"SlotTest"
})
export default class SlotTest extends Vue {
   
}
</script>


<style scoped>

</style>
