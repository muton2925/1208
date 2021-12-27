<template>
  <aside class="d-inline-block w-0 w-sm-102px w-md-224px aside_height bg-blue">
    <ul id="sidebar-parent" class="text-white">
      <li class="position-relative" v-for="item in menuData" :key="item.name">
        <template v-if="item.childNodes.length > 0">
          <a class="list-item" data-bs-toggle="collapse" :data-bs-target="'#' + item.url">{{ item.name }}</a>
          <div v-show="windowWidth >= 768" :id="item.url" class="collapse collapse-item" :ref="item.url + '_md'" data-bs-parent="#sidebar-parent">
              <ul class="py-2">
                <li v-for="child in item.childNodes" :key="child.name">
                  <router-link class="list-item" :to="{ path :  '/' + child.url }" @click="changeCollapseStatus()"> {{ child.name }} </router-link>
                </li>
              </ul>
          </div>
          <div v-show="windowWidth >= 576 && windowWidth < 768" :id="item.url" class="collapse collapse-item" :ref="item.url + '_sm'" data-bs-parent="#sidebar-parent">
              <ul class="py-2">
                <li v-for="child in item.childNodes" :key="child.name">
                  <router-link class="list-item" :to="{ path :  '/' + child.url }" @click="changeCollapseStatus()"> {{ child.name }} </router-link>
                </li>
              </ul>
          </div>
        </template>
        <template v-else>
          <router-link class="list-item" :to="{ path : '/' + item.url }" @click="changeCollapseStatus()">{{ item.name }}</router-link>
        </template>
      </li>
    </ul>
  </aside>
</template>
<script>
import { ref } from 'vue';
import { Collapse } from 'bootstrap/dist/js/bootstrap.bundle.js'
export default {
  props: ['menuData'],
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
      changeStatus: false,
      windowWidth: window.innerWidth,
      generic_template_collapse: '',
      nssi_view_collapse: ''
    };
  },
  watch: {
    windowWidth: function(newVal,oldVal) {
      if(newVal >= 768) {
        if(oldVal < 768) 
          this.changeCollapseStatus(); // 767(sm) -> 768(md)
      }
      else if(newVal < 768) {
        if(newVal < 576) { // 576(sm) -> 575(sm)
          this.changeCollapseStatus();
        }
        if(oldVal >= 768)  // 768(sm) -> 767(sm)
          this.changeCollapseStatus();
      }
    }
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
    this.generic_template_collapse_sm = new Collapse(this.$refs.generic_template_sm,{ toggle: false })
    this.generic_template_collapse_md = new Collapse(this.$refs.generic_template_md,{ toggle: false })
    this.nssi_view_collapse_sm = new Collapse(this.$refs.nssi_view_sm,{ toggle: false })
    this.nssi_view_collapse_md = new Collapse(this.$refs.nssi_view_md,{ toggle: false })
  },
  methods: {
    changeCollapseStatus() {
      this.generic_template_collapse_sm.hide();
      this.generic_template_collapse_md.hide();
      this.nssi_view_collapse_sm.hide();
      this.nssi_view_collapse_md.hide();
    }
  }
}
</script>
<style scoped>
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
  z-index: 999;
  box-shadow: 0 0.15rem 1.75rem 0 rgb(58 59 69 / 15%);
  border-radius: 5px;
  background-color: #FFF;
}
.collapse-item .list-item {
  width: 100%;
  color: black;
  padding: .75rem 1.5rem;
  white-space: nowrap;
}
@media (min-width: 768px) {
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
  .collapse-item .list-item {
    padding: .75rem 1.5rem;
  }
}
</style>