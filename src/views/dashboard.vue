<template>
  <div class="dashboard-container">
    <audio controls loops>
      <source src="../assets/Rubia.mp3">
        Your browser does not support the
        <code>audio</code> element.
    </audio>
    <button @click="as">123</button>
  </div>
  <Alert ref="alertRef" v-show="alertExist"></Alert>
</template>
<script>
import { toRefs } from '@vue/reactivity';
import {defineAsyncComponent} from 'vue'
const Alert = defineAsyncComponent(() => import(/* webpackChunkName: "Alert" */ '../components/global/alert.vue'));
import { alertConfig, alertEvent } from '../assets/js/alertData';
export default {
  components:{
    Alert
  },
  setup(){
    const { alertRef, alertExist } = toRefs(alertConfig)
    const as = () =>{
      alertEvent(1, 'NSS Template', 'deleted');
    }
    return {
      alertRef, alertExist,as
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