<template>
  <aside class="d-none d-sm-inline-block w-sm-102px w-md-224px aside_height bg-blue">
    <ul id="sidebar-parent" class="text-white">
      <li class="position-relative" v-for="item in menuData" :key="item.name">
        <template v-if="item.childNodes.length > 0">
          <a class="list-item" data-bs-toggle="collapse" :data-bs-target="'#' + item.url">{{ item.name }}</a>
          <template v-if="windowWidth >= 768">
            <div :id="item.url" class="collapse collapse-item" :ref="item.url + '_md'" data-bs-parent="#sidebar-parent">
              <ul class="py-2">
                <li v-for="child in item.childNodes" :key="child.name">
                  <router-link class="list-item" :to="{ path :  '/' + child.url }" @click="closeCollapse()"> {{ child.name }} </router-link>
                </li>
              </ul>
            </div>
          </template>
          <template v-else-if="windowWidth >= 576 && windowWidth <768">
            <div :id="item.url" class="collapse collapse-item" :ref="item.url + '_sm'" data-bs-parent="#sidebar-parent">
              <ul class="py-2">
                <li v-for="child in item.childNodes" :key="child.name">
                  <router-link class="list-item" :to="{ path :  '/' + child.url }" @click="closeCollapse()"> {{ child.name }} </router-link>
                </li>
              </ul>
            </div>
          </template>
        </template>
        <template v-else>
          <router-link class="list-item" :to="{ path : '/' + item.url }" @click="closeCollapse()">{{ item.name }}</router-link>
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
      generic_template_md_ref: '',
      generic_template_sm_ref: '',
      nssi_view_md_ref: '',
      nssi_view_sm_ref: '',
    };
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  methods: {
    closeCollapse() {
      if(this.windowWidth >= 768) {
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