<template>
    <Table>
    <template v-slot:header>
      Network Slice Subnet Template
    </template>
    <template v-slot:button>
      Create NSS Template
    </template>
    <template v-slot:table>
      NSS Template List
    </template>
    <template v-slot:tr>
      <th v-for="item in th_list" :key="item">{{ item }}</th>
    </template>
  </Table>
    <Modal>
    <template v-slot:header>
     Create new NSS Template
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="VNF_Template" class="form-label">VNF Template : </label>
          <select name="VNF_Template" id="VNF_Template"></select>
        </div>
        <div class="mb-2">
          <label for="NSD_Template" class="form-label">NSD Template : </label>
          <select name="NSD_Template" id="NSD_Template"></select>
        </div>
        <div class="mb-2">
          <label for="NRM_Template" class="form-label">NRM Template : </label>
          <select name="NRM_Template" id="NRM_Template"></select>
        </div>
        <div class="mb-2">
          <label for="InputFile2" class="form-label">Description :</label>
          <input type="text" class="form-control" id="InputFile2" placeholder="Description">
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
import Modal from '../components/global/modal.vue';
import Table from '../components/global/table.vue';
export default {
  components: {
    Modal,
    Table
  },
  data() {
    return {
      th_list :['Id', 'Description',    'NFVO',	'NSD Status', 'Template list',	'Allocate NSSI',	'Delete Template']
    }
  }
}
</script>
