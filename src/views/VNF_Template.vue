<template>
  <Table v-if="status" :column="th_list" :entrie="td_list" :columnSort="columnSort" :columnNumber="columnNumber" @update="updateTableData">
    <template v-slot:header>
      Virtualized Network Function Template
    </template>
    <template v-slot:button>
      Create VNF Template
    </template>
    <template v-slot:table-name>
      VNF Template List
    </template>
    <template v-slot:table-td>
      <tr v-for="item in filterEntries" :key="item.templateId">
        <td  class="tablecell-custom">
          <i class="bi bi-list cursor-pointer me-1" data-bs-toggle="modal" data-bs-target="#show_plugin_Modal" @click="show_template_button(item.templateId,item.content)"></i>
          {{ item.templateId }}
        </td>
        <td class="tablecell-custom">{{ item.name }}</td>
        <td class="tablecell-custom">{{ item.description }}</td>
        <td class="tablecell-custom">{{ item.templateType }}</td>
        <td class="tablecell-custom">{{ item.nfvoType }}</td>
        <td class="tablecell-custom">{{ item.operationStatus }}</td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-warning rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" data-bs-toggle="modal" data-bs-target="#update_plugin_Modal" @click="update_template_button(item.templateId,item.nfvoType)">
            <i class="bi bi-wrench"></i>
          </div>
        </td>
        <td class="w-0">
          <a :href="item.templateFile" @click="download_template_button(item.templateFile)">
            <div class="d-flex justify-content-center align-items-center text-white bg-primary rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px">
              <i class="bi bi-arrow-down"></i>
            </div>
          </a>
        </td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-danger rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px"  data-bs-toggle="modal" data-bs-target="#delete_plugin_Modal" @click="delete_template_button(item)">
            <i class="bi bi-trash"></i>
          </div>
        </td>
      </tr>
    </template>
  </Table>
  <Modalcreate ref="modalCreate" @remove="removeCreateData">
    <template v-slot:header>
      Create new VNF Template
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
          <label for="InputFile2" class="form-label">VNF Description :</label>
          <input type="text" class="form-control" id="InputFile2" placeholder="Description" v-model="templateDescription">
        </div>
        <div>
          <label for="InputFile3" class="form-label">NFVO Name :</label>
          <select v-model="currentNFVMANO" class="form-select form-select mb-3" :class="{ 'is-invalid' : select_invalidated }" id="InputFile3" aria-label=".form-select example">
            <option selected>請選擇 ...</option>
            <option v-for="item in nfv_mano_list" :key="item" :value="item">{{ item }}</option>
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
  <Modalshow ref="modalShow" @remove="removeShowData">
    <template v-slot:header>
      VNF List
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">VNF Template ID :</label>
          <input type="text" class="form-control" id="InputFile" placeholder="請輸入 Plugin 名稱" v-model="templateId" readonly>
        </div>
        <div class="mb-3">
          <label for="VnfList" class="form-label">VNF ID List :</label>
          <ul class="list-group list-group-flush">
              <li class="list-group-item" v-for="item in templateVNFList[templateId]" :key="item">{{ item }}</li>
          </ul>
        </div>
      </form>
    </template>
  </Modalshow>
  <Modalupdate ref="modalUpdate" @remove="removeUpdateData">
    <template v-slot:header>
      Update Service Mapping Plugin
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">
             VNF Template ID :
          </label>
          <input type="text" class="form-control" id="InputFile" placeholder="請輸入 Plugin 名稱" v-model="templateId" readonly>
        </div>
        <div class="mb-2">
          <label for="UploadFile2" class="form-label">
             VNF Template File :
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
  <Modaldelete @delete="delete_template_modal" @remove="removeDeleteData">
    <template v-slot:header>
      Delete VNF Template
    </template>
  </Modaldelete>
</template>
<script>
import Modalcreate from '../components/global/modal-create.vue';
import Modalupdate from '../components/global/modal-update.vue';
import Modaldelete from '../components/global/modal-delete.vue';
import Modalshow from '../components/global/modal-show.vue';
import Table from '../components/global/table.vue';
import { ref } from 'vue';
import {Share,GenericTemplate} from '../assets/js/api'
export default {
  components: {
    Modalcreate,
    Modalupdate,
    Modaldelete,
    Modalshow,
    Table
  },
  setup() {
    const modalCreate = ref(null)
    const modalUpdate = ref(null)
    const uploadData_update = ref(null)
    return{
      modalCreate,modalUpdate,uploadData_update
    }
  },
  data() {
    return {
      status: false,
      filterEntries: [],
       th_list: [
        { name: "templateId", text: "ID List", sort: true, status: 'none' },
        { name: "name", text: "Template Name", sort: true, status: 'none' },
        { name: "description", text: "Description", sort: true, status: 'none' },
        { name: "templateType", text: "Type", sort: true, status: 'none' },
        { name: "nfvoType", text: "NFVO", sort: true, status: 'none' },
        { name: "operationStatus", text: "VNF Status", sort: true, status: 'none' },
        { name: "update_template", text: "Update", sort: false, status: 'none' },
        { name: "Template_Download", text: "Download", sort: false, status: 'none' },
        { name: "delete_template", text: "Delete", sort: false, status: 'none' },
      ],
      td_list: [],
      nfv_mano_list: [],
      columnSort: ["templateId","name","description","templateType","nfvoType","operationStatus"],
      columnNumber: 9,
      currentNFVMANO: '請選擇 ...',
      templateId: '',
      templateName: '',
      templateDescription: '',
      templateData: {},
      templateVNFList: {},
      text_invalidated: false, //文字是否未通過認證
      file_invalidated: false,
      select_invalidated: false,
    }
  },
  computed: {
    repeatName() {
      return this.td_list.map(function(e) { return e.name }).includes(this.templateName);
    }
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
    const { PluginList } = Share();
    await this.getTemplate();
    PluginList()
    .then(res => {
      for(let i of res.data) {
        this.nfv_mano_list.push(i.name);
      }
    })
    .catch(res => {
      console.log(res)
    })
    this.status = true;
  },
  methods:{
    async getTemplate() { // 顯示 Table 資料
      const { TemplateList }  = Share();
      this.td_list = [];
      TemplateList()
      .then(res => {
        const VNF = res.data.filter(x => x.templateType == 'VNF');
        for (const iterator of VNF) {
          this.td_list.push(iterator)
        }
        this.status = true;
      })
      .catch(res => {
        console.log(res)
      })
    },
    updateTableData(val) { // 每次執行 Table 操作，更新資料 
      this.filterEntries = val;
    },
    removeCreateData() { // 關閉 Create Modal
      this.templateName = '';
      this.templateDescription = '';
      this.currentNFVMANO = '請選擇 ...';
      this.text_invalidated = false;
      this.select_invalidated = false;
    },
    removeShowData() { // 關閉 Show Modal
      this.templateId = '';
      this.templateVNFList = {};
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
    show_template_button(id,content) { // 點擊 Show Modal 按鈕
      this.templateId = id;
      const map = new Map();
      map.set(id,content);
      for (const value of map) {
        this.templateVNFList[value[0]] = [];
        if (value[1].length == 0) {
          const str = "No Upload Virtualized Network Function Template!!";
          this.templateVNFList[value[0]].push(str);
        }
        for (const item of value[1]) {
          let tojson = JSON.parse(item.topology_template.replace(/'/g,'"').replace(/:[ ]*False/,":false").replace(/:[ ]*True/,":true"));
          this.templateVNFList[value[0]].push(tojson.node_templates.VNF1.properties.descriptor_id);
        }
      }
    },
    create_template_validate() { // 驗證 Create Modal
      if(this.repeatName || this.templateName == '') {
        this.text_invalidated = true;
      }
      if(this.currentNFVMANO == '請選擇 ...') {
        this.select_invalidated = true;
      }
    },
    create_template_modal() { // 點擊 Create Modal 內創建按鈕
      this.create_template_validate();
      const { createGenericTemplate } = GenericTemplate();
      if(!this.text_invalidated && !this.select_invalidated) {
        let form = new FormData();
        form.append("name", this.templateName);
        form.append("description", this.templateDescription);
        form.append("nfvoType", this.currentNFVMANO);
        form.append("templateType", "VNF");
        createGenericTemplate(form)
        .then(res => {
          this.$refs.modalCreate.closeModalEvent();
          this.td_list.push(res.data);
        })
        .catch(res => {
          console.log(res)
        })
      }
    },
    update_template_file(e) { // 更新 Update Modal 內檔案
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
    update_template_modal() { // 點擊 Update Modal 內更新按鈕
      this.update_template_validate();
      if(!this.file_invalidated) {
        const { updateGenericTemplate } = GenericTemplate();
        let form = new FormData();
        form.append("nfvoType", this.currentNFVMANO);
        form.append("templateType", "VNF");
        form.append("templateFile", this.templateData[0]);
        updateGenericTemplate(this.templateId, form)
        .then(() => {
          this.$refs.modalUpdate.closeModalEvent();
          this.getTemplate();
        })
        .catch(res => {
          console.log(res);
        })
      }
    },
    download_template_button(file) { // 點擊 Download Modal 按鈕
      if(file == null) {
        alert('未上傳 VNF Template File，無法下載');
      }
    },
    delete_template_button(file) { // 點擊 Delete Modal 按鈕
      this.templateData = file;
    },
    delete_template_modal() { // 點擊 Delete Modal 內刪除按鈕
      const { deleteGenericTemplate } = GenericTemplate()
      deleteGenericTemplate(this.templateData.templateId)
      .then(() => {
        this.getTemplate();
      })
      .catch(res => {
        console.log(res)
      })
    }
  }
}
</script>