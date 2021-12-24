<template>
  <div class="modal fade" id="create_plugin_Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <slot name="header"></slot>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">></button>
        </div>
        <div class="modal-body mx-1">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['fileName','fileData'],
  computed: {
    name() {
      return this.fileName;
    },
    file() {
      return this.fileData;
    }
  },
  methods: {
    cancelEvent() {
      this.$emit('remove');
    }
  }
}
</script>