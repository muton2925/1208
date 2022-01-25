<template>
  <div class="modal fade" id="create_plugin_Modal" ref="modal_create" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{t('Cancel')}}</button>
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.js';
import { useI18n } from 'vue-i18n';
export default {
  setup() {
    const modal_create = ref(null)
    const { t } = useI18n()
    return{
      modal_create,t
    }
  },
  data() {
    return {
      modal: '',
    }
  },
  mounted() {
    const th = this; 
    this.$refs.modal_create.addEventListener('hidden.bs.modal', function () {
      th.cancelEvent();
    });
    this.modal = new Modal(this.$refs.modal_create, {});
  },
  methods: {
    cancelEvent() {
      this.$emit('remove');
    },
    closeModalEvent() {
      this.modal.hide();
    }
  }
}
</script>