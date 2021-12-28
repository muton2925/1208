<template>
  <div class="modal fade" id="update_plugin_Modal" ref="modal_update" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <slot name="header"></slot>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="cancelEvent"></button>
        </div>
        <div class="modal-body mx-1">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cancelEvent">Cancel</button>
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.js';
export default {
  setup() {
    const modal_update = ref(null)
    return{
      modal_update,
    }
  },
  data() {
    return {
      modal: '',
    }
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal_update, {})
  },
  methods: {
    cancelEvent() {
      this.$emit('remove')
    },
    closeModalEvent() {
      this.modal.hide();
    }
  }
}
</script>