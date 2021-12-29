<template>
  <Table v-if="status" :column="th_list" :entrie="td_list" :columnSort="columnSort" :columnNumber="columnNumber" @update="updateData">
    <template v-slot:header>
      Network Service Descriptor Template
    </template>
    <template v-slot:button>
      Create NSD Template
    </template>
    <template v-slot:table-name>
      NSD Template List
    </template>
    <template v-slot:table-td>
      <tr v-for="item in filterEntries" :key="item.id">
        <td class="nsd_id">{{ item.templateId }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.templateType }}</td>
        <td>{{ item.nfvoType }}</td>
        <td>{{ item.operationStatus }}</td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-info rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" >
            <i class="bi bi-file-text-fill"></i>
          </div>
        </td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-warning rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" data-bs-toggle="modal" data-bs-target="#update_plugin_Modal" @click="update_template(item.templateId, item.nfvoType)">
            <i class="bi bi-wrench"></i>
          </div>
        </td>
        <td class="w-0">
          <a :href="item.templateFile">
            <div class="d-flex justify-content-center align-items-center text-white bg-primary rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px">
              <i class="bi bi-arrow-down"></i>
            </div>
          </a>
        </td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-danger rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" data-bs-toggle="modal" data-bs-target="#delete_plugin_Modal" @click="delete_template(item)">
            <i class="bi bi-trash"></i>
          </div>
        </td>
      </tr>
    </template>
  </Table>
  <Modalcreate ref="modalCreate">
    <template v-slot:header>
      Create new NSD Template
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">Template Name :</label>
          <input type="text" class="form-control" id="InputFile" placeholder="Template Name" v-model="templateName">
        </div>
        <div class="mb-3">
          <label for="InputFile2" class="form-label">NSD Description :</label>
          <input type="text" class="form-control" id="InputFile2" placeholder="NSD Description" v-model="templateDescription">
        </div>
        <div>
          <label for="InputFile3" class="form-label">NFVO Name :</label>
          <select v-model="currentNFVMANO" class="form-select form-select mb-3" id="InputFile3" aria-label=".form-select example">
            <option selected>請選擇 ...</option>
            <option v-for="item in nfv_mano_list" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-primary text-white" @click="create_template">Create</button>
    </template>
  </Modalcreate>
  <Modalupdate ref="modalUpdate">
    <template v-slot:header>
      Update NSD Template
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">
            NSD Template ID :
          </label>
          <input type="text" class="form-control" id="InputFile" placeholder="請輸入 Plugin 名稱" v-model="templateId" readonly>
        </div>
        <div class="mb-2">
          <label for="UploadFile2" class="form-label">
            NSD Template File :
          </label>
          <input type="file" class="form-control" id="UploadFile2" ref="uploadData_update" accept=".zip" @change="add_template">
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-warning text-white" @click="update_template_modal">Update</button>
    </template>
  </Modalupdate>
  <Modaldelete @delete="deleteData">
    <template v-slot:header>
      Delete NSD Template
    </template>
  </Modaldelete>
</template>
<script>
import Modalcreate from '../components/global/modal-create.vue';
import Modalupdate from '../components/global/modal-update.vue';
import Modaldelete from '../components/global/modal-delete.vue';
import Table from '../components/global/table.vue';
import { $array } from 'alga-js';
import { Share } from '../assets/js/api';
import { GenericTemplate } from '../assets/js/api';
export default {
  components: {
    Modalcreate,
    Modalupdate,
    Modaldelete,
    Table
  },
  data() {
    return {
      status: false,
      filterEntries: [],
      th_list: [
        { name: "id", text: "Id", sort: true, status: 'none' },
        { name: "name", text: "Template Name", sort: true, status: 'none' },
        { name: "description", text: "Description", sort: true, status: 'none' },
        { name: "type", text: "Type", sort: true, status: 'none' },
        { name: "nfvo", text: "NFVO", sort: true, status: 'none' },
        { name: "nsd_status", text: "NSD Status", sort: true, status: 'none' },
        { name: "vnf_list", text: "VNF List", sort: false, status: 'none' },
        { name: "update_template", text: "Update", sort: false, status: 'none' },
        { name: "template_Download", text: "Download", sort: false, status: 'none' },
        { name: "delete_template", text: "Delete", sort: false, status: 'none' },
      ],
      td_list:[],
      nfv_mano_list: [],
      columnSort: ['id','name','description','type','nfvo','nsd_status'],
      columnNumber: 10,
      currentNFVMANO: '請選擇 ...',
      templateId: '',
      templateName: '',
      templateDescription: '',
      templateData: {},
    }
  },
  async created(){
    await this.getTableData();
    const { PluginList }  = Share();
    PluginList()
    .then(res => {
      for(let i of res.data){
        this.nfv_mano_list.push(i.name);
      }
    });
    this.status = true;
  },
  methods:{
    async getTableData() {
      const { TemplateList }  = Share();
      TemplateList()
      .then(res => {
        console.log(res)
        this.td_list = [];
        const array_nsd = res.data.filter(x => x.templateType == 'NSD');
        for(let i of array_nsd){
          this.td_list.push(i);
        }
      });
    },
    updateData(val) {  // emit
      this.filterEntries = val;
    },
    deleteData() {
      const { deleteGenericTemplate } = GenericTemplate();
      deleteGenericTemplate(this.templateData.templateId)
      .then(() => {
        let index = this.td_list.indexOf(this.templateData);
        this.td_list = $array.destroy(this.td_list, index);
      })
    },
    delete_template(file) {
      this.templateData = file;
    },
    create_template() {
      const { createGenericTemplate } = GenericTemplate();
      let form = new FormData();
      form.append("name", this.templateName);
      form.append("description", this.templateDescription);
      form.append("nfvoType", this.currentNFVMANO);
      form.append("templateType", "NSD");
      createGenericTemplate(form)
      .then(res => {
        this.td_list.push(res.data);
      })
    },
    add_template(e) {
      this.templateData = e.target.files;
    },
    update_template(id,type) {
      this.templateId = id;
      this.currentNFVMANO = type; 
    },
    update_template_modal() {
      const { updateGenericTemplate } = GenericTemplate();
      let form = new FormData();
      form.append("nfvoType", this.currentNFVMANO);
      form.append("templateType", "NSD");
      form.append("templateFile", this.templateData[0]);
      console.log(this.currentNFVMANO)
      console.log(this.templateData[0])
      updateGenericTemplate(this.templateId,form)
      .then(() => {
        this.getTableData();
      })
    }
  }
}
</script>
<style scoped>
.nsd_id {
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
