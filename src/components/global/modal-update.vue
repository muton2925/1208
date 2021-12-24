<template>
  <div class="modal fade" id="update_plugin_Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <slot name="header"></slot>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="cancelEvent"></button>
        </div>
        <div class="modal-body mx-1">
          <form>
            <div class="mb-3">
              <label for="InputFile" class="form-label">
                <slot name="plugin-name"></slot>
              </label>
              <input type="text" class="form-control" id="InputFile" placeholder="請輸入 Plugin 名稱" v-model="plugin_name" readonly>
            </div>
            <div class="mb-2">
              <label for="UploadFile" class="form-label">
                <slot name="plugin-file"></slot>
              </label>
              <slot name="upload-file"></slot>
            </div>
          </form>
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
export default {
  props: ['fileName'],
  // data() {
  //   return {
  //     fileData: {},
  //   }
  // },
  computed: {
    plugin_name() {
      return this.fileName
    }
  },
  methods: {
    cancelEvent() {
      this.$emit('remove')
    },
    // add_plugin(e) {
    //   this.fileData = e.target.files[0];
    // }
  }
}
</script>