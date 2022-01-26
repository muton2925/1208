<template>
  <Table :column="th_list" :entrie="template_list" :columnSort="columnSort" @update="updateTableData">
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
          <select v-model="selected_vnf" class="form-select form-select" :class="{ 'is-invalid' : selected_vnf_invalidated }" id="select1" aria-label=".form-select example">
            <option selected>請選擇 ...</option>
            <option v-for="item in sorted_template_vnf_list" :key="item.templateId" :value="item.templateId">{{ item.name }}</option>
          </select>
          <div class="mt-2" v-if="selected_vnf != '請選擇 ...'">
            <div>VNF ID : {{ selected_vnf }}</div>
            <div>VNF Description : {{ current_vnf_description }}</div>
          </div>
          <div class="invalid-feedback">
            請選擇一個 VNF Template
          </div>
        </div>
        <div class="mb-3">
          <label for="select2" class="form-label">NSD Template :</label>
          <select v-model="selected_nsd" class="form-select form-select" :class="{ 'is-invalid' : selected_nsd_invalidated }" id="select2" aria-label=".form-select example">
            <option selected>請選擇 ...</option>
            <option v-for="item in sorted_template_nsd_list" :key="item.templateId" :value="item.templateId">{{ item.name }}</option>
          </select>
          <div class="mt-2" v-if="selected_nsd != '請選擇 ...'">
            <div>NSD ID : {{ selected_nsd }}</div>
            <div>NSD Description : {{ current_nsd_description }}</div>
          </div>
          <div class="invalid-feedback">
            請選擇一個 NSD Template
          </div>
        </div>
        <div class="mb-3">
          <label for="select3" class="form-label">NRM Template :</label>
          <select v-model="selected_nrm" class="form-select form-select" :class="{ 'is-invalid' : selected_nrm_invalidated }" id="select3" aria-label=".form-select example">
            <option selected>請選擇 ...</option>
            <option v-for="item in sorted_template_nrm_list" :key="item.templateId" :value="item.templateId">{{ item.name }}</option>
          </select>
          <div class="mt-2" v-if="selected_nrm != '請選擇 ...'">
            <div>NRM ID : {{ selected_nrm }}</div>
            <div>NRM Description : {{ current_nrm_description }}</div>
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
          <select v-model="selected_nfv_mano" class="form-select form-select" :class="{ 'is-invalid' : selected_nfv_mano_invalidated }" id="select4" aria-label=".form-select example">
            <option selected>請選擇 ...</option>
            <option v-for="item in sorted_nfv_mano_list" :key="item.name" :value="item.name">{{ item.name }}</option>
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
        <div class="mb-3">
          <label for="InputFile" class="form-label">NSS Template ID :</label>
          <input type="text" class="form-control" id="InputFile" placeholder="請輸入 Plugin 名稱" v-model="templateId" readonly>
        </div>
        <div>
          <label for="VnfList" class="form-label">Template ID List :</label>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">VNF : {{ template_vnf_id }}</li>
              <li class="list-group-item">NSD : {{ template_nsd_id }}</li>
              <li class="list-group-item">NRM : {{ template_nrm_id }}</li>
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
  <Alert ref="alert" v-show="alertExist"></Alert>
</template>
<script>
import router from '@/router';
import axios from 'axios';
import { $array } from 'alga-js';
import { useStore } from 'vuex';
import { nss_template, Share } from '../assets/js/api.js';
import Table from '../components/global/table.vue';
import { compositionAPI } from '../assets/js/composition-api';
import { ref, reactive, computed, onMounted, onUnmounted, defineAsyncComponent } from 'vue';
const { nssTemplateList, createNssTemplate, deleteNssTemplate } = nss_template();
const { TemplateList } = Share();
const { delay, alertEvent, updateTableData, getPluginData, removeDeleteData, delete_template_button, filterEntries, sorted_nfv_mano_list, templateId, templateName, templateData, templateDescription, selected_nfv_mano, alert, alertExist, modalShow, modalCreate, modalDelete } = compositionAPI();
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
    const store = useStore();
    const columnSort = ref(['templateId','description','nfvoType']);
    const th_list = ref([
      { name: "templateId", text: "ID" },
      { name: "description", text: "Description" },
      { name: "nfvoType", text: "NFVO" },
      { name: "template_list", text: "Template" },
      { name: "allocate_nssi", text: "Allocate" },
      { name: "delete_template", text: "Delete" },
    ]);
    const template_vnf_id = ref('');
    const template_nsd_id = ref('');
    const template_nrm_id = ref('');
    const templateId = reactive({
      vnfId: '',
      nsdId: '',
      nrmId: '',
    });
    const template_list = ref([]);
    const template_vnf_list = ref([]);
    const template_nsd_list = ref([]);
    const template_nrm_list = ref([]);
    const selected_vnf = ref('請選擇 ...');
    const selected_nsd = ref('請選擇 ...');
    const selected_nrm = ref('請選擇 ...');
    const selected_vnf_invalidated = ref(false);
    const selected_nsd_invalidated = ref(false);
    const selected_nrm_invalidated = ref(false);
    const selected_nfv_mano_invalidated = ref(false);
    const sorted_template_vnf_list = computed(() => $array.sortBy(template_vnf_list.value, 'name', 'asc'));
    const sorted_template_nsd_list = computed(() => $array.sortBy(template_nsd_list.value, 'name', 'asc'));
    const sorted_template_nrm_list = computed(() => $array.sortBy(template_nrm_list.value, 'name', 'asc'));
    const current_vnf_description = computed(() => {
      const index = template_vnf_list.value.findIndex(x => x.templateId == selected_vnf.value);
      return template_vnf_list.value[index].description;
    });
    const current_nsd_description = computed(() => {
      const index = template_nsd_list.value.findIndex(x => x.templateId == selected_nsd.value);
      return template_nsd_list.value[index].description;
    });
    const current_nrm_description = computed(() => {
      const index = template_nrm_list.value.findIndex(x => x.templateId == selected_nrm.value);
      return template_nrm_list.value[index].description;
    });
    const getGenericTemplateData = async () => {  // 獲取 VNF NSD NRM 資料
      let res = await TemplateList();
      for(let i of res.data) {
        if(i.operationStatus == 'UPLOAD') {
          switch(i.templateType) {
            case 'VNF':
              template_vnf_list.value.push(i);
              break;
            case 'NSD':
              template_nsd_list.value.push(i);
              break;
            case 'NRM':
              template_nrm_list.value.push(i);
              break;
            default: 
              console.log('templateType error');
          }
        }
      }
    };
    const getTemplateData = async () => { // 獲取 NSS Template 資料
      let res = await nssTemplateList();
      template_list.value = [];
      for(let i of res.data) {
        if(i.genericTemplates.length == 3) {
          let nfvoType = i.nfvoType.length == 0 ? '' : i.nfvoType[0];
          let obj = {
            description: i.description,
            genericTemplates: i.genericTemplates,
            instanceId: i.instanceId,
            templateId: i.templateId,
            nfvoType: nfvoType,
          }
          template_list.value.push(obj);
        }
      }
    };
    const removeCreateData = () => { // 關閉 Create Modal
      templateDescription.value = '';
      selected_vnf.value = '請選擇 ...';
      selected_nsd.value = '請選擇 ...';
      selected_nrm.value = '請選擇 ...';
      selected_nfv_mano.value = '請選擇 ...';
      selected_vnf_invalidated.value = false;
      selected_nsd_invalidated.value = false;
      selected_nrm_invalidated.value = false;
      selected_nfv_mano_invalidated.value = false;
    };
    const removeShowData = () => { // 關閉 Show Modal
      templateId.value = '';
      template_vnf_id.value = '';
      template_nsd_id.value = '';
      template_nrm_id.value = '';
    };
    const create_template_validate = () => { // 驗證 Create Modal
      if(selected_vnf.value == '請選擇 ...')
        selected_vnf_invalidated.value = true;
      if(selected_nsd.value == '請選擇 ...')
        selected_nsd_invalidated.value = true;
      if(selected_nrm.value == '請選擇 ...')
        selected_nrm_invalidated.value = true;
      if(selected_nfv_mano.value == '請選擇 ...') 
        selected_nfv_mano_invalidated.value = true;
    };
    const create_template_modal = async () => { // 點擊 Create Modal 內創建按鈕
      create_template_validate();
      if(!selected_vnf_invalidated.value && !selected_nsd_invalidated.value && !selected_nrm_invalidated.value && !selected_nfv_mano_invalidated.value) {
        let form = new FormData();
        form.append("nfvoType", selected_nfv_mano.value);
        form.append("genericTemplates", selected_vnf.value);
        form.append("genericTemplates", selected_nsd.value);
        form.append("genericTemplates", selected_nrm.value);
        form.append("description", templateDescription.value);
        try {
          await createNssTemplate(form);
          await getTemplateData();
          alertEvent(1, 'NSS Template', 'created');
        }
        catch(err) {
          console.log(err);
          alertEvent(0, 'NSS Template', 'create');
        }
        modalCreate.value.closeModalEvent();
      }
    };
    const show_template_button = item => { // 點擊 Show Modal 按鈕
      templateId.value = item.templateId;
      const indexVNF = item.genericTemplates.findIndex(x => x.templateType == "VNF");
      const indexNSD = item.genericTemplates.findIndex(x => x.templateType == "NSD");
      const indexNRM = item.genericTemplates.findIndex(x => x.templateType == "NRM");
      template_vnf_id.value = item.genericTemplates[indexVNF].templateId;
      template_nsd_id.value = item.genericTemplates[indexNSD].templateId;
      template_nrm_id.value = item.genericTemplates[indexNRM].templateId;
    };
    const allocate_template_button = item => { // 點擊 Allocate Modal 按鈕
      router.push({ path: '/nssi_topology/', query: { id: item.templateId, status: 'allocate'}});
    };
    const delete_template_modal = async () => { // 點擊 Delete Modal 內刪除按鈕
      try {
        await deleteNssTemplate(templateData.value.templateId);
        await getTemplateData();
        alertEvent(1, 'NSS Template', 'deleted');
      }
      catch(err) {
        console.log(err);
        alertEvent(0, 'NSS Template', 'delete');
      }
      modalDelete.value.closeModalEvent();
    };
    onMounted(async () => {
      try {
        await axios.all([getTemplateData(), getGenericTemplateData(), getPluginData()]);
      }
      catch(err) {
        console.log(err);
      }
      await delay(700);
      store.commit("statusOn");
    });
    onUnmounted(() => {
      store.commit("statusOff");
    });
    return{
      alert,
      alertEvent,
      alertExist,
      modalShow,
      modalCreate,
      modalDelete,
      th_list,
      columnSort,
      filterEntries,
      template_list,
      selected_nfv_mano,
      sorted_nfv_mano_list,
      templateId,
      templateName,
      template_vnf_list,
      templateDescription,
      removeShowData,
      removeCreateData,
      removeDeleteData,
      updateTableData,
      show_template_button,
      create_template_modal,
      delete_template_button,
      delete_template_modal,
      sorted_template_vnf_list,
      sorted_template_nsd_list,
      sorted_template_nrm_list,
      current_vnf_description,
      current_nsd_description,
      current_nrm_description,
      allocate_template_button,
      selected_vnf_invalidated,
      selected_nsd_invalidated,
      selected_nrm_invalidated,
      selected_vnf,
      selected_nsd,
      selected_nrm,
      selected_nfv_mano_invalidated,
      template_vnf_id,
      template_nsd_id,
      template_nrm_id
    }
  },
}
</script>