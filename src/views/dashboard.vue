<template>
  <div class="dashboard-container">
    <audio controls loops>
      <source src="../assets/Rubia.mp3">
        Your browser does not support the
        <code>audio</code> element.
    </audio>
    <button @click="as">123</button>
  </div>
</template>
<script>
import {plus,b,c,aa} from '../assets/js/test'
import {a,plusb} from '../assets/js/t1'
import {text_invalidated} from '../assets/js/validate'
import { reactive,  toRefs } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
export default {
  setup(){
    const bb= ()=>{
      console.log("b")
    }
   const VNF = reactive({
      options:'請選擇 ...',
      invalidated:false
   })
   const {options, invalidated} = toRefs(VNF)
   function as (){
     text_invalidated.value = true
   }
   watch(options,()=>{
     console.log(invalidated)
     console.log(options.value)
   })
    return {
      plus,a,b,plusb,c,aa,bb,options,as
    }
  }
}
</script>
<style>
.dashboard-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px);
}
</style>