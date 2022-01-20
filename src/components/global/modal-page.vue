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
import { ref } from 'vue';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.js';
export default {
  props: ['allPages'],
  setup() {
    const modal_page = ref(null)
    return{
      modal_page,
    }
  },
  data() {
    return {
      pageNumber: '',
      modal: '',
      number_validate: false,
    }
  },
  computed: {
    page() {
      return this.allPages;
    }
  },
  watch: {
    pageNumber() {
      this.number_validate = false;
    }
  },
  mounted() {
    const th = this; 
    this.$refs.modal_page.addEventListener('hidden.bs.modal', function () {
      th.pageNumber = '';
      th.number_validate = false;
    });
    this.modal = new Modal(this.$refs.modal_page, {});
  },
  methods: {
    validate() {
      let re = /^[0-9]+$/;
      let number = parseInt(this.pageNumber);
      if(!re.test(number) || (number > this.allPages || number <= 0))
        this.number_validate = true;
      if(!this.number_validate) {
        this.$emit('switch', number);
        this.modal.hide();
      }
    }
  },
}
</script>
<style scoped>
.input-custom {
  width: 65px;
}
</style>