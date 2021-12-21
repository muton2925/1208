<template>
  <Table>
    <template v-slot:header>
      Network Service Descriptor Template
    </template>
    <template v-slot:button>
      Create NSD Template
    </template>
    <template v-slot:table>
      NSD Template List
    </template>
    <template v-slot:tr>
      <th v-for="item in th_list" :key="item">{{ item }}</th>
    </template>
  </Table>
  <Modal>
    <template v-slot:header>
      Create new NSD Template
    </template>
    <template v-slot:body>
      <form>
          <div class="mb-3">
            <label for="InputFile" class="form-label">Template Name :</label>
            <input type="text" class="form-control" id="InputFile" placeholder="Template Name">
          </div>
          <div class="mb-2">
            <label for="InputFile2" class="form-label">NSD Description :</label>
            <input type="text" class="form-control" id="InputFile2" placeholder="NSD Description">
          </div>
          <div class="mb-2">
            <label for="NFVOName" class="form-label">NFVO Name : </label>
            <select name="NFVOName" id="NFVOName"></select>
          </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="button" class="btn btn-primary text-white">Create</button>
    </template>
  </Modal>
</template>
<script>
import Modal from '../components/global/modal-create.vue';
import Table from '../components/global/table.vue';
export default {
  components: {
    Modal,
    Table
  },
  data() {
    return {
      th_list :['Id', 'Template Name', 'Description', 'Type',	'NFVO',	'NSD Status', 'VNF List',	'Update Template',	'Template Download',	'Delete Template']
    }
  }
}
</script>
