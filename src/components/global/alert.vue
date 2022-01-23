<template>
  <div :class="['position-fixed alert',[ alertStatus == 1 ? 'alert-success' : 'alert-danger' ], 'alert-custom fade', { 'show' : alertShow }]" role="alert">
    <i :class="[ alertStatus == 1 ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill' ]"></i>
    <span class="ms-2">{{ alertTitle }}</span>
    <hr>
    <p class="mb-0">{{ alertContent }}</p>
  </div>
</template>
<script>
import { ref, computed } from 'vue';  
export default {
  setup() {
    const alertShow = ref(false);
    const alertStatus = ref(null);
    const alertAction = ref(null);
    const alertComponent = ref(null);
    const alertTitle = computed(() => {
      if (alertStatus.value) 
        return `Operates Successfully`;
      else 
        return `Operates UnSuccessfully`;
    });
    const alertContent = computed(() => {
      if (alertStatus.value)
        return `${ alertComponent.value } has been ${ alertAction.value } !`;
      else 
        return `Fail to ${ alertAction.value } the ${ alertComponent.value } !`;
    });
    const alertInfo = async (status, name, action) => {
      alertShow.value = true;
      alertComponent.value = name;
      alertStatus.value = status;
      alertAction.value = action;
      await delay(1500);
      alertShow.value = false;
    };
    const delay = (interval) => {
      return new Promise((resolve) => {
        setTimeout(resolve, interval);
      });
    };
    return {
      alertInfo,
      alertShow,
      alertTitle,
      alertStatus,
      alertContent,
    };
  },
};
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