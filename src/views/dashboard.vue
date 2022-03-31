<template>
  <div class="dashboard-container">
    <audio controls loops ref="a">
      <source src="../assets/Rubia.mp3">
        Your browser does not support the
        <code>audio</code> element.
    </audio>
    <button @click="logout">logout</button>
    <div class="form-check form-switch">
      <input  class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
      <label class="form-check-label" for="flexSwitchCheckChecked">Checked switch checkbox input</label>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
// import axios  from 'axios';
export default {
  setup(){
    // axios.post('http://10.20.1.40:80/basic/login/',{
  
    //     name: "安安",
    //     password: "123523",
      
    // }).then(res=>{
    //   console.log(res)
    // })
    // .catch(err=>{
    //   console.log(err)
    // })


    const router = useRouter();
    const store = useStore();
    onBeforeRouteLeave( () => {
      const info = sessionStorage.getItem('token');
      if(!info){
          router.push({
          name: 'dashboard'
       })
      }
    })
    const logout = () => {
      sessionStorage.removeItem('token')
      store.commit("changeLoginStatus");
      router.push({
          path: '/'
      })
    }
    return {
      logout
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