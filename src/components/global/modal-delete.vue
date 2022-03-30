<template>
  <div class="modal fade" id="delete_plugin_Modal" ref="modal_delete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <slot name="header"></slot>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body mx-1">
          {{ t('Sure to') }} {{ t('Delete') }} {{ t('this') }} {{ t('File') }} ?
          <!-- 是否刪除此檔案 ? -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ t('Cancel') }}</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="delete_plugin">{{ t('Delete') }}</button>
        </div>
      </div> 
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import { ref, onMounted, defineEmits, defineExpose } from 'vue';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.js';
let modal;
const { t } = useI18n();
const modal_delete = ref(null);
const delete_plugin = () => emit('delete');
const emit = defineEmits(['delete', 'remove']);

onMounted(() => {
  modal = new Modal(modal_delete.value, {});
  modal_delete.value.addEventListener('hidden.bs.modal', () => {
    emit('remove');
  });
});

defineExpose({
  modal,
});
</script>