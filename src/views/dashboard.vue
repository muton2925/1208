<template>
  <div class="dashboard-container">
    <audio controls loops ref="a">
      <source src="../assets/Rubia.mp3">
        Your browser does not support the
        <code>audio</code> element.
    </audio>
    <button @click="as(123)">123</button>
    <button @click="sa(456)">456</button> 
    <div class="form-check form-switch">
      <input @change="sa(e)" class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
      <label class="form-check-label" for="flexSwitchCheckChecked">Checked switch checkbox input</label>
    </div>
    <div class="form-check form-switch">
      <input @change="sa('id')" class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
      <label class="form-check-label" for="flexSwitchCheckChecked">Checked switch checkbox input</label>
    </div>
  </div>
  <Alert ref="alertRef" v-show="alertExist"></Alert>
</template>
<script>
import { toRefs, reactive } from '@vue/reactivity';
import {computed, defineAsyncComponent,ref} from 'vue'
import { useStore } from 'vuex';
const Alert = defineAsyncComponent(() => import(/* webpackChunkName: "Alert" */ '../components/global/alert.vue'));
import { alertConfig, alertEvent } from '@/assets/js/alertData';
import { useRouter } from 'vue-router';
export default {
  components:{
    Alert
  },
  setup(){
    let a = ref(undefined)
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

    const sa = (id) =>{
      console.log(id)
    }
    return {
      alertRef, alertExist,as,ss,a,b,sa
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