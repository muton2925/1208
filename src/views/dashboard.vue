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
    <select name="" id="" v-model="a">
      <option selected >選擇檔案類型</option>
      <option value="456" >456</option>
      <option value="">123</option>
    </select>
    <select name="" id="" :disabled="b">
      <option value="456" ></option>
      <option value="">123</option>
    </select>
  </div>
  <Alert ref="alertRef" v-show="alertExist"></Alert>
</template>
<script>
import { toRefs, reactive } from '@vue/reactivity';
import {computed, defineAsyncComponent,ref} from 'vue'
import { useStore } from 'vuex';
const Alert = defineAsyncComponent(() => import(/* webpackChunkName: "Alert" */ '../components/global/alert.vue'));
import { alertConfig, alertEvent } from '../assets/js/alertData';
import { useRouter } from 'vue-router';
export default {
  components:{
    Alert
  },
  setup(){
    let a = ref('選擇檔案類型')
    const b = computed(()=>{
      console.log(a.value)
      if(a.value !='選擇檔案類型'){
        return false
      }else{
        return true
      }
    })
    const router = useRouter();
    const store = useStore();
    const { alertRef, alertExist } = toRefs(alertConfig);
    const ss = reactive({});
    const as = (a) =>{
      ss['a'] = a;
      alertEvent(1, 'NSS Template', 'deleted');
      console.log(ss)
      sessionStorage.removeItem("token");
      store.commit("changeLoginStatus");
      router.push({
        path: '/'
      }); 

    }
    return {
      alertRef, alertExist,as,ss,a,b
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