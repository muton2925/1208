<template>
  <div class="modal fade" id="create_plugin_Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary text-white" @click="create_plugin">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { nfv_mano_plugin } from '../../assets/js/api';
export default {
  props:['create_plugin_name','create_plugin_file1'],
  data() {
    return {
      plugin_name: this.create_plugin_name,
      plugin_file1: this.create_plugin_file1
    }
  },
  methods: {
    create_plugin() {
      console.log(this.create_plugin_name)
      console.log(this.create_plugin_file1)
      var form = new FormData();
      form.append("name", this.create_plugin_name);
      form.append("pluginFile", this.create_plugin_file1[0]);
      const { createPluginList } = nfv_mano_plugin();
      createPluginList(form)
      .then(res => console.log(res))
      .catch(res => console.log(res))
    }
  }
}
</script>