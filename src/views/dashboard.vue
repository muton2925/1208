<template>
  <div class="dashboard-container">
    <audio controls loops>
      <source src="../assets/Rubia.mp3">
        Your browser does not support the
        <code>audio</code> element.
    </audio>
    <button @click="as(123)">123</button>
    <button @click="as(456)">456</button>
    {{ss.a}}
  </div>
  <Alert ref="alertRef" v-show="alertExist"></Alert>
</template>
<script>
import { toRefs, reactive } from '@vue/reactivity';
import {defineAsyncComponent} from 'vue'
const Alert = defineAsyncComponent(() => import(/* webpackChunkName: "Alert" */ '../components/global/alert.vue'));
import { alertConfig, alertEvent } from '../assets/js/alertData';
export default {
  components:{
    Alert
  },
  setup(){
    const { alertRef, alertExist } = toRefs(alertConfig);
    const ss = reactive({});
    const as = (a) =>{
      ss['a'] = a;
      alertEvent(1, 'NSS Template', 'deleted');
      console.log(ss)
    }
    return {
      alertRef, alertExist,as,ss
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