<template>
  <Header></Header>
  <div class="d-flex">
    <Sidebar :menuData="menuData"></Sidebar>
    <router-view></router-view>
  </div>
</template>
<script>
import Header from "./components/global/header.vue";
import Sidebar from "./components/global/sidebar.vue";
export default {
  components: {
    Header,
    Sidebar,
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
    };
  },
};
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
.aside_height {
  min-height: calc(100vh - 70px);
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
</style>
