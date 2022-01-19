<template>
  <div class="modal fade" id="change_page_Modal" ref="modal_page" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="col d-flex justify-content-center align-items-center py-1">
            <span>Switch to page</span>
            <input type="number" class="form-control input-custom text-center mx-2" :class="{ 'is-invalid' : true }" v-model="pageNumber" @keypress.enter="validate">
            <span>of {{ page }} pages</span>
            <!-- <div class="invalid-feedback">
              檔案不得為空
            </div> -->
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
      pageNumber: null,
      modal: '',
    }
  },
  computed: {
    page() {
      return this.allPages;
    }
  },
  mounted() {
    const th = this; 
    this.$refs.modal_page.addEventListener('hidden.bs.modal', function () {
      th.pageNumber = '';
    });
    this.modal = new Modal(this.$refs.modal_page, {});
  },
  methods: {
    validate() {
        let re = /^[1-9]+$/ ;
        // let y = re.test(this.pageNumber)
        console.log(this.allPages)
      if(re.test(this.pageNumber) && this.pageNumber <=this.allPages) {
        this.$emit('switch', this.pageNumber);
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
input[type=number] {
  -moz-appearance: textfield;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>