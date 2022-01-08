<template>
  <Table :column="th_list" :entrie="td_list" :columnSort="columnSort" :columnNumber="columnNumber" @update="updateTableData" :status="status">
    <template v-slot:header>
      Network Slice Subnet Template
    </template>
    <template v-slot:button>
      Create NSS Template
    </template>
    <template v-slot:table-name>
      NSS Template List
    </template>
    <template v-slot:table-td>
      <tr v-for="item in filterEntries" :key="item.templateId">
        <td class="tablecell-custom">{{ item.templateId }}</td>
        <td class="tablecell-custom">{{ item.description }}</td>
        <td class="tablecell-custom">{{ item.nfvoType }}</td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-info rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" data-bs-toggle="modal" data-bs-target="#show_plugin_Modal" @click="show_template_button(item)">
            <i class="bi bi-file-text-fill"></i>
          </div>
        </td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-primary rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" @click="allocate_template_button(item)">
            <i class="bi bi-gear-fill"></i>
          </div>
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
      Create new NSS Template
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="select1" class="form-label">VNF Template :</label>
          <select v-model="currentVNF" class="form-select form-select" :class="{ 'is-invalid' : select_vnf_invalidated }" id="select1" aria-label=".form-select example">
            <option selected>請選擇 ...</option>
            <option v-for="item in templateVNFList" :key="item.templateId" :value="item.templateId">{{ item.name }}</option>
          </select>
          <div class="mt-2" v-if="currentVNF != '請選擇 ...'">
            <div>VNF ID : {{ currentVNF }}</div>
            <div>VNF Description : {{ currentVNFDescription }}</div>
          </div>
          <div class="invalid-feedback">
            請選擇一個 VNF Template
          </div>
        </div>
        <div class="mb-3">
          <label for="select2" class="form-label">NSD Template :</label>
          <select v-model="currentNSD" class="form-select form-select" :class="{ 'is-invalid' : select_nsd_invalidated }" id="select2" aria-label=".form-select example">
            <option selected>請選擇 ...</option>
            <option v-for="item in templateNSDList" :key="item.templateId" :value="item.templateId">{{ item.name }}</option>
          </select>
          <div class="mt-2" v-if="currentNSD != '請選擇 ...'">
            <div>NSD ID : {{ currentNSD }}</div>
            <div>NSD Description : {{ currentNSDDescription }}</div>
          </div>
          <div class="invalid-feedback">
            請選擇一個 NSD Template
          </div>
        </div>
        <div class="mb-3">
          <label for="select3" class="form-label">NRM Template :</label>
          <select v-model="currentNRM" class="form-select form-select" :class="{ 'is-invalid' : select_nrm_invalidated }" id="select3" aria-label=".form-select example">
            <option selected>請選擇 ...</option>
            <option v-for="item in templateNRMList" :key="item.templateId" :value="item.templateId">{{ item.name }}</option>
          </select>
          <div class="mt-2" v-if="currentNRM != '請選擇 ...'">
            <div>NRM ID : {{ currentNRM }}</div>
            <div>NRM Description : {{ currentNRMDescription }}</div>
          </div>
          <div class="invalid-feedback">
            請選擇一個 NRM Template
          </div>
        </div>
        <div class="mb-3">
          <label for="InputFile" class="form-label">NSS Description :</label>
          <input type="text" class="form-control" id="InputFile" placeholder="Description" v-model="templateDescription">
        </div>
        <div class="mb-2">
          <label for="select4" class="form-label">NFVO Name :</label>
          <select v-model="currentNFVMANO" class="form-select form-select" :class="{ 'is-invalid' : select_nfvmano_invalidated }" id="select4" aria-label=".form-select example">
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
      Generic Template List
    </template>
    <template v-slot:body>
      <form>
        <div :class="[ template ? 'mb-3' : 'mb-1' ]">
          <label for="InputFile" class="form-label">NSS Template ID :</label>
          <input type="text" class="form-control" id="InputFile" placeholder="請輸入 Plugin 名稱" v-model="templateId" readonly>
        </div>
        <div v-show="template">
          <label for="VnfList" class="form-label">Template ID List :</label>
            <ul class="list-group list-group-flush">
              <li v-if="templateVNFId" class="list-group-item">VNF : {{ templateVNFId }}</li>
              <li v-if="templateNSDId" class="list-group-item">NSD : {{ templateNSDId }}</li>
              <li v-if="templateNRMId" class="list-group-item">NRM : {{ templateNRMId }}</li>
            </ul>
        </div>
      </form>
    </template>
  </Modalshow>
  <Modaldelete ref="modalDelete" @delete="delete_template_modal" @remove="removeDeleteData">
    <template v-slot:header>
      Delete NSS Template
    </template>
  </Modaldelete>
  <Alert v-show="alertInfo.alertExist" v-bind="alertInfo"></Alert>
</template>
<script>
import { ref } from 'vue';
import { Share } from '../assets/js/api';
import { defineAsyncComponent } from 'vue';
import { nss_template } from '../assets/js/api';
import Table from '../components/global/table.vue';
const Alert = defineAsyncComponent(() => import(/* webpackChunkName: "Alert" */ '../components/global/alert.vue'));
const Modalshow = defineAsyncComponent(() => import(/* webpackChunkName: "Modalshow" */ '../components/global/modal-show.vue'));
const Modalcreate = defineAsyncComponent(() => import(/* webpackChunkName: "Modalcreate" */ '../components/global/modal-create.vue'));
const Modaldelete = defineAsyncComponent(() => import(/* webpackChunkName: "Modaldelete" */ '../components/global/modal-delete.vue'));
export default {
  components: {
    Table,
    Alert,
    Modalshow,
    Modalcreate,
    Modaldelete,
  },
  setup() {
    const modalCreate = ref(null)
    return{
      modalCreate,
    }
  },
  data() {
    return {
      status: false,
      filterEntries: [],
      th_list: [
        { name: "templateId", text: "ID", sort: true, status: 'none' },
        { name: "description", text: "Description", sort: true, status: 'none' },
        { name: "nfvoType", text: "NFVO", sort: true, status: 'none' },
        { name: "template_list", text: "Template", sort: false, status: 'none' },
        { name: "allocate_nssi", text: "Allocate", sort: false, status: 'none' },
        { name: "delete_template", text: "Delete", sort: false, status: 'none' },
      ],
      td_list: [],
      nfv_mano_list: [],
      columnSort: ['templateId','description','nfvoType'],
      columnNumber: 6,
      currentNFVMANO: '請選擇 ...',
      currentVNF: '請選擇 ...',
      currentNSD: '請選擇 ...',
      currentNRM: '請選擇 ...',
      templateId: '',
      templateDescription: '',
      templateData: {},
      select_vnf_invalidated: false,
      select_nsd_invalidated: false,
      select_nrm_invalidated: false,
      select_nfvmano_invalidated: false,
      templateVNFList: [],
      templateNSDList: [],
      templateNRMList: [],
      templateVNFId: '',
      templateNSDId: '',
      templateNRMId: '',
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
    template() {
      return this.templateVNFId || this.templateNSDId || this.templateNRMId;
    },
    is_invalidated() { // Create Modal 驗證 
      return this.select_vnf_invalidated || this.select_nsd_invalidated || this.select_nrm_invalidated || this.select_nfvmano_invalidated;
    },
    currentVNFDescription() { // Create Modal 內 VNF Description
      const index = this.templateVNFList.findIndex(x => x.templateId == this.currentVNF);
      return this.templateVNFList[index].description;
    },
    currentNSDDescription() { // Create Modal 內 NSD Description
      const index = this.templateNSDList.findIndex(x => x.templateId == this.currentNSD);
      return this.templateNSDList[index].description;
    },
    currentNRMDescription() { // Create Modal 內 NRM Description
      const index = this.templateNRMList.findIndex(x => x.templateId == this.currentNRM);
      return this.templateNRMList[index].description;
    },
  },
  watch: {
    currentVNF: {
      handler: function() {
        this.select_vnf_invalidated = false;
      }
    },
    currentNSD: {
      handler: function() {
        this.select_nsd_invalidated = false;
      }
    },
    currentNRM: {
      handler: function() {
        this.select_nrm_invalidated = false;
      }
    },
    currentNFVMANO: {
      handler: function() {
        this.select_nfvmano_invalidated = false;
      }
    },
  },
  async created() {
    await this.getTableData();
    await this.getNfvManoData();
    await this.getNssData();
    setTimeout(() => {
      this.status = true;
    }, 700);
  },
  methods: {
    async getTableData() {  // 獲取 VNF NSD NRM 資料
      const { TemplateList }  = Share();
      TemplateList()
      .then(res => {
        for(let i of res.data) {
          if(i.operationStatus == 'UPLOAD'){
            switch(i.templateType) {
              case 'VNF':
                this.templateVNFList.push(i);
                break;
              case 'NSD':
                this.templateNSDList.push(i);
                break;
              case 'NRM':
                this.templateNRMList.push(i);
                break;
              default: 
                console.log('templateType error');
            }
          }
        }
      })
      .catch(res => {
        console.log(res);
      })
    },
    async getNfvManoData() { // 獲取 NFVMANO 資料
      const { PluginList }  = Share();
      PluginList()
      .then(res => {
        for(let i of res.data){
          this.nfv_mano_list.push(i.name);
        }
      })
      .catch(res => {
        console.log(res);
      })
    },
    async getNssData() { // 獲取 NSS Template 資料
      const { nssTemplateList }  = nss_template();
      nssTemplateList()
      .then(res => {
        this.td_list = [];
        for(let i of res.data) {
          let nfvoType = '';
          if(i.nfvoType.length != 0) {
            nfvoType = i.nfvoType[0];
          }
          let obj = {
            description: i.description,
            genericTemplates: i.genericTemplates,
            instanceId: i.instanceId,
            templateId: i.templateId,
            nfvoType: nfvoType,
          }
          this.td_list.push(obj);
        }
      })
      .catch(res => {
        console.log(res);
      })
    },
    setAlertData(color,icon,title,content) { // alert 的樣式
      this.alertInfo.alertStatus = false; // 避免重複動作太快
      this.alertInfo.alertExist = false; // 避免重複動作太快
      this.alertInfo.alertColor = color;
      this.alertInfo.alertIcon = icon;
      this.alertInfo.alertTitle = title;
      this.alertInfo.alertContent = content;
      this.alertInfo.alertStatus = true;
      this.alertInfo.alertExist = true;
      setTimeout(() => {
        this.alertInfo.alertStatus = false;
        setTimeout(() => {
          this.alertInfo.alertExist = false;
          this.alertInfo.alertColor = '';
          this.alertInfo.alertIcon = '';
          this.alertInfo.alertTitle = '';
          this.alertInfo.alertContent = '';
        },100);
      },1500);
    },
    updateTableData(val) {  // 每次執行 Table 操作，更新資料 
      this.filterEntries = val;
    },
    removeCreateData() { // 關閉 Create Modal
      this.templateDescription = '';
      this.currentVNF = '請選擇 ...';
      this.currentNSD = '請選擇 ...';
      this.currentNRM = '請選擇 ...';
      this.currentNFVMANO = '請選擇 ...';
      this.select_vnf_invalidated = false;
      this.select_nsd_invalidated = false;
      this.select_nrm_invalidated = false;
      this.select_nfvmano_invalidated = false;
    },
    removeShowData() { // 關閉 Show Modal
      this.templateId = '';
      this.templateVNFId = '';
      this.templateNSDId = '';
      this.templateNRMId = '';
    },
    removeDeleteData() { // 關閉 Delete Modal
      this.templateData = {};
    },
    create_template_validate() { // 驗證 Create Modal
      if(this.currentVNF == '請選擇 ...')
        this.select_vnf_invalidated = true;
      if(this.currentNSD == '請選擇 ...')
        this.select_nsd_invalidated = true;
      if(this.currentNRM == '請選擇 ...')
        this.select_nrm_invalidated = true;
      if(this.currentNFVMANO == '請選擇 ...') 
        this.select_nfvmano_invalidated = true;
    },
    create_template_modal() { // 點擊 Create Modal 內創建按鈕
      this.create_template_validate();
      const { createNssTemplate }  = nss_template();
      if(!this.is_invalidated) {
        let form = new FormData();
        form.append("nfvoType", this.currentNFVMANO);
        form.append("genericTemplates", this.currentVNF);
        form.append("genericTemplates", this.currentNSD);
        form.append("genericTemplates", this.currentNRM);
        form.append("description", this.templateDescription);
        createNssTemplate(form)
        .then(() => {
          this.$refs.modalCreate.closeModalEvent();
          this.getNssData();
          this.setAlertData('alert-success','bi bi-check-circle-fill','Operates Successfully','NSS Template has been created !');
        })
        .catch(res => {
          this.$refs.modalCreate.closeModalEvent();
          this.setAlertData('alert-danger','bi bi-x-circle-fill','Operates Unsuccessfully','Fail to create the NSS Template !');
          console.log(res);
        })
      }
    },
    show_template_button(item) { // 點擊 Show Modal 按鈕
      this.templateId = item.templateId;
      const indexVNF = item.genericTemplates.findIndex(x=>x.templateType == "VNF");
      const indexNSD = item.genericTemplates.findIndex(x=>x.templateType == "NSD");
      const indexNRM = item.genericTemplates.findIndex(x=>x.templateType == "NRM");
      if(indexVNF != -1)
        this.templateVNFId = item.genericTemplates[indexVNF].templateId;
      else
        this.templateVNFId = '';
      if(indexNSD != -1)
        this.templateNSDId = item.genericTemplates[indexNSD].templateId;
      else
        this.templateNSDId = '';
      if(indexNRM != -1)
        this.templateNRMId = item.genericTemplates[indexNRM].templateId;
      else
        this.templateNRMId = '';
    },
    allocate_template_button(item) { // 點擊 Allocate Modal 按鈕
      this.$router.push({ path:'/nssi_topology/', query: { id: item.templateId, status: 'allocate'}});
    },
    delete_template_button(file) { // 點擊 Delete Modal 按鈕
      this.templateData = file;
    },
    delete_template_modal() { // 點擊 Delete Modal 內刪除按鈕
      const { deleteNssTemplate } = nss_template();
      deleteNssTemplate(this.templateData.templateId)
      .then(() => {
        this.getNssData();
        this.setAlertData('alert-success','bi bi-check-circle-fill','Operates Successfully','NSS Template has been deleted !');
      })
      .catch((res) => {
        this.setAlertData('alert-danger','bi bi-x-circle-fill','Operates Unsuccessfully','Fail to delete the NSS Template !');
        console.log(res);
      })  
    },
  }
}
</script>