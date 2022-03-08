<template>
  <div class="modal fade" id="update_plugin_Modal" ref="modal_update" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
import { onMounted, ref } from 'vue';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.js';
import { useI18n } from 'vue-i18n';
export default {
  setup(props, { emit }) {
    const { t } = useI18n();
    const modal = ref('');
    const modal_update = ref(null);
    const closeModalEvent = () => modal.value.hide();
    onMounted(() => {
      modal.value = new Modal(modal_update.value, {});
      modal_update.value.addEventListener('hidden.bs.modal', function () {
        emit('remove');
      });
    })
    return {
      t,
      modal_update,
      closeModalEvent,
    }
  },
}
</script>