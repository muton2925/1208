<template>
  <Table  v-if="status" :column="th_list" :entrie="td_list" :columnSort="columnSort" :columnNumber="columnNumber" @update="updateData">
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
      <tr v-for="item in filterEntries" :key="item.name">
        <td><i class=" text-white bg-info rounded-circle cursor-pointer bi bi-file-text-fill mx-2"></i>{{ item.templateId }}
        </td>
        <td>{{ item.name }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.templateType }}</td>
        <td>{{ item.nfvoType }}</td>
        <td>{{ item.operationStatus }}</td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-warning rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" data-bs-toggle="modal" data-bs-target="#update_plugin_Modal" @click="update_Template(item.templateId,item.nfvoType)">
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
          <div class="d-flex justify-content-center align-items-center text-white bg-danger rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px"  data-bs-toggle="modal" data-bs-target="#delete_plugin_Modal" @click="delete_template(item)">
            <i class="bi bi-trash"></i>
          </div>
        </td>
      </tr>
    </template>
  </Table>
  <Modalcreate>
    <template v-slot:header>
      Create new VNF Template
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">Template Name :</label>
          <input type="text" class="form-control" :class="{ 'is-invalid' : text_invalidated }" id="InputFile" placeholder="Template Name" v-model="fileName">
          <div class="invalid-feedback">
            <!-- <template v-if="repeatName">
              此 Plugin 名稱已存在
            </template>
            <template v-else>
              Plugin 名稱不得為空
            </template> -->
            <template v-if="!repeatName">
              Plugin 名稱不得為空
            </template>
          </div>
        </div>
        <div class="mb-2">
          <label for="InputFile2" class="form-label">VNF Description :</label>
          <input type="text" class="form-control" id="InputFile2" placeholder="VNF Description">
        </div>
        <div class="mb-2">
          <label for="NFVOName" class="form-label">NFVO Name :</label>
          <select v-model="NFVOName" name="NFVOName" id="NFVOName" :class="{ 'is-invalid' : file_invalidated }">
            <option v-for="item in NFVO_list" :value="item" :key="item">{{item}}</option>
          </select>
          <div class="invalid-feedback">
            檔案不得為空
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-primary text-white" @click="create_template">Create</button>
    </template>
  </Modalcreate>
  <Modalupdate ref="modalUpdate" @remove="removeUpdateData">
    <template v-slot:header>
      Update Service Mapping Plugin
    </template>
    <template v-slot:body>
      <form :class="{ 'was-invalidated': isinvalidated }">
        <div class="mb-3">
          <label for="InputFile" class="form-label">
             VNF Template ID :
          </label>
          <input type="text" class="form-control" id="InputFile" placeholder="請輸入 Plugin 名稱" v-model="fileName" readonly>
        </div>
        <div class="mb-2">
          <label for="UploadFile2" class="form-label">
             VNF Template File :
          </label>
          <input type="file" class="form-control" :class="{ 'is-invalid' : file_invalidated }" id="UploadFile2" ref="uploadData_update" accept=".zip" @change="add_Template">
          <div class="invalid-feedback">
            檔案不得為空
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-warning text-white" @click="update_Template_modal">Update</button>
    </template>
  </Modalupdate>
  <Modaldelete @delete="deleteData" @remove="removeFile">

  </Modaldelete>
</template>
<script>
import Modalcreate from '../components/global/modal-create.vue';
import Modalupdate from '../components/global/modal-update.vue';
import Modaldelete from '../components/global/modal-delete.vue';
import { $array } from 'alga-js';
import Table from '../components/global/table.vue';
import { ref } from 'vue';
import {Share,GenericTemplate} from '../assets/js/api'
export default {
  components: {
    Modalcreate,
    Modalupdate,
    Modaldelete,
    Table
  },
  setup() {
  const modalCreate = ref(null)
  const modalUpdate = ref(null)
  const uploadData_create = ref(null)
  const uploadData_update = ref(null)
  return{
    modalCreate,modalUpdate,uploadData_update,uploadData_create,
  }
  },
  data() {
    return {
      filterEntries:[],
      status:false,
       th_list: [
        { name: "idList", text: "Id List", sort: true, status: 'none' },
        { name: "name", text: "Template Name", sort: true, status: 'none' },
        { name: "Description", text: "Description", sort: true, status: 'none' },
        { name: "Type", text: "Type", sort: true, status: 'none' },
        { name: "NFVO", text: "NFVO", sort: true, status: 'none' },
        { name: "VNF_Status", text: "VNF Status", sort: true, status: 'none' },
        { name: "update_template", text: "Update Template", sort: false, status: 'none' },
        { name: "Template_Download", text: "Template Download", sort: false, status: 'none' },
        { name: "delete_template", text: "Delete Template", sort: false, status: 'none' },
      ],
      td_list:[],
      columnSort:["idList","name","Description","Type","NFVO","VNF_Status"],
      columnNumber:9,
      NFVO_list:[],
      fileName:"",
      nfvoType:"",
      NFVOName:"select a NFVO",
      fileData: {},
      text_invalidated: false, //文字是否未通過認證
      file_invalidated: false
    }
  },
  
  created(){
    const {PluginList}  = Share();
    this.getTemplate()
    PluginList().then(res=>{
      for (const idx in res.data) {
        this.NFVO_list.push(res.data[idx].name)
      }
    })
  },
  computed: {
    isinvalidated() {
      return this.text_invalidated || this.file_invalidated;
    },
    repeatName() {
      return this.td_list.map(function(e) { return e.templateId }).includes(this.fileName);
    }
  },
  watch: {
    fileName: {
      handler: function() {
        if(this.isinvalidated) {
          this.text_invalidated = false;
        }
      }
    },
    fileData: {
      handler: function() {
        if(this.isinvalidated) {
          this.file_invalidated = false;
        }
      }
    }
  },
  methods:{
    getTemplate(){
      const {TemplateList}  = Share();
      this.td_list=[];
      TemplateList().then(res=>{
        const VNF = res.data.filter(x=>x.templateType == 'VNF')
        VNF.forEach(element => {
          this.td_list.push(element)
        });
         this.status=true;
      }).catch(err=>{
        console.log(err)
      })
    },
    validate_clear() {
      this.text_invalidated = false;
      this.file_invalidated = false;
    },
    removeFile() {
      this.fileData = {};
    },
    removeData() {
      this.fileName = '';
      this.fileData = {};
    },
    updateData(val) {
      this.filterEntries = val;
    },
    create_validate() {
      if(this.repeatName || this.fileName == '') {
        this.text_invalidated = true;
      }
      // if(this.fileData[0] == null) {
      //   this.file_invalidated = true;
      // }
    },
    create_template(){

    },
    add_Template(e) {
      this.fileData = e.target.files;
    },
    update_validate() {
      if(this.fileData[0] == null) {
        this.file_invalidated = true;
      } 
    },
    update_Template(name,nfvo) {
      this.fileName = name;
      this.nfvoType = nfvo;
    },
    update_Template_modal() {
      this.update_validate();
      if(this.isinvalidated == false) {
        const { updateGenericTemplate } = GenericTemplate();
        let form = new FormData();
        form.append("nfvoType", this.nfvoType);
        form.append("templateType", "VNF");
        form.append("templateFile", this.fileData[0]);
        updateGenericTemplate(this.fileName,form)
        .then(() => {
          this.getTemplate()
          this.$refs.modalUpdate.closeModalEvent();
          this.removeUpdateData();
        })
        .catch(res => {
          console.log(res);
          this.removeUpdateData();
        })
      }
    },
    removeUpdateData() {
      this.removeData();
      this.validate_clear();
      this.$refs.uploadData_update.value = null;
    },
    delete_template(file) {
      this.fileData = file;
    },
    deleteData() { // emit
      const {deleteGenericTemplate}=GenericTemplate()
      deleteGenericTemplate(this.fileData.templateId).then(()=>{
        let index = this.td_list.indexOf(this.fileData);
        this.td_list = $array.destroy(this.td_list, index);
        this.removeFile();
      })
      .catch(res => {
        console.log(res)
        this.removeFile();
      })
    }
  }
}
</script>