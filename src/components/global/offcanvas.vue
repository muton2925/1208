<template>
  <div id="nav-offcanvas" class="offcanvas offcanvas-end offcanvas-custom" ref="offcanvas_ref">
    <ul id="accordion-basic">
      <li v-for="item in menuData" :key="item.name">
        <template v-if="item.childNodes.length > 0">
          <div class="list-item" :class="{ 'currentRoute' : routeStatus(item.url,currentRoute) }" data-bs-toggle="collapse" :data-bs-target="'#' + item.url">
            <i class="me-2" :class="item.icon"></i>
            {{ item.name }}
            </div>
            <div :id="item.url" class="collapse" :ref="item.url + '_xs'" data-bs-parent="#accordion-basic">
              <ul class="list-ul">
                <li v-for="child in item.childNodes" :key="child.name">
                  <router-link class="list-item" :class="{ 'currentRoute' : child.url == currentRoute }" :to="{ path :  '/' + child.url }" @click="closeCollapse"> {{ child.name }} </router-link>
                </li>
              </ul>
            </div>
        </template> 
        <template v-else>
          <router-link class="list-item" :class="{ 'currentRoute' : item.url == currentRoute }" :to="{ path : '/' + item.url }" @click="closeCollapse">
            <i class="me-2" :class="item.icon"></i>
            {{ item.name }}
          </router-link>
        </template>
      </li>
    </ul>
  </div>
</template>
<script>
import { ref } from 'vue';
import { mapState } from "vuex";
import { Collapse,Offcanvas } from 'bootstrap/dist/js/bootstrap.bundle.js';
export default {
  setup() {
    const offcanvas_ref = ref(null)
    const generic_template_xs = ref(null)
    const nssi_view_xs = ref(null)
    return{
      offcanvas_ref,
      generic_template_xs,
      nssi_view_xs
    }
  },
  data() {
    return {
      offcanvas: '',
      generic_template: '',
      nssi_view: '',
    }
  },
  computed: mapState({
    currentWindowWidth: 'windowWidth',
    currentRoute: 'currentRoute',
    menuData: 'menuData',
  }),
  mounted() {
    this.offcanvas = new Offcanvas(this.$refs.offcanvas_ref,{});
    this.generic_template = new Collapse(this.$refs.generic_template_xs,{ toggle : false });
    this.nssi_view = new Collapse(this.$refs.nssi_view_xs,{ toggle : false });
  },
  watch: {
    currentWindowWidth: function (newVal) {
      if(newVal >= 576) {
        this.closeCollapse();
      }
    },
  },
  methods: {
    routeStatus(url,route) {
      const index = this.$store.state.menuData.findIndex(e => e.url == url);
      if(this.$store.state.menuData[index].childNodes.findIndex(e => e.url == route) != -1)
        return true;
      else
        return false;
    },
    closeCollapse() {
      this.offcanvas.hide();
      this.generic_template.hide();
      this.nssi_view.hide();
    },
  }
}
</script>
<style scoped>
.offcanvas-custom {
  top: 70px;
  width: 180px;
}
.list-item {
  display: flex;
  color: #000;
  font-size: 12px;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  padding: 1rem 0 1rem 1rem;
  border-bottom: #e5e5e5 1px solid;
}
.list-item:hover {
  background-color: #dedede !important;
}
.list-item:active {
  background-color: #d1d1d1 !important;
}
.list-ul {
  background-color:#efefef;
}
.list-ul li:not(:last-child) {
  border-bottom: #FFF 1px solid;
}
.currentRoute {
  font-weight: 800;
  background-color: #e4e4e4;
}
.currentRoute:hover {
  background-color: #d3d3d3 !important;
}
.currentRoute:active {
  background-color: #c5c5c5 !important;
}
</style>