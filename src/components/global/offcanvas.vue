<template>
  <li>
    <template v-if="childs.length > 0">
      <div class="list-item" data-bs-toggle="collapse" :data-bs-target="'#' + url">
        <i class="me-2" :class="icon"></i>
        {{ title }}
      </div>
      <div :id="url" class="collapse" data-bs-parent="#accordion-basic">
        <ul class="list-ul">
          <li v-for="child in childs" :key="child.name">
            <router-link class="list-item" :to="{ path : '/'+ url + '/' + child.url }"> {{ child.name }} </router-link>
          </li>
        </ul>
      </div>
    </template>
    <template v-else>
      <router-link class="list-item" :to="{ path : '/' + url }">
        <i class="me-2" :class="icon"></i>
        {{ title }}
      </router-link>
    </template>
  </li>
</template>
<script>
export default {
  props: ['title', 'icon', 'url', 'childs'],
  data() {
    return {

    }
  }
}
</script>
<style scoped>
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