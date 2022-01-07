<template>
  <div class="position-fixed alert alert-custom fade" :class="[{ 'show' : status }, color]" role="alert">
    <i :class="icon"></i>
    <span class="ms-2">{{ title }}</span>
    <hr>
    <p class="mb-0">{{ content }}</p>
  </div>
</template>
<script>
export default {
  props: ['alertColor','alertIcon','alertTitle','alertContent','alertStatus'],
  computed: {
    color() {
      return this.alertColor;
    },
    icon() {
      return this.alertIcon;
    },
    title() {
      return this.alertTitle;
    },
    content() {
      return this.alertContent;
    },
    status() {
      return this.alertStatus;
    }
  },
}
</script>
<style scoped>
.alert-custom {
  width: 85%;
  top: 80px;
  right: 50%;
  z-index: 999;
  transform: translateX(50%);
}
@media (min-width: 576px) {
  .alert-custom {
    width: auto;
    right: 24px;
    transform: translateX(0%);
  }
}
</style>