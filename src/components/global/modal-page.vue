<template>
  <div class="modal fade" id="change_page_Modal" ref="modal_page" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body d-flex align-items-center flex-wrap p-2 p-sm-3">
          <div class="col-12 col-sm d-flex justify-content-center align-items-center py-1">
            <span>switch page</span>
            <input type="text" inputmode="numeric" class="form-control input-custom text-center mx-2" :class="{ 'border-danger' : number_validate }" v-model="pageNumber" @keypress.enter="validate">
            <span>of {{ page }} pages</span>
          </div>
          <button type="button" class="btn btn-primary text-white col col-sm-auto mt-2 mt-sm-0" @click="validate">Go</button>
          <div class="col-12 d-flex justify-content-center align-items-center mt-2 mt-sm-2" :class="{ 'd-none' : !number_validate }">
            <i class="bi bi-exclamation-circle-fill text-danger"></i>
            <small class="text-danger ms-2">請輸入有效整數</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, ref, toRefs, watch } from 'vue';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.js';
export default {
  props: ['allPages'],
  setup(props, { emit }) {
    const {allPages} = toRefs(props);
    const modal_page = ref(null)
    let pageNumber = ref('');
    let modal = ref('');
    let number_validate = ref(false);
    
    const page = computed(()=> allPages.value)
    watch(pageNumber,()=>{number_validate.value = false})
    
    onMounted(()=>{
        modal_page.value.addEventListener('hidden.bs.modal', function () {
          pageNumber.value = '';
          number_validate.value = false;
        });
        modal.value = new Modal(modal_page.value, {});
    })
    const validate = () => {
      let re = /^[0-9]+$/;
      let number = parseInt(pageNumber.value);
      if(!re.test(number) || (number > allPages.value || number <= 0))
        number_validate.value = true;
      if(!number_validate.value) {
        emit('switch', number);
        modal.value.hide();
      }
    }
    return{
      modal_page,
      validate,
      page,
      pageNumber,
      number_validate
    }
  }
}
</script>
<style scoped>
.input-custom {
  width: 65px;
}
</style>