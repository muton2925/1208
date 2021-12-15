<template>
  <Table>
    <template v-slot:header>
      NFV MANO Plugin
    </template>
    <template v-slot:button>
      Create Plugin
    </template>
    <template v-slot:table>
      NFV MANO Plugin List
    </template>
    <template v-slot:tr>
      <th v-for="item in th_list" :key="item">{{ item }}</th>
    </template>
  </Table>
  <Modal>
    <template v-slot:header>
      Create new NFV MANO Plugin
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">Plugin Name</label>
          <input type="text" class="form-control" id="InputFile" placeholder="請輸入 Plugin 名稱">
        </div>
        <div class="mb-2">
          <label for="UploadFile" class="form-label">Plugin File</label>
          <input type="file" class="form-control" id="UploadFile">
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
      th_list :['Plugin Name', 'Allocate NSSI File', 'Deallocate NSSI File', 'Update Plugin', 'Plugin File', 'Delete Plugin']
    }
  },
  mounted() {
    
  }
}
</script>
