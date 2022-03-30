<template>
  <div class="container-fluid container-custom">
    <div class="dropdown position-fixed cursor-pointer top-0 end-0 mt-3 me-4">
      <a class="dropdown-toggle text-decoration-none text-black user-select-none" data-bs-toggle="dropdown" aria-expanded="false">TW</a>
      <ul class="dropdown-menu dropdown-menu-end dropdown-custom" aria-labelledby="dropdownMenu">
        <li><a class="dropdown-item" href="#">TW</a></li>
        <li><hr class="dropdown-divider my-0"></li>
        <li><a class="dropdown-item" href="#">EN</a></li>
      </ul>
    </div>
    <div class="d-flex flex-column">
      <div class="text-center mb-4">
        <img class="login_icon" src="@/assets/free5gmano_icon.png" alt="free5gmano_icon"/>
        <h2 class="login_title">Free5g Mano， Lorem ipsum dolor sit consectetur.</h2>
      </div>
      <div class="form-custom bg-white shadow rounded text-center mt-4 mx-auto p-3">
        <input class="form-control form-control-lg mb-3" type="email" placeholder="電子郵件地址">
        <input class="form-control form-control-lg mb-3" type="password" placeholder="密碼">
        <button class="w-100 btn btn-primary btn-lg text-white mb-3" @click="a">登入</button>
        <router-link class="text-decoration-none" to="/">忘記密碼 ?</router-link>
        <div class="hr_custom"></div>
        <button class="btn btn-success btn-lg" data-bs-toggle="modal" data-bs-target="#register_Modal">建立新帳號</button>
      </div>
    </div>
  </div>
<ModalRegister></ModalRegister>
</template>
<script setup>
import { useStore } from 'vuex';
import { defineAsyncComponent } from 'vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
const ModalRegister = defineAsyncComponent(() => import(/* webpackChunkName: "ModalRegister" */ '@/components/global/modal-register.vue'));
const store = useStore();
const router = useRouter();
const a = () => { 
  store.commit("changeLoginStatus");
  const token = JSON.stringify({
    'token':123
  })
  sessionStorage.setItem("token", token);
  router.push({
    path: '/dashboard'
  }); 
};
onBeforeRouteLeave((to) => {
   const info = sessionStorage.getItem('token');
   if(!info){
     if(to.meta.requireAuth){
        router.push({
        name: 'login'
      })
     }
   }
})

</script>
<style scoped>
.container-custom {
  display: flex;
  height: 100vh;
  min-width: 360px;
  min-height: 600px;
  justify-content: center;
  align-items: center;
}
.login_icon {
  width: 100px;
  margin: 0 auto 15px auto;
  user-select: none;
}
.login_title {
  width: 330px;
  font-size: 25px;
  font-weight: 500;
}
.form-custom {
  width: 330px;
}
.hr_custom {
  display: flex;
  margin: 16px 0px 22px 0px;
  border-bottom: 1px solid #dadde1;
}
.dropdown-custom {
  min-width: 4rem;
  text-align: center;
}
</style>