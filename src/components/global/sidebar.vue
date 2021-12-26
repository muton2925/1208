<template>
  <aside class="d-inline-block w-0 w-sm-102px w-md-224px aside_height bg-blue">
    <ul id="sidebar-parent" class="text-white">
      <li class="position-relative" v-for="item in menuData" :key="item.name">
        <template v-if="item.childNodes.length > 0">
          <a class="list-item" data-bs-toggle="collapse" :data-bs-target="'#' + item.url">{{ item.name }}</a>
          <div :id="item.url" class="collapse collapse-item" :ref="item.url" data-bs-parent="#sidebar-parent">
              <ul class="py-2">
                <li v-for="child in item.childNodes" :key="child.name">
                  <router-link class="list-item" :to="{ path :  '/' + child.url }"> {{ child.name }} </router-link>
                </li>
              </ul>
          </div>
        </template>
        <template v-else>
          <router-link class="list-item" :to="{ path : '/' + item.url }">{{ item.name }}</router-link>
        </template>
      </li>
    </ul>
  </aside>
</template>
<script>
export default {
  props: ['menuData'],
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
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