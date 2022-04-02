<template>
  <Table :column="th_list" :entrie="td_list" :columnSort="columnSort" :status="status" @update="updateTableData">
    <template v-slot:header>
      {{`${ t('NSSI_Template') } ${ t('Template') }`}}
      <!-- Network Slice Subnet Template -->
    </template>
    <template v-slot:button>
      {{`${ t('Create') } NSS ${ t('Template') }`}}
      <!-- Create NSS Template -->
    </template>
    <template v-slot:table-name>
      {{`NSS ${ t('Template') } ${ t('list') }`}}
      <!-- NSS Template List -->
    </template>
    <template v-slot:table-td>
      <tr v-for="item in filterEntries" :key="item.templateId">
        <td class="tablecell-custom">{{ item.templateId }}</td>
        <td class="tablecell-custom">{{ item.description }}</td>
        <td class="tablecell-custom">{{ item.nfvoType }}</td>
        <td class="w-0">
          <div class="d-flex justify-content-center form-check form-switch mb-0">
            <input class="form-check-input cursor-pointer" type="checkbox" role="switch" checked>
          </div>
        </td>
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
          <div class="d-flex justify-content-center align-items-center text-white bg-danger rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" data-bs-toggle="modal" data-bs-target="#delete_plugin_Modal" @click="get_templateId(item.templateId)">
            <i class="bi bi-trash"></i>
          </div>
        </td>
      </tr>
    </template>
  </Table>
  <Modalshow ref="modalShow" @remove="removeShowData">
    <template v-slot:header>
      {{ t('Generic') }}{{ t('Template') }}{{ t('list') }}
      <!-- Generic Template List -->
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">
            NSS{{ t('Template') }}{{ t('ID') }} :
            <!-- NSS Template ID : -->
          </label>
          <input type="text" class="form-control" id="InputFile" placeholder="請輸入 Plugin 名稱" v-model="templateId" readonly>
        </div>
        <div>
          <label for="VnfList" class="form-label">
            {{ t('Template') }}{{ t('ID') }}{{ t('list') }} :
            <!-- Template ID List : -->
          </label>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">VNF : {{ templateVNFId }}</li>
              <li class="list-group-item">NSD : {{ templateNSDId }}</li>
              <li class="list-group-item">NRM : {{ templateNRMId }}</li>
            </ul>
        </div>
      </form><Alert ref="alertRef" v-show="alertExist"></Alert>
    </template>
  </Modalshow>
  <Modalcreate ref="modalCreate" @remove="removeCreateData" @keypress.enter="create_template_modal">
    <template v-slot:header>
      {{`${ t('Create') }${ t('new') }NSS ${ t('Template') }`}}
      <!-- Create new NSS Template -->
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="select1" class="form-label">
            VNF {{ t('Template') }} :
            <!-- VNF Template : -->
          </label>
          <select @change="selectChangeEvent('VNF')" v-model="currentVNF" class="form-select form-select" :class="{ 'is-invalid' : select_vnf_invalidated }" id="select1" aria-label=".form-select">
            <option selected disabled :value="`${ t('Please') }${ t('select') } ...`">
              {{`${ t('Please') }${ t('select') } ...`}}
              <!-- 請選擇 ... -->
            </option>
            <option v-for="item in templateVNFList" :key="item.templateId" :value="item.templateId">{{ item.name }}</option>
          </select>
          <div class="mt-2" v-if="currentVNF != `${ t('Please') }${ t('select') } ...`">
            <div>
              VNF {{ t('ID') }} : {{ currentVNF }}
              <!-- VNF ID : {{ currentVNF }} -->
            </div>
            <div>
              VNF {{ t('Description') }} : {{ selected_vnf_description }}
              <!-- VNF Description : {{ currentVNFDescription }} -->
            </div>
          </div>
          <div class="invalid-feedback">
            {{`${ t('Please') }${ t('select') }${ t('one') } VNF ${ t('Template') }`}}
            <!-- 請選擇一個 VNF Template -->
          </div>
        </div>
        <div class="mb-3">
          <label for="select2" class="form-label">
            NSD {{ t('Template') }} :
            <!-- NSD Template : -->
          </label>
          <select @change="selectChangeEvent('NSD')" v-model="currentNSD" class="form-select form-select" :class="{ 'is-invalid' : select_nsd_invalidated }" id="select2" aria-label=".form-select">
            <option selected disabled :value="`${ t('Please') }${ t('select') } ...`">
              {{`${ t('Please') }${ t('select') } ...`}}
              <!-- 請選擇 ... -->
            </option>
            <option v-for="item in templateNSDList" :key="item.templateId" :value="item.templateId">{{ item.name }}</option>
          </select>
          <div class="mt-2" v-if="currentNSD != `${ t('Please') }${ t('select') } ...`">
            <div>
              NSD {{ t('ID') }} : {{ currentNSD }}
              <!-- NSD ID : {{ currentNSD }} -->
            </div>
            <div>
              NSD {{ t('Description') }} : {{ selected_nsd_description }}
              <!-- NSD Description : {{ currentNSDDescription }} -->
            </div>
          </div>
          <div class="invalid-feedback">
            {{`${ t('Please') }${ t('select') }${ t('one') } NSD ${ t('Template') }`}}
            <!-- 請選擇一個 NSD Template -->
          </div>
        </div>
        <div class="mb-3">
          <label for="select3" class="form-label">
            NRM {{ t('Template') }} :
            <!-- NRM Template : -->
          </label>
          <select @change="selectChangeEvent('NRM')" v-model="currentNRM" class="form-select form-select" :class="{ 'is-invalid' : select_nrm_invalidated }" id="select3" aria-label=".form-select">
            <option selected disabled :value="`${ t('Please') }${ t('select') } ...`">
              {{`${ t('Please') }${ t('select') } ...`}}
              <!-- 請選擇 ... -->
            </option>
            <option v-for="item in templateNRMList" :key="item.templateId" :value="item.templateId">{{ item.name }}</option>
          </select>
          <div class="mt-2" v-if="currentNRM != `${ t('Please') }${ t('select') } ...`">
            <div>
              NRM {{ t('ID') }} : {{ currentNRM }}
              <!-- NRM ID : {{ currentNRM }} -->
            </div>
            <div>
              NRM {{ t('Description') }} : {{ selected_nrm_description }}
              <!-- NRM Description : {{ currentNRMDescription }} -->
            </div>
          </div>
          <div class="invalid-feedback">
            {{`${ t('Please') }${ t('select') }${ t('one') } NRM ${ t('Template') }`}}
            <!-- 請選擇一個 NRM Template -->
          </div>
        </div>
        <div class="mb-3">
          <label for="InputFile" class="form-label">
            {{`NSS${ t('Description') } :`}}
            <!-- NSS Description : -->
          </label>
          <input type="text" class="form-control" id="InputFile" :placeholder="description" v-model.trim="templateDescription">
        </div>
        <div class="mb-2">
          <label for="select4" class="form-label">
            {{`NFVO${ t('Name') } :`}}
            <!-- NFVO Name : -->
          </label>
          <select v-model="currentNFVMANO" class="form-select form-select" :class="{ 'is-invalid' : select_nfvmano_invalidated }" id="select4" aria-label=".form-select" @change="selectNFVMANO">
            <option selected disabled :value="`${ t('Please') }${ t('select') } ...`">
              {{`${ t('Please') }${ t('select') } ...`}}
              <!-- 請選擇 ... -->
            </option>
            <option v-for="item in nfv_mano_list" :key="item.name" :value="item.name">{{ item.name }}</option>
          </select>
          <div class="invalid-feedback">
            {{`${ t('Please') }${ t('select') }${ t('one') } NFVO`}}
            <!-- 請選擇一個 NFVO -->
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-primary text-white" @click="create_template_modal">
        {{ t('Create') }}
        <!-- Create -->
      </button>
    </template>
  </Modalcreate>
  <Modaldelete ref="modalDelete" @remove="removeDeleteData" @keypress.enter="delete_template_modal" @delete="delete_template_modal">
    <template v-slot:header>
      {{`${ t('Delete') }NSS${ t('Template') }`}}
      <!-- Delete NSS Template -->
    </template>
  </Modaldelete>
   <Alert ref="alertRef" v-show="alertExist"></Alert>
</template>

<script setup>
import router from '@/router';
import { $array } from 'alga-js';
import { useI18n } from 'vue-i18n';
import { Share } from '@/assets/js/api';
import { delay } from '@/assets/js/delay';
import { form } from '@/assets/js/newFormData';
import { nss_template } from '@/assets/js/api';
import Table from '../components/global/table.vue';
import { closeModal } from '@/assets/js/closeModel';
import { alertConfig } from '@/assets/js/alertData';
import { callCreate, callDelete } from '@/assets/js/templateOperate';
import { ref, toRefs, watch, onBeforeMount, defineAsyncComponent } from 'vue';
import { set_selects_invalidated, selects_Validate, selects_invalidated } from '@/assets/js/validate';
const { t } = useI18n();
const { PluginList, TemplateList } = Share();
const { alertRef, alertExist } = toRefs(alertConfig);
const { nssTemplateList, createNssTemplate, deleteNssTemplate }  = nss_template();
const Alert = defineAsyncComponent(() => import(/* webpackChunkName: "Alert" */ '../components/global/alert.vue'));
const Modalshow = defineAsyncComponent(() => import(/* webpackChunkName: "Modalshow" */ '../components/global/modal-show.vue'));
const Modalcreate = defineAsyncComponent(() => import(/* webpackChunkName: "Modalcreate" */ '../components/global/modal-create.vue'));
const Modaldelete = defineAsyncComponent(() => import(/* webpackChunkName: "Modaldelete" */ '../components/global/modal-delete.vue'));
const status = ref(false);
const modalCreate = ref(null);
const modalDelete = ref(null);
const columnSort = ['templateId','description','nfvoType'];
const th_list = [
  { name: "templateId", text: t("ID") },
  { name: "description", text: t("Description") },
  { name: "nfvoType", text: t("NFVO") },
  { name: "template_share", text: `分 享` },
  { name: "template_list", text: t("Template") },
  { name: "allocate_nssi", text: t("Allocate") },
  { name: "delete_template", text: t("Delete") },
];
const td_list = ref([]);
const templateId = ref('');
const templateVNFId = ref('');
const templateNSDId = ref('');
const templateNRMId = ref('');
const filterEntries = ref([]);
const nfv_mano_list = ref([]);
const templateVNFList = ref([]);
const templateNSDList = ref([]);
const templateNRMList = ref([]);
const templateDescription = ref('');
const description = t('Description');
const selected_vnf_description = ref('');
const selected_nsd_description = ref('');
const selected_nrm_description = ref('');
const currentVNF = ref(`${ t('Please') }${ t('select') } ...`);
const currentNSD = ref(`${ t('Please') }${ t('select') } ...`);
const currentNRM = ref(`${ t('Please') }${ t('select') } ...`);
const currentNFVMANO = ref(`${ t('Please') }${ t('select') } ...`);
set_selects_invalidated(['select_vnf_invalidated', 'select_nsd_invalidated', 'select_nrm_invalidated', 'select_nfvmano_invalidated']);
const { select_vnf_invalidated, select_nsd_invalidated, select_nrm_invalidated, select_nfvmano_invalidated } = toRefs(selects_invalidated);
const getTableData = async () => {  // 獲取 VNF NSD NRM 資料
  const res = await TemplateList();
  templateVNFList.value = res.data.filter(i => i.operationStatus == 'UPLOAD' && i.templateType == 'VNF');
  templateNSDList.value = res.data.filter(i => i.operationStatus == 'UPLOAD' && i.templateType == 'NSD');
  templateNRMList.value = res.data.filter(i => i.operationStatus == 'UPLOAD' && i.templateType == 'NRM');
};
const getNfvManoData = async () => { // 獲取 NFVMANO 資料
  const res = await PluginList();
  nfv_mano_list.value = res.data;
};
const getNssData = async () => { // 獲取 NSS Template 資料
  const res = await nssTemplateList();
  td_list.value = [];
  for(let i of res.data) {
    if(i.genericTemplates.length == 3) {
      let nfvoType = i.nfvoType.length == 0 ? '' : i.nfvoType[0];
      let obj = {
        description: i.description,
        genericTemplates: i.genericTemplates,
        instanceId: i.instanceId,
        templateId: i.templateId,
        nfvoType: nfvoType,
      };
      td_list.value.push(obj);
    }
  }
};
const selectNFVMANO = () => {
  modalCreate.value.focusModalEvent();
};
const selectChangeEvent = type => { // 切換 Create Modal Select
  const set = `${ t('Please') }${ t('select') } ...`;
  if(type == 'VNF' && currentVNF.value != set) {
    const index = templateVNFList.value.findIndex(x => x.templateId == currentVNF.value);
    selected_vnf_description.value = templateVNFList.value[index].description;
  }
  else if(type == 'NSD' && currentNSD.value != set) {
    const index = templateNSDList.value.findIndex(x => x.templateId == currentNSD.value);
    selected_nsd_description.value = templateNSDList.value[index].description;
  }
  else if(type == 'NRM' && currentNRM.value != set) {
    const index = templateNRMList.value.findIndex(x => x.templateId == currentNRM.value);
    selected_nrm_description.value = templateNRMList.value[index].description;
  }
  modalCreate.value.focusModalEvent();
};
const create_validate = () => { // 驗證 Create Modal
  const set = `${ t('Please') }${ t('select') } ...`;
  let options = new Map();
  options.set('select_vnf_invalidated', currentVNF.value);
  options.set('select_nsd_invalidated', currentNSD.value);
  options.set('select_nrm_invalidated', currentNRM.value);
  options.set('select_nfvmano_invalidated', currentNFVMANO.value);
  selects_Validate(options, set);
  return !(select_vnf_invalidated.value || select_nsd_invalidated.value || select_nrm_invalidated.value || select_nfvmano_invalidated.value);
};
const create_template_modal = async () => { // 點擊 Create Modal 內創建按鈕
 const createValidate = create_validate();
  if(createValidate) {
    const alertData = {
      Template: `${ t('NSSI_Template') } ${ t('Template') }`,
      configSuccess: t('created'),
      configUnsuccess: t('create'),
    };
    const formName = ['nfvoType', 'genericTemplates', 'genericTemplates', 'genericTemplates', 'description'];
    const formValue = [currentNFVMANO.value, currentVNF.value, currentNSD.value, currentNRM.value, templateDescription.value];
    const formData = form(formName, formValue);
    callCreate(formData, [createNssTemplate, getNssData], alertData);
    closeModal(modalCreate.value);
  }
};
const updateTableData = val => {  // 每次執行 Table 操作，更新資料 
  filterEntries.value = val;
};
const show_template_button = item => { // 點擊 Show Modal 按鈕
  templateId.value = item.templateId;
  const indexVNF = item.genericTemplates.findIndex(x => x.templateType == "VNF");
  const indexNSD = item.genericTemplates.findIndex(x => x.templateType == "NSD");
  const indexNRM = item.genericTemplates.findIndex(x => x.templateType == "NRM");
  templateVNFId.value = item.genericTemplates[indexVNF].templateId;
  templateNSDId.value = item.genericTemplates[indexNSD].templateId;
  templateNRMId.value = item.genericTemplates[indexNRM].templateId;
};
const get_templateId = id => { 
  templateId.value = id; 
};
const allocate_template_button = item => { // 點擊 Allocate Modal 按鈕
  router.push({ path: '/nssi_topology/', query: { id: item.templateId, status: 'allocate'}});
};
const delete_template_modal = () => { // 點擊 Delete Modal 內刪除按鈕
  const alertData = {
    Template: `${ t('NSSI_Template') } ${ t('Template') }`,
    configSuccess: t('deleted'),
    configUnsuccess: t('delete'),
  };
  callDelete(templateId.value, [deleteNssTemplate, getNssData], alertData);
  closeModal(modalDelete.value);
};
const removeCreateData = () => { // 關閉 Create Modal
  templateDescription.value = '';
  currentVNF.value = `${ t('Please') }${ t('select') } ...`;
  currentNSD.value = `${ t('Please') }${ t('select') } ...`;
  currentNRM.value = `${ t('Please') }${ t('select') } ...`;
  currentNFVMANO.value = `${ t('Please') }${ t('select') } ...`;
  select_vnf_invalidated.value = false;
  select_nsd_invalidated.value = false;
  select_nrm_invalidated.value = false;
  select_nfvmano_invalidated.value = false;
};
const removeShowData = () => { // 關閉 Show Modal
  templateId.value = '';
  templateVNFId.value = '';
  templateNSDId.value = '';
  templateNRMId.value = '';
};
const removeDeleteData = () => { // 關閉 Delete Modal
  templateId.value = '';
};

watch(currentNFVMANO, () => { select_nfvmano_invalidated.value = false });
watch(currentVNF, () => { select_vnf_invalidated.value = false });
watch(currentNSD, () => { select_nsd_invalidated.value = false });
watch(currentNRM, () => { select_nrm_invalidated.value = false });

onBeforeMount(async () => {
  try {
    await getTableData();
    await getNfvManoData(); 
    await getNssData();
    templateVNFList.value = $array.sortBy(templateVNFList.value, 'name', 'asc');
    templateNSDList.value = $array.sortBy(templateNSDList.value, 'name', 'asc');
    templateNRMList.value = $array.sortBy(templateNRMList.value, 'name', 'asc');
    nfv_mano_list.value = $array.sortBy(nfv_mano_list.value, 'name', 'asc');
  }
  catch(err) {
    console.log(err);
  }
  await delay(700);
  status.value = true;
});
</script>