<template>
  <Table v-if="status" :column="th_list" :entrie="td_list" :columnSort="columnSort" :columnNumber="columnNumber" @update="updateTableData">
    <template v-slot:header>
      Network Slice Subnet Template
    </template>
    <template v-slot:button>
      Create NSS Template
    </template>
    <template v-slot:table-name>
      NSS Template List
    </template>
    <!-- <template v-slot:table-td>
      <tr v-for="item in filterEntries" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.allocate_nssi }}</td>
        <td>{{ item.deallocate_nssi }}</td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-warning rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" data-bs-toggle="modal" data-bs-target="#update_plugin_Modal" @click="update_plugin_button(item.name)">
            <i class="bi bi-wrench"></i>
          </div>
        </td>
        <td class="w-0">
          <a :href="item.pluginFile">
          <div class="d-flex justify-content-center align-items-center text-white bg-primary rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" >
            <i class="bi bi-arrow-down"></i>
          </div>
          </a>
        </td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-danger rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" data-bs-toggle="modal" data-bs-target="#delete_plugin_Modal" @click="delete_plugin_button(item)">
            <i class="bi bi-trash"></i>
          </div>
        </td>
      </tr>
    </template> -->
  </Table>
  <Modalcreate ref="modalCreate" @remove="removeCreateData">
    <template v-slot:header>
      Create new VNF Template
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile3" class="form-label">VNF Template :</label>
          <select v-model="currentNFVMANO" class="form-select form-select mb-3" :class="{ 'is-invalid' : file_invalidated }" id="InputFile3" aria-label=".form-select example">
            <option selected>請選擇 ...</option>
            <option v-for="item in nfv_mano_list" :key="item" :value="item">{{ item }}</option>
          </select>
          <div class="invalid-feedback">
            請選擇 NFVO
          </div>
        </div>
        <div class="mb-3">
          <label for="InputFile3" class="form-label">VNF Template :</label>
          <select v-model="currentNFVMANO" class="form-select form-select mb-3" :class="{ 'is-invalid' : file_invalidated }" id="InputFile3" aria-label=".form-select example">
            <option selected>請選擇 ...</option>
            <option v-for="item in nfv_mano_list" :key="item" :value="item">{{ item }}</option>
          </select>
          <div class="invalid-feedback">
            請選擇 NFVO
          </div>
        </div>
        <div class="mb-3">
          <label for="InputFile3" class="form-label">VNF Template :</label>
          <select v-model="currentNFVMANO" class="form-select form-select mb-3" :class="{ 'is-invalid' : file_invalidated }" id="InputFile3" aria-label=".form-select example">
            <option selected>請選擇 ...</option>
            <option v-for="item in nfv_mano_list" :key="item" :value="item">{{ item }}</option>
          </select>
          <div class="invalid-feedback">
            請選擇 NFVO
          </div>
        </div>
        <div class="mb-3">
          <label for="InputFile2" class="form-label">VNF Description :</label>
          <input type="text" class="form-control" id="InputFile2" placeholder="NSD Description" v-model="templateDescription">
        </div>
        <div>
          <label for="InputFile3" class="form-label">NFVO Name :</label>
          <select v-model="currentNFVMANO" class="form-select form-select mb-3" :class="{ 'is-invalid' : file_invalidated }" id="InputFile3" aria-label=".form-select example">
            <option selected>請選擇 ...</option>
            <option v-for="item in nfv_mano_list" :key="item" :value="item">{{ item }}</option>
          </select>
          <div class="invalid-feedback">
            請選擇 NFVO
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-primary text-white" @click="create_template_button">Create</button>
    </template>
  </Modalcreate>
</template>
<script>
import Modalcreate from '../components/global/modal-create.vue';
import Table from '../components/global/table.vue';
import {nss_template} from '../assets/js/api'
export default {
  components: {
    Modalcreate,
    Table
  },
  setup(){
   const { nssTemplateList }  =nss_template();
   nssTemplateList().then(res=>{
     console.log(res)
   })
  },
  data() {
    return {
      th_list: [
        { name: "templateId", text: "Id", sort: true, status: 'none' },
        { name: "description", text: "Description", sort: true, status: 'none' },
        { name: "nfvoType", text: "NFVO", sort: true, status: 'none' },
        { name: "operationStatus", text: "NSD Status", sort: true, status: 'none' },
        { name: "update_template", text: "Template list", sort: false, status: 'none' },
        { name: "Template_Download", text: "Allocate NSSI", sort: false, status: 'none' },
        { name: "delete_template", text: "Delete", sort: false, status: 'none' },
      ],
    }
  }
}
</script>
