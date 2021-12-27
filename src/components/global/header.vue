<template>
  <nav class="navbar navbar-expand-sm navbar-dark fixed-top flex-nowrap pe-3 py-0 bg-blue shadow-normal vw-mincontent">
    <div class="container-fluid px-0">
      <div class="navbar-brand white-space-normal bg-white px-3 py-0">
        <img src="../../assets/free5gmano_icon.png" alt="free5gmano_icon" width="70" height="70"/>
        <h1 class="navbar_custom d-none d-md-inline-block align-middle">FREE 5G MANO</h1>
      </div>
      <button class="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#nav-offcanvas">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>
  <template v-if="windowWidth <= 580">
    <Offcanvas></Offcanvas>
  </template>
</template>
<script>
import Offcanvas from './offcanvas.vue';
export default {
  components: {
    Offcanvas,
  },
  data() {
    return {
      windowWidth: window.innerWidth,
    } 
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  }
};
</script>
<style scoped>
.navbar_custom {
  width: 90px;
  margin: 0 16px;
  color: #000;
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.6;
  text-align: center;
  letter-spacing: 0.05rem;
}
</style>