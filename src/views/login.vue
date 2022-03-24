<template>
  <div class="d-flex flex-column a w" >
      <div class="flex-grow-1"></div>
      <div class="d-flex flex-column mx-md-5 d-lg-block container-custom mb-8 mb-lg-0 pt-4 ">
        <div class="d-lg-inline-block pt-30 align-middle mx-auto text-center text-lg-start pe-lg-5 me-lg-3 w1" >
          <img class="login_icon" src="@/assets/free5gmano_icon.png" alt="free5gmano_icon"/>
          <h2 class="login_title">Free5g Mano， Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h2>
        </div>
        <div class="d-lg-inline-block mt-5 mt-lg-0 mx-auto text-center float-lg-end">
          <div class="bg-white shadow rounded mt-4 mt-lg-0 p-3 w1" >
            <input class="form-control form-control-lg mb-3" type="email" placeholder="電子郵件地址">
            <input class="form-control form-control-lg mb-3" type="password" placeholder="密碼">
            <button class="w-100 btn btn-primary btn-lg text-white mb-3" @click="a">登入</button>
            <router-link class="text-decoration-none" to="/">忘記密碼 ?</router-link>
            <div class="hr_custom"></div>
            <button class="btn btn-success btn-lg" data-bs-toggle="modal" data-bs-target="#register_Modal">建立新帳號</button>
          </div>
        </div>
      </div>
    <div class="flex-grow-1"></div>
  </div>
<ModalRegister></ModalRegister>
</template>
<script setup>
import { defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
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
  router.replace({
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
.login_icon {
  width: 100px;
  margin: 0 auto;
}
.login_title {
  font-size: 25px;
  font-weight: 500;
  margin-top: 16px;
  margin-bottom: 0px;
}
.btn-success {
  background-color: #42b72a !important;
}
.hr_custom {
  display: flex;
  margin: 16px 0px 22px 0px;
  border-bottom: 1px solid #dadde1;
}
.mb-8 {
    margin-bottom: 8rem;
}
.pt-30{
    padding-top: 30px;
}

.a{
  /* min-height: 850px; */
  height: 100vh;
}
.w{
  min-width: 100vw;
 
}
.w1{
  width: 320px;
}
@media (min-width: 1075px) {
 .container-custom {
   width: 980px;
   margin: 0 auto !important;
 }
}
@media (min-width: 576px) {
  .w{
    min-width: 500px
  }
  .w1{
    width: 400px;
  }
}
</style>