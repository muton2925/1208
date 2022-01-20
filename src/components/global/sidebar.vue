<template>
  <aside class="sidebar-custom bg-blue">
    <ul id="sidebar-parent" class="text-white">
      <li class="position-relative" v-for="item in menuData" :key="item.name">
        <template v-if="item.childNodes.length > 0">
          <a class="list-item" :class="{ 'currentRoute' : routeStatus(item.url,currentRoute) }" data-bs-toggle="collapse" :data-bs-target="'#' + item.url" @click="url(item.url)">{{ item.name }}
            <i v-if="currentWindowWidth >= 768" :class="[[ item.url == clickUrl ? 'bi bi-chevron-up' : 'bi bi-chevron-down' ],'ms-auto']"></i>
          </a>
          <template v-if="currentWindowWidth >= 768">
            <div :id="item.url" class="collapse collapse-item" :ref="item.url + '_md'" data-bs-parent="#sidebar-parent">
              <ul class="p-2">
                <li v-for="child in item.childNodes" :key="child.name">
                  <router-link class="list-item" :class="{ 'currentRouteCollapseItem' : child.url == currentRoute }" :to="{ path :  '/' + child.url }" @click="closeCollapse(),routerEvent()"> {{ child.name }} </router-link>
                </li>
              </ul>
            </div>
          </template>
          <template v-else-if="currentWindowWidth >= 576 && currentWindowWidth < 768">
            <div :id="item.url" class="collapse collapse-item" :ref="item.url + '_sm'" data-bs-parent="#sidebar-parent">
              <ul class="p-2">
                <li v-for="child in item.childNodes" :key="child.name">
                  <a class="list-item" :class="{ 'currentRouteCollapseItem' : child.url == currentRoute }" :to="{ path :  '/' + child.url }" @click="closeCollapse()"> {{ child.name }} </a>
                </li>
              </ul>
            </div>
          </template>
        </template>
        <template v-else>
          <router-link class="list-item" :class="{ 'currentRoute' : item.url == currentRoute }" :to="{ path : '/' + item.url }" @click="closeCollapse()">{{ item.name }}</router-link>
        </template>
      </li>
    </ul>
  </aside>
</template>
<script>
import { ref } from 'vue';
import { mapState } from "vuex";
import { Collapse } from 'bootstrap/dist/js/bootstrap.bundle.js'
export default {
  inject:['reload'],
  setup() {
    const generic_template_sm = ref(null)
    const generic_template_md = ref(null)
    const nssi_view_sm = ref(null)
    const nssi_view_md = ref(null)
    return{
      generic_template_sm,generic_template_md,nssi_view_sm,nssi_view_md
    }
  },
  data() {
    return {
      clickUrl: '',
      generic_template_md_ref: '',
      generic_template_sm_ref: '',
      nssi_view_md_ref: '',
      nssi_view_sm_ref: '',
    };
  },
  computed: mapState({
    currentWindowWidth: 'windowWidth',
    currentRoute: 'currentRoute',
    menuData: 'menuData',
  }),
  watch: {
    currentWindowWidth(newVal) {
      if(newVal < 768) {
        this.clickUrl = '';
      }
    }
  },
  methods: {
    url(url) {
      if(url == this.clickUrl)
        this.clickUrl = '';
      else
        this.clickUrl = url;
    },
    routerEvent() {
      this.reload();
    },
    routeStatus(url,route) {
      const index = this.$store.state.menuData.findIndex(e => e.url == url);
      if(this.$store.state.menuData[index].childNodes.findIndex(e => e.url == route) != -1)
        return true;
      else
        return false;
    },
    closeCollapse() {
      if(this.currentWindowWidth >= 768) {
        this.clickUrl = '';
        this.generic_template_md_ref = new Collapse(this.$refs.generic_template_md,{ toggle: false })
        this.nssi_view_md_ref = new Collapse(this.$refs.nssi_view_md,{ toggle: false })
        this.generic_template_md_ref.hide();
        this.nssi_view_md_ref.hide();
      }
      else {
        this.generic_template_sm_ref = new Collapse(this.$refs.generic_template_sm,{ toggle: false })
        this.nssi_view_sm_ref = new Collapse(this.$refs.nssi_view_sm,{ toggle: false })
        this.generic_template_sm_ref.hide();
        this.nssi_view_sm_ref.hide();
      }
    }
  }
}
</script>
<style scoped>
.sidebar-custom {
  display: none;
  position: fixed;
  top: 70px;
  bottom: 0;
}
.list-item {
  display: flex;
  width: 102px;
  color: white;
  font-size: .65rem;
  padding: 12px 16px;
  text-align: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
}
.collapse-item {
  position: absolute;
  top: 15px;
  left: 110px;
  z-index: 20;
  box-shadow: 0 0.15rem 1.75rem 0 rgb(58 59 69 / 15%);
  border-radius: 5px;
  background-color: #FFF;
}
.collapse-item .list-item {
  width: 100%;
  color: black;
  padding: .75rem 1rem;
  border-radius: 5px;
  white-space: nowrap;
}
.collapse-item .list-item:hover {
  background-color: #F5F5F5;
}
.collapse-item .list-item:active {
  background-color: #DCDCDC;
}
.currentRoute {
  font-size: .75rem;
  font-weight: 900;
}
.currentRouteCollapseItem {
  font-weight: 800;
  background-color: #E9EBEB;
}
.currentRouteCollapseItem:hover {
  background-color: #DDDEDE !important;
}
.currentRouteCollapseItem:active {
  background-color: #B8BBBC !important;
}
@media (min-width: 576px) {
  .sidebar-custom {
    display: block;
    width: 102px;
  }
}
@media (min-width: 768px) {
  .sidebar-custom {
    width: 224px;
  }
  .list-item {
    width: 224px;
    padding: 19px;
    justify-content: start;
  }
  .collapse-item {
    position: relative;
    margin: 0 1rem;
    top: 0;
    left: 0;
  }
}
</style>