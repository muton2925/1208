<template>
  <template v-if="loginStatus">
    <router-view></router-view>
  </template>
  <template v-else>
    <main>
      <div class="grid-custom">
        <div class="grid-main-custom" style="overflow: hidden;">
          <router-view v-if="isRouterAlive"></router-view>
        </div>
      </div>
    </main>
    <Header></Header>
    <Sidebar></Sidebar>
  </template>
</template>
<script setup>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Header from "./components/global/header.vue";
import Sidebar from "./components/global/sidebar.vue";
// import Cookies from 'js-cookie'
import { ref, watch, computed, provide, nextTick, onMounted } from 'vue';
const store = useStore();
const route = useRoute();
const isRouterAlive = ref(true);
const info = sessionStorage.getItem('token');
const { locale } = useI18n()
const loginStatus = computed(() => store.state.loginStatus);
const reload = () => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
};
// Cookies.set('foo', 'bar')
let lang = navigator.language;//常規瀏覽器語言
lang = lang.slice(0, 2);//擷取lang前2位字元
if(lang == 'zh'){
  store.commit("changeLocaleLang", 'tw');
  locale.value = store.state.localeLang;
}else{
  store.commit("changeLocaleLang", 'en');
  locale.value = store.state.localeLang;
}
if (info) {
  const token = JSON.parse(info).token;
  // 如果token不為空，且確實有這個欄位則讓路由變更
  if (token.length > 0 || token !== undefined)
    store.commit("changeLoginStatus");
}
provide('reload', reload);
watch(route, () => {
  if(route.path == '/')
    store.commit('changeRoute', 'dashboard');
  else
    store.commit('changeRoute', route.path.slice(1));
});
onMounted(() => {
  window.addEventListener("resize", () => {
    store.commit("changeWindowWidth");
  });
  
});
</script>
<style>
ul {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
}
.bg-blue {
  background-color: #4e73df;
  background-image: linear-gradient(180deg, #4e73df 10%, #224abe 100%);
  background-size: cover;
}
.offcanvas-backdrop {
  top: 70px !important;
}
.modal {
  padding: 0 !important;
}
.modal-open {
  padding: 0 !important;
}
.modal-backdrop {
  width: 100% !important;
  height: 100% !important;
}
.offcanvas-backdrop {
  width: 100% !important;
  height: 100% !important;
}
.grid-custom {
  display: grid;
  grid-template-rows: 70px 1fr;
  grid-template-columns: 1fr;
}
.grid-main-custom {
  grid-row: 2 / 3;
  grid-column: 1 / 2;
}
.tablecell-custom {
  min-width: 150px;
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
@media (min-width: 576px) {
  .grid-custom {
    grid-template-columns: 102px 1fr;
  }
  .grid-main-custom {
    grid-column: 2 / 3;
  }
}
@media (min-width: 768px) {
  .grid-custom {
    grid-template-columns: 224px 1fr;
  }
}
</style>