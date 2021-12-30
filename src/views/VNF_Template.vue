<template>
  <Table  v-if="status" :column="th_list" :entrie="td_list" :columnSort="columnSort" :columnNumber="columnNumber" @update="updateTableData">
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
        <td>
          <div data-bs-toggle="modal" data-bs-target="#show_plugin_Modal" @click="show_template_button(item.templateId,item.content)">
            <i class=" text-white bg-info rounded-circle cursor-pointer bi bi-file-text-fill mx-2" ></i>
            {{ item.templateId }}
          </div>
        </td>
        <td>{{ item.name }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.templateType }}</td>
        <td>{{ item.nfvoType }}</td>
        <td>{{ item.operationStatus }}</td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-warning rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" data-bs-toggle="modal" data-bs-target="#update_plugin_Modal" @click="update_template_button(item.templateId,item.nfvoType)">
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
          <div class="d-flex justify-content-center align-items-center text-white bg-danger rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px"  data-bs-toggle="modal" data-bs-target="#delete_plugin_Modal" @click="delete_template_button(item)">
            <i class="bi bi-trash"></i>
          </div>
        </td>
      </tr>
    </template>
  </Table>
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
          <label for="VnfList" class="form-label">VNF  List :</label>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="item in nfv_list[templateId]" :key="item">{{ item }}</li>
            </ul>
        </div>
      </form>
    </template>
  </Modalshow>
  <Modalcreate ref="modalCreate" @remove="removeCreateData">
    <template v-slot:header>
      Create new VNF Template
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">Template Name :</label>
          <input type="text" class="form-control" id="InputFile" placeholder="Template Name" :class="{ 'is-invalid' : text_invalidated }" v-model="fileName">
          <div class="invalid-feedback">
            <template v-if="repeatName">
              此 Template Name 已存在
            </template>
            <template else>
              請輸入 Template Name
            </template>
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
          <input type="text" class="form-control" id="InputFile" placeholder="請輸入 Plugin 名稱" v-model="fileName" readonly>
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
  <Modaldelete @delete="delete_template_modal" @remove="removeFile">
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
        { name: "templateId", text: "Id List", sort: true, status: 'none' },
        { name: "name", text: "Template Name", sort: true, status: 'none' },
        { name: "description", text: "Description", sort: true, status: 'none' },
        { name: "templateType", text: "Type", sort: true, status: 'none' },
        { name: "nfvoType", text: "NFVO", sort: true, status: 'none' },
        { name: "operationStatus", text: "VNF Status", sort: true, status: 'none' },
        { name: "update_template", text: "Update", sort: false, status: 'none' },
        { name: "Template_Download", text: "Download", sort: false, status: 'none' },
        { name: "delete_template", text: "Delete", sort: false, status: 'none' },
      ],
      td_list:[],
      columnSort:["templateId","name","description","templateType","nfvoType","operationStatus"],
      columnNumber:9,
      nfv_mano_list:[],
      nfv_list:{},
      templateId:"",
      fileName:"",
      nfvoType:"",
      currentNFVMANO: '請選擇 ...',
      templateDescription: '',
      fileData: {},
      text_invalidated: false, //文字是否未通過認證
      file_invalidated: false
    }
  },
  
  created(){
    const { PluginList }  = Share();
    this.getTemplate()
    PluginList().then(res=>{
      for(let i of res.data){
        this.nfv_mano_list.push(i.name);
      }
    })
  },
  computed: {
    isinvalidated() {
      return this.text_invalidated || this.file_invalidated;
    },
    repeatName() {
      return this.td_list.map( function(e) { return e.templateId }).includes(this.fileName);
    }
  },
  watch: {
    fileName: {
      handler: function () {
        if(this.isinvalidated) {
          this.text_invalidated = false;
        }
      }
    },
    fileData: {
      handler: function () {
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
        for (const iterator of VNF) {
          this.td_list.push(iterator)
        }
        this.status=true;
      }).catch(err=>{
        console.log(err)
      })
    },
    updateTableData(val) { //emit
      this.filterEntries = val;
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
    show_template_button(Id,content){
      this.templateId = Id;
      const map = new Map();
      map.set(Id,content)
      for (const value of map) {
        this.nfv_list[value[0]]=[]
        if ( value[1].length == 0){
          const str = "No Upload Virtualized Network Function Template!!"
          this.nfv_list[value[0]].push(str)
        }
        for (const item of value[1]) {
          let tojson = JSON.parse(item.topology_template.replace(/'/g,'"').replace(/:[ ]*False/,":false").replace(/:[ ]*True/,":true"));
          this.nfv_list[value[0]].push(tojson.node_templates.VNF1.properties.descriptor_id)
        }
      }
    },
    removeShowData(){
      
    },
    removeCreateData() {
      this.removeData();
      this.validate_clear();
      this.currentNFVMANO = '請選擇 ...'
      this.templateDescription = ''
    },
    create_validate() {
      if(this.repeatName || this.fileName == '') {
        this.text_invalidated = true;
      }
      if(this.currentNFVMANO == '請選擇 ...') {
        this.file_invalidated = true;
      }
    },
    create_template_button(){
      this.create_validate();
      if(!this.isinvalidated) {
        const { createGenericTemplate } = GenericTemplate();
        let form = new FormData();
        form.append("name", this.fileName);
        form.append("description", this.templateDescription);
        form.append("nfvoType", this.currentNFVMANO);
        form.append("templateType", "VNF");
        createGenericTemplate(form)
        .then(res => {
          this.td_list.push(res.data);
          this.$refs.modalCreate.closeModalEvent();
          this.removeCreateData();
        })
      }
    },
    update_template_file(e) {
      this.fileData = e.target.files;
    },
    update_validate() {
      if(this.fileData[0] == null) {
        this.file_invalidated = true;
      } 
    },
    update_template_button(name,nfvo) {
      this.fileName = name;
      this.nfvoType = nfvo;
    },
    update_template_modal() {
      this.update_validate();
      if(this.isinvalidated == false) {
        const { updateGenericTemplate } = GenericTemplate();
        let form = new FormData();
        form.append("nfvoType", this.nfvoType);
        form.append("templateType", "VNF");
        form.append("templateFile", this.fileData[0]);
        updateGenericTemplate(this.fileName,form)
        .then(() => {
          this.$refs.modalUpdate.closeModalEvent();
          this.removeUpdateData();
          this.getTemplate()
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
    delete_template_button(file) {
      this.fileData = file;
    },
    delete_template_modal() { // emit
      const { deleteGenericTemplate } = GenericTemplate()
      deleteGenericTemplate(this.fileData.templateId).then(()=>{
        this.getTemplate();
      })
      .catch(res => {
        console.log(res)
      })
    }
  }
}
</script>