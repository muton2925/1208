import { createStore } from 'vuex'
export default createStore({
  state: {
    status: false,
    filterEntries: [],
    windowWidth: window.innerWidth,
    currentRoute: '',
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
            url: "vnf_template",
          },
          {
            name: "NSD Template",
            url: "nsd_template",
          },
          {
            name: "NRM Template",
            url: "nrm_template",
          },
        ],
      },
      {
        name: "NSS Template",
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
            url: "nssi_topology",
          },
          {
            name: "List View",
            url: "NSS_Instance",
          },
        ],
      },
    ],
  },
  mutations: {
    statusOn(state) {
      state.status = true;
    },
    statusOff(state) {
      state.status = false;
    },
    changeWindowWidth(state) {
      state.windowWidth = window.innerWidth;
    },
    changeRoute(state,payload) {
      state.currentRoute = payload;
    },
  },
  actions: {
  },
  modules: {
  }
})
