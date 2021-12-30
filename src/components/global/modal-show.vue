<template>
  <div class="modal fade" id="show_plugin_Modal" ref="modal_show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <slot name="header"></slot>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body mx-1">
          <slot name="body"></slot>
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
    const modal_show = ref(null)
    return{
      modal_show,
    }
  },
  data() {
    return {
      modal: '',
    }
  },
  mounted() {
    const th = this; 
    this.$refs.modal_show.addEventListener('hidden.bs.modal', function () {
      th.cancelEvent();
    })
    this.modal = new Modal(this.$refs.modal_show, {})
  },
  methods: {
    cancelEvent() {
      this.$emit('remove');
    },
  }
}
</script>