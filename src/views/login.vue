<template>
  <div class="d-flex flex-column min-vh-100" style="min-width: 500px;">
    <div class="flex-grow-1 py-4">
      <div class="d-flex flex-column mx-5 d-lg-block container-custom">
        <div class="d-lg-inline-block align-top mx-auto text-center text-lg-start pe-lg-5 me-lg-3" style="width: 400px;">
          <img class="login_icon" src="@/assets/free5gmano_icon.png" alt="free5gmano_icon"/>
          <h2 class="login_title">Free5g Mano，讓你和親朋好友保持聯繫，隨時分享生活中的每一刻。</h2>
        </div>
        <div class="d-lg-inline-block align-top mx-auto text-center float-lg-end">
          <div class="bg-white shadow rounded mt-4 p-3" style="width: 400px;">
            <input class="form-control form-control-lg mb-3" type="email" placeholder="電子郵件地址">
            <input class="form-control form-control-lg mb-3" type="password" placeholder="密碼">
            <button class="w-100 btn btn-primary btn-lg text-white mb-3" @click="a">登入</button>
            <router-link class="text-decoration-none" to="/">忘記密碼 ?</router-link>
            <div class="hr_custom"></div>
            <button class="btn btn-success btn-lg" data-bs-toggle="modal" data-bs-target="#register_Modal">建立新帳號</button>
          </div>
        </div>
      </div>
    </div>
  </div>
<ModalRegister></ModalRegister>
</template>
<script setup>
import { defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const ModalRegister = defineAsyncComponent(() => import(/* webpackChunkName: "ModalRegister" */ '@/components/global/modal-register.vue'));
const store = useStore();
const router = useRouter();
const a = () => { 
  store.commit("changeLoginStatus");
  router.push({
    path: '/dashboard'
  }); 
};
</script>
<style scoped>
.login_icon {
  width: 80px;
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
@media (min-width: 1075px) {
 .container-custom {
   width: 980px;
   margin: 0 auto !important;
 }
}
</style>