<template>
  <nav class="navbar navbar-expand-sm navbar-dark flex-nowrap py-0 bg-blue shadow-normal vw-mincontent">
    <div class="container-fluid px-0">
      <div class="navbar-brand white-space-normal bg-white px-3 py-0" href="#">
        <img src="../../assets/free5gmano_icon.png" alt="free5gmano_icon" width="70" height="70"/>
        <h1 class="d-none nav_h1 d-md-inline-block align-middle text-black text-center my-0">FREE 5G MANO</h1>
      </div>
      <button class="navbar-toggler me-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>
  <div v-if="windowWidth < 576" class="offcanvas offcanvas-end offcanvas-custom" data-bs-backdrop="false" id="offcanvasExample">
    <ul id="accordionExample2">
      <li class="list-item">
        <router-link class="d-flex align-items-center text-black ps-3 py-3 list-link" to="/dashboard">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard me-2" viewBox="0 0 16 16">
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
          </svg>
          Dashboard
        </router-link>
      </li>
      <li class="list-item">
        <router-link class="d-flex align-items-center text-black ps-3 py-3 list-link" to="/dashboard">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-seam me-2" viewBox="0 0 16 16">
            <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
          </svg>
          NFV MANO Plugin
        </router-link>
      </li>
      <li class="list-item">
        <router-link class="d-flex align-items-center text-black ps-3 py-3 list-link" to="/dashboard" data-bs-toggle="collapse" data-bs-target="#collapse1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grid-3x3-gap me-2" viewBox="0 0 16 16">
            <path d="M4 2v2H2V2h2zm1 12v-2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm5 10v-2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zM9 2v2H7V2h2zm5 0v2h-2V2h2zM4 7v2H2V7h2zm5 0v2H7V7h2zm5 0h-2v2h2V7zM4 12v2H2v-2h2zm5 0v2H7v-2h2zm5 0v2h-2v-2h2zM12 1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zm-1 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zm1 4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2z"/>
          </svg>
          Generic Template
        </router-link>
        <div id="collapse1" class="collapse" data-bs-parent="#accordionExample2">
          <ul class="list-ul">
            <li><router-link class="d-flex ps-3 py-3 list-link" to="/dashboard">VNF Template</router-link></li>
            <li><router-link class="d-flex ps-3 py-3 list-link" to="/dashboard">NSD Template</router-link></li>
            <li><router-link class="d-flex ps-3 py-3 list-link" to="/dashboard">NRM Template</router-link></li>
          </ul>
        </div>
      </li>
      <li class="list-item">
        <router-link class="d-flex align-items-center text-black ps-3 py-3 list-link" to="/dashboard">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hdd-stack me-2" viewBox="0 0 16 16">
            <path d="M14 10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h12zM2 9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H2z"/>
            <path d="M5 11.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-2 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM14 3a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
            <path d="M5 4.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-2 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
          </svg>
          NSS template
        </router-link>
      </li>
      <li class="list-item">
        <router-link class="d-flex align-items-center text-black ps-3 py-3 list-link" to="/dashboard" data-bs-toggle="collapse" data-bs-target="#collapse2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-nut me-2" viewBox="0 0 16 16">
            <path d="m11.42 2 3.428 6-3.428 6H4.58L1.152 8 4.58 2h6.84zM4.58 1a1 1 0 0 0-.868.504l-3.428 6a1 1 0 0 0 0 .992l3.428 6A1 1 0 0 0 4.58 15h6.84a1 1 0 0 0 .868-.504l3.429-6a1 1 0 0 0 0-.992l-3.429-6A1 1 0 0 0 11.42 1H4.58z"/>
            <path d="M6.848 5.933a2.5 2.5 0 1 0 2.5 4.33 2.5 2.5 0 0 0-2.5-4.33zm-1.78 3.915a3.5 3.5 0 1 1 6.061-3.5 3.5 3.5 0 0 1-6.062 3.5z"/>
          </svg>
          NSSI View
        </router-link>
        <div id="collapse2" class="collapse" data-bs-parent="#accordionExample2">
          <ul class="list-ul">
            <li><router-link class="d-flex ps-3 py-3 list-link" to="/dashboard">Graph View</router-link></li>
            <li><router-link class="d-flex ps-3 py-3 list-link" to="/dashboard">List View</router-link></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  watch: {
    windowWidth: function (newValue,oldValue) {
      if(oldValue < 768){
        if (newValue >= 768) {
          this.isOpen = false;
        }
      }
      else{
        if(newValue < 768) {
          this.isOpen = false;
        }        
      }
    },
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
.list-item {
  font-size: 10px;
}
.list-link {
  border-bottom: #e5e5e5 1px solid;
}
.list-ul li a{
  background-color:#e5e5e5;
  color: black !important;
}
.nav_h1 {
  width: 90px;
  margin: 0 16px;
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.6;
  letter-spacing: 0.05rem;
}
.offcanvas-custom {
  top: 70px;
  width: 180px;
}
@media (min-width: 576px) {

}
@media (min-width: 768px) {

}
</style>