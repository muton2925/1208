<template>
  <nav class="navbar navbar-expand-sm navbar-dark flex-nowrap py-0 bg-blue shadow-normal vw-mincontent">
    <div class="container-fluid px-0">
      <div class="navbar-brand white-space-normal bg-white px-3 py-0">
        <img src="../../assets/free5gmano_icon.png" alt="free5gmano_icon" width="70" height="70"/>
        <h1 class="navbar_custom d-none d-md-inline-block align-middle">FREE 5G MANO</h1>
      </div>
      <button class="navbar-toggler me-3" data-bs-toggle="offcanvas" data-bs-target="#nav-offcanvas">
        <span class="navbar-toggler-icon"></span>
      </button>
      
    </div>

  </nav>
  <div v-if="windowWidth < 576" id="nav-offcanvas" class="z offcanvas offcanvas-end offcanvas-custom" data-bs-backdrop="false">
    <ul id="accordion-basic">
      <Item v-for="item in menuData" :key="item.name" :title="item.name" :icon="item.icon" :childs="item.childNodes" :url="item.url"></Item>
    </ul>
  </div>
  <!-- <div class="nav-height a a-manu nav-offcanvas " ></div> -->
</template>
<script>
import Item from './offcanvas.vue'
export default {
  components: {
    Item
  },
  data() {
    return {
      menuData: [
        {
          name: "Dashboard",
          icon: "bi bi-clipboard",
          url: "dashboard",
          childNodes: [],
        },
        {
          name: "NFV MANO Plugin",
          icon: "bi bi-award",
          url: "nfv_mano_plugin",
          childNodes: [],
        },
        {
          name: "Generic Template",
          icon: "bi bi-bell",
          url: "generic_template",
          childNodes: [
            {
              name: "VNF Template",
              url: "vnf_template"
            },
            {
              name: "NSD Template",
              url: "nsd_template"
            },
            {
              name: "NRM Template",
              url: "nrm_template"
            },
          ],
        },
        {
          name: "NSS template",
          icon: "bi bi-bootstrap",
          url: "nss_template",
          childNodes: [],
        },
        {
          name: "NSSI View",
          icon: "bi bi-brightness-high",
          url: "nssi_view",
          childNodes: [
            {
              name: "Graph View",
              url: "nssi_topology"
            },
            {
              name: "List View",
              url: "NSS_Instance"
            },
          ],
        },
      ],
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
/* .nav-height {
  min-height: calc(100vh - 70px);
}
.a{
  width: 100vw;
  position: absolute;
  z-index: 1;
  background-color: rgba(0,0,0,.15);
}` */
.z{
  z-index: 9999;
}
.offcanvas-custom {
  top: 70px;
  width: 180px;
}
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