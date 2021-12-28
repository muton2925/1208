<template>
  <Nav></Nav>
  <div class="d-sm-flex app">
    <Menucomponent></Menucomponent>
    <router-view></router-view>
  </div>
</template>
<script>
import Nav from "./components/global/header.vue";
import Menucomponent from "./components/global/sidebar.vue";
export default {
  components: {
    Nav,
    Menucomponent,
  },
  data() {
    return {

    };
  },
};
</script>
<style>
.app{
  min-width: 500px;
}
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
.aside_height {
  min-height: calc(100vh - 70px);
}
.offcanvas-backdrop {
  top: 70px !important;
}

.madal{
  padding: 0 !important;
}
.madal-open{

  padding: 0 !important;
}
</style>
