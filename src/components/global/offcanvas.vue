<template>
  <div id="nav-offcanvas" class="offcanvas offcanvas-end offcanvas-custom" ref="offcanvas_ref">
    <ul id="accordion-basic">
      <li v-for="item in menuData" :key="item.name">
        <template v-if="item.childNodes.length > 0">
          <div class="list-item" data-bs-toggle="collapse" :data-bs-target="'#' + item.url">
            <i class="me-2" :class="item.icon"></i>
            {{ item.name }}
            </div>
            <div :id="item.url" class="collapse" :ref="item.url + '_xs'" data-bs-parent="#accordion-basic">
              <ul class="list-ul">
                <li v-for="child in item.childNodes" :key="child.name">
                  <router-link class="list-item" :to="{ path :  '/' + child.url }" @click="closeCollapse"> {{ child.name }} </router-link>
                </li>
              </ul>
            </div>
        </template> 
        <template v-else>
          <router-link class="list-item" :to="{ path : '/' + item.url }" @click="closeCollapse">
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
  align-items: center;
  padding: 1rem 0 1rem 1rem;
  text-decoration: none;
  cursor: pointer;
  border-bottom: #e5e5e5 1px solid;
}
.list-ul {
  background-color:#e5e5e5;
}
.list-ul li:not(:last-child) {
  border-bottom: #FFF 1px solid;
}
</style>