<template>
  <Table :column="th_list" :entrie="td_list" :columnSort="columnSort" :columnNumber="columnNumber" @update="updateTableData" :status="status">
    <template v-slot:header>
      Network Resource Model Template
    </template>
    <template v-slot:button>
      Create NRM Template
    </template>
    <template v-slot:table-name>
      NRM Template List
    </template>
    <template v-slot:table-td>
      <tr v-for="item in filterEntries" :key="item.templateId">
        <td class="tablecell-custom">{{ item.templateId }}</td>
        <td class="tablecell-custom">{{ item.name }}</td>
        <td class="tablecell-custom">{{ item.description }}</td>
        <td class="tablecell-custom">{{ item.templateType }}</td>
        <td class="tablecell-custom">{{ item.nfvoType }}</td>
        <td class="tablecell-custom">{{ item.operationStatus }}</td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-warning rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" data-bs-toggle="modal" data-bs-target="#update_plugin_Modal" @click="update_template_button(item.templateId, item.nfvoType)">
            <i class="bi bi-wrench"></i>
          </div>
        </td>
        <td class="w-0">
          <a :href="item.templateFile" @click="download_template_button(item.templateFile)" class="d-flex justify-content-center align-items-center text-white bg-primary rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px">
            <i class="bi bi-arrow-down"></i>
          </a>
        </td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-danger rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" data-bs-toggle="modal" data-bs-target="#delete_plugin_Modal" @click="delete_template_button(item)">
            <i class="bi bi-trash"></i>
          </div>
        </td>
      </tr>
    </template>
  </Table>
  <Modalcreate ref="modalCreate" @remove="removeCreateData">
    <template v-slot:header>
      Create new NRM Template
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">Template Name :</label>
          <input type="text" class="form-control" :class="{ 'is-invalid' : text_invalidated }" id="InputFile" placeholder="Template Name" v-model="templateName">
          <div class="invalid-feedback">
            <template v-if="repeatName">
              此 Template 名稱已存在
            </template>
            <template v-else>
              Template 名稱不得為空
            </template>
          </div>
        </div>
        <div class="mb-3">
          <label for="InputFile2" class="form-label">NRM Description :</label>
          <input type="text" class="form-control" id="InputFile2" placeholder="Description" v-model="templateDescription">
        </div>
        <div class="mb-2">
          <label for="InputFile3" class="form-label">NFVO Name :</label>
          <select v-model="currentNFVMANO" class="form-select form-select" :class="{ 'is-invalid' : select_invalidated }" id="InputFile3" aria-label=".form-select example">
            <option selected>請選擇 ...</option>
            <option v-for="item in sortNFVMANOList" :key="item.name" :value="item.name">{{ item.name }}</option>
          </select>
          <div class="invalid-feedback">
            請選擇一個 NFVO
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-primary text-white" @click="create_template_modal">Create</button>
    </template>
  </Modalcreate>
  <Modalupdate ref="modalUpdate" @remove="removeUpdateData">
    <template v-slot:header>
      Update NRM Template
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">
            NRM Template ID :
          </label>
          <input type="text" class="form-control" id="InputFile" placeholder="請輸入 Plugin 名稱" v-model="templateId" readonly>
        </div>
        <div class="mb-2">
          <label for="UploadFile2" class="form-label">
            NRM Template File :
          </label>
          <input type="file" class="form-control" :class="{ 'is-invalid' : file_invalidated }" id="UploadFile2" ref="uploadData_update" accept=".zip" @change="update_template_file">
          <div class="invalid-feedback">
            檔案不得為空
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-warning text-white" @click="update_template_modal">Update</button>
    </template>
  </Modalupdate>
  <Modaldelete ref="modalDelete" @delete="delete_template_modal" @remove="removeDeleteData">
    <template v-slot:header>
      Delete NRM Template
    </template>
  </Modaldelete>
  <Alert v-show="alertInfo.alertExist" v-bind="alertInfo"></Alert>
</template>
<script>
import { ref } from 'vue';
import { $array } from 'alga-js';
import { Share } from '../assets/js/api';
import { defineAsyncComponent } from 'vue';
import { GenericTemplate } from '../assets/js/api';
import Table from '../components/global/table.vue';
const { PluginList, TemplateList } = Share();
const { createGenericTemplate, updateGenericTemplate, deleteGenericTemplate } = GenericTemplate();
const Alert = defineAsyncComponent(() => import(/* webpackChunkName: "Alert" */ '../components/global/alert.vue'));
const Modalcreate = defineAsyncComponent(() => import(/* webpackChunkName: "Modalcreate" */ '../components/global/modal-create.vue'));
const Modalupdate = defineAsyncComponent(() => import(/* webpackChunkName: "Modalupdate" */ '../components/global/modal-update.vue'));
const Modaldelete = defineAsyncComponent(() => import(/* webpackChunkName: "Modaldelete" */ '../components/global/modal-delete.vue'));
export default {
  components: {
    Table,
    Alert,
    Modalcreate,
    Modalupdate,
    Modaldelete,
  },
  setup() {
    const modalCreate = ref(null)
    const modalUpdate = ref(null)
    const uploadData_update = ref(null)
    return{
      modalCreate,
      modalUpdate,
      uploadData_update,
    }
  },
  data() {
    return {
      status: false,
      filterEntries: [],
      th_list: [
        { name: "templateId", text: "ID" },
        { name: "name", text: "Template Name" },
        { name: "description", text: "Description" },
        { name: "templateType", text: "Type" },
        { name: "nfvoType", text: "NFVO" },
        { name: "operationStatus", text: "NRM Status" },
        { name: "update_template", text: "Update" },
        { name: "template_Download", text: "Download" },
        { name: "delete_template", text: "Delete" },
      ],
      td_list: [],
      nfv_mano_list: [],
      columnSort: ['templateId','name','description','templateType','nfvoType','operationStatus'],
      columnNumber: 9,
      currentNFVMANO: '請選擇 ...',
      templateId: '',
      templateName: '',
      templateDescription: '',
      templateData: {},
      text_invalidated: false,
      file_invalidated: false,
      select_invalidated: false,
      alertInfo: {
        alertExist: false,
        alertStatus: false,
        alertColor: '',
        alertIcon: '',
        alertTitle: '',
        alertContent: '',
      }
    }
  },
  computed: {
    repeatName() {
      return this.td_list.map(function(e) { return e.name }).includes(this.templateName);
    },
    sortNFVMANOList() {
      return $array.sortBy(this.nfv_mano_list, 'name', 'asc');
    },
  },
  watch: {
    templateName: {
      handler: function() {
        this.text_invalidated = false;
      }
    },
    templateData: {
      handler: function() {
        this.file_invalidated = false;
      }
    },
    currentNFVMANO : {
      handler: function() {
        this.select_invalidated = false;
      }
    },
  },
  async created() {
    try {
      let res = await this.axios.all([this.getTableData(), PluginList()]);
      for(let i of res[1].data) {
        this.nfv_mano_list.push(i);
      }
    }
    catch(err) {
      console.log(err);
    }
    await this.delay(700);
    this.status = true;
  },
  methods: {
    async getTableData() {  // 顯示 Table 資料
      let res = await TemplateList();
      this.td_list = [];
      const array_nrm = res.data.filter(x => x.templateType == 'NRM');
      for(let i of array_nrm){
        this.td_list.push(i);
      }
    },
    delay(interval) { // 計時器
      return new Promise((resolve) => {
        setTimeout(resolve,interval);
      })
    },
    async setAlertData(color,icon,title,content) { // alert 的樣式
      this.alertInfo.alertStatus = false; // 避免重複動作太快
      this.alertInfo.alertExist = false; // 避免重複動作太快
      this.alertInfo.alertColor = color;
      this.alertInfo.alertIcon = icon;
      this.alertInfo.alertTitle = title;
      this.alertInfo.alertContent = content;
      this.alertInfo.alertStatus = true;
      this.alertInfo.alertExist = true;
      await this.delay(1500);
      this.alertInfo.alertStatus = false;
      await this.delay(100);
      this.alertInfo.alertExist = false;
      this.alertInfo.alertColor = '';
      this.alertInfo.alertIcon = '';
      this.alertInfo.alertTitle = '';
      this.alertInfo.alertContent = '';
    },
    updateTableData(val) {  // 每次執行 Table 操作，更新資料 
      this.filterEntries = val;
    },
    removeCreateData() { // 關閉 Create Modal
      this.templateName = '';
      this.templateDescription = '';
      this.currentNFVMANO = '請選擇 ...';
      this.text_invalidated = false;
      this.select_invalidated = false;
    },
    removeUpdateData() { // 關閉 Update Modal
      this.templateId = '';
      this.templateData = {};
      this.currentNFVMANO = '請選擇 ...';
      this.file_invalidated = false;
      this.$refs.uploadData_update.value = null;
    },
    removeDeleteData() { // 關閉 Delete Modal
      this.templateData = {};
    },
    create_template_validate() { // 驗證 Create Modal
      if(this.repeatName || this.templateName == '') {
        this.text_invalidated = true;
      }
      if(this.currentNFVMANO == '請選擇 ...') {
        this.select_invalidated = true;
      }
    },
    async create_template_modal() { // 點擊 Create Modal 內創建按鈕
      this.create_template_validate();
      if(!this.text_invalidated && !this.select_invalidated) {
        let form = new FormData();
        form.append("name", this.templateName);
        form.append("description", this.templateDescription);
        form.append("nfvoType", this.currentNFVMANO);
        form.append("templateType", "NRM");
        try {
          let res = await createGenericTemplate(form);
          this.td_list.push(res.data);
          this.setAlertData('alert-success', 'bi bi-check-circle-fill', 'Operates Successfully', 'NRM Template has been created !');
        }
        catch(err) {
          console.log(err);
          this.setAlertData('alert-danger', 'bi bi-x-circle-fill', 'Operates Unsuccessfully', 'Fail to create the NRM Template !');
        }
        this.$refs.modalCreate.closeModalEvent();
      }
    },
    update_template_file(e) {  // 更新 Update Modal 內檔案
      this.templateData = e.target.files;
    },
    update_template_validate() { // 驗證 Update Modal
      if(this.templateData[0] == null) {
        this.file_invalidated = true;
      } 
    },
    update_template_button(id,type) { // 點擊 Update Modal 按鈕
      this.templateId = id;
      this.currentNFVMANO = type; 
    },
    async update_template_modal() { // 點擊 Update Modal 內更新按鈕
      this.update_template_validate();
      if(!this.file_invalidated) {
        let form = new FormData();
        form.append("nfvoType", this.currentNFVMANO);
        form.append("templateType", "NRM");
        form.append("templateFile", this.templateData[0]);
        try {
          await updateGenericTemplate(this.templateId, form);
          await this.getTableData();
          this.setAlertData('alert-success', 'bi bi-check-circle-fill', 'Operates Successfully', 'NRM Template has been updated !');
        }
        catch(err) {
          console.log(err);
          this.setAlertData('alert-danger', 'bi bi-x-circle-fill', 'Operates Unsuccessfully', 'Fail to update the NRM Template !');
        }
        this.$refs.modalUpdate.closeModalEvent();
      }
    },
    download_template_button(file) { // 點擊 Download Modal 按鈕
      if(file == null)
        this.setAlertData('alert-danger', 'bi bi-x-circle-fill', 'Operates Unsuccessfully', 'Fail to download the NRM Template !');
      else
        this.setAlertData('alert-success', 'bi bi-check-circle-fill', 'Operates Successfully', 'NRM Template has been downloaded !');
    },
    delete_template_button(file) { // 點擊 Delete Modal 按鈕
      this.templateData = file;
    },
    async delete_template_modal() { // 點擊 Delete Modal 內刪除按鈕
      try {
        await deleteGenericTemplate(this.templateData.templateId);
        await this.getTableData();
        this.setAlertData('alert-success', 'bi bi-check-circle-fill', 'Operates Successfully', 'NRM Template has been deleted !');
      }
      catch(err) {
        console.log(err);
        this.setAlertData('alert-danger', 'bi bi-x-circle-fill', 'Operates Unsuccessfully', 'Fail to delete the NRM Template !');
      }
    },
  }
}
</script>