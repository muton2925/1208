<template>
  <div class="container-outer" style="overflow:hidden">
    <containerHeader title="Network Resource Model Template" btnContent="Create NRM Template"></containerHeader>
    <fileTable title="NRM Template List" :tableFile="th_list"></fileTable>

  </div>
  <div class="modal fade" id="create_plugin_Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Create new NRM Template</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body mx-1">
          <form>
            <div class="mb-3">
              <label for="InputFile" class="form-label">Template Name :</label>
              <input type="text" class="form-control" id="InputFile" placeholder="Template Name">
            </div>
            <div class="mb-2">
              <label for="InputFile2" class="form-label">NRM Description :</label>
              <input type="text" class="form-control" id="InputFile2" placeholder="NRM Description">
            </div>
            <div class="mb-2">
              <label for="NFVOName" class="form-label">NFVO Name : </label>
              <select name="NFVOName" id="NFVOName"></select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary text-white">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import fileTable from '../components/global/fileTable.vue'
import containerHeader from '../components/global/containerHeader.vue'
export default {
  components:{
    fileTable
    ,containerHeader
  },
  data() {
    return {
      th_list :['Id', 'Template Name', 'Description', 'Type',	'NFVO',	'NRM Status', 'Update Template',	'Template Download',	'Delete Template']
    }
  }
}
</script>
