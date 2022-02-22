<template>
  <div class="dashboard-container">
    <audio controls loops>
      <source src="../assets/Rubia.mp3">
        Your browser does not support the
        <code>audio</code> element.
    </audio>
     <select v-model="options" class="form-select form-select"  id="InputFile3" aria-label=".form-select example">
            <option selected>
              請選擇 ...
            </option>
            <option >
            0
            </option>
           
      </select>
  </div>
</template>
<script>
import {plus,b,c,aa} from '../assets/js/test'
import {a,plusb} from '../assets/js/t1'
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
   watch(options,()=>{
     console.log(invalidated)
     console.log(options.value)
   })
    return {
      plus,a,b,plusb,c,aa,bb,options
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