<template>
  <div class="modal fade" id="delete_plugin_Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <slot name="header"></slot>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="cancelEvent"></button>
        </div>
        <div class="modal-body mx-1">
          是否刪除此檔案 ?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cancelEvent">Cancel</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="delete_plugin">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    cancelEvent() {
      this.$emit('remove');
    },
    delete_plugin() {
      this.$emit('delete')
    }
  }
}
</script>