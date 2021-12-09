<template>
  <Nav></Nav>
  <div class="d-flex">
    <Menucomponent></Menucomponent>
    
  </div>
</template>
<script>
import Nav from "./components/global/nav.vue";
import Menucomponent from "./components/global/menucomponent.vue";
export default {
  components: {
    Nav,
    Menucomponent,
  },
  data() {
    return {
    }   
  }
};
</script>
<style>
.bg-blue {
  background-color: #4e73df;
  background-image: linear-gradient(180deg, #4e73df 10%, #224abe 100%);
  background-size: cover;
}
.aside_height {
  min-height: calc(100vh - 70px);
}
</style>
