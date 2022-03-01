<template>
  <div class="dashboard-container">
    <button @click="pl">123</button>
    <audio controls loops>
      <source src="../assets/Rubia.mp3" />
      Your browser does not support the
      <code>audio</code> element.
    </audio>
    <div>{{a}}</div>
  </div>
</template>
<script>
import { onMounted } from 'vue';
import { variables, get } from '@/assets/js/composition-api2.js';
export default {
  setup() {
    const { template_list,a } = variables();
    const { getNssTemplateData, pl } = get();
    onMounted(async ()=> {
      await getNssTemplateData();
      console.log(template_list.value)
      console.log(a.value)
    });
    return {
      pl,a
    }
  }
}
</script>
<style>
.dashboard-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px);
}
</style>