<template>
  <Table :column="th_list" :entrie="td_list" :columnSort="columnSort" :status="status" @update="updateTableData">
    <template v-slot:header>
      {{`${ t('template_header', 2) } ${ t('Template') }`}}
    </template>
    <template v-slot:button>
      {{`${ t('Create') }NRM ${ t('Template') }`}}
    </template>
    <template v-slot:table-name>
      {{`NRM ${ t('Template') }${ t('list') }`}}
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
          <div class="d-flex justify-content-center form-check form-switch mb-0">
            <input class="form-check-input cursor-pointer" type="checkbox" role="switch" checked>
          </div>
        </td>
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
          <div class="d-flex justify-content-center align-items-center text-white bg-danger rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" data-bs-toggle="modal" data-bs-target="#delete_plugin_Modal" @click="get_templateId(item.templateId)">
            <i class="bi bi-trash"></i>
          </div>
        </td>
      </tr>
    </template>
  </Table>
  <Modalcreate ref="modalCreate" @remove="removeCreateData">
    <template v-slot:header>
      {{`${ t('Create') }${ t('new') }NRM ${ t('Template') }`}}
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">
            {{`${ t('Template') }${ t('Name') } :`}}
          </label>
          <input type="text" class="form-control" :class="{ 'is-invalid' : text_invalidated }" id="InputFile" :placeholder="templateNameplaceholder" v-model="templateName">
          <div class="invalid-feedback">
            <template v-if="repeatName">
              {{`${ t('this') }${ t('Template') }${ t('Name') }${ t('already_exists') }`}}
            </template>
            <template v-else>
              {{`${ t('Template') }${ t('Name') }${ t('not_be_empty') }`}}
            </template>
          </div>
        </div>
        <div class="mb-3">
          <label for="InputFile2" class="form-label">
            {{`NRM ${ t('Description') } :`}}
          </label>
          <input type="text" class="form-control" id="InputFile2" :placeholder="description" v-model="templateDescription">
        </div>
        <div class="mb-2">
          <label for="InputFile3" class="form-label">
            {{`NFVO ${ t('Name') } :`}}
          </label>
          <select v-model="currentNFVMANO" class="form-select form-select" :class="{ 'is-invalid' : select_invalidated }" id="InputFile3" aria-label=".form-select example">
            <option selected disabled :value="`${t('Please')}${t('select')} ...`">
              {{`${ t('Please') }${ t('select') } ...`}}
            </option>
            <option v-for="item in sortNFVMANOList" :key="item.name" :value="item.name">{{ item.name }}</option>
          </select>
          <div class="invalid-feedback">
            {{`${ t('Please') }${ t('select') }${ t('one') }NFVO`}}
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-primary text-white" @click="create_template_modal">
        {{ t('Create') }}
      </button>
    </template>
  </Modalcreate>
  <Modalupdate ref="modalUpdate" @remove="removeUpdateData">
    <template v-slot:header>
      {{`${ t('Update') }NRM ${ t('Template') }`}}
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">
            {{`NRM ${ t('Template') }${ t('ID') } :`}}
          </label>
          <input type="text" class="form-control" id="InputFile" placeholder="請輸入 Plugin 名稱" v-model="templateId" readonly>
        </div>
        <div class="mb-2">
          <label for="UploadFile2" class="form-label">
            {{`NRM ${ t('Template') }${ t('File') } :`}}
          </label>
          <input type="file" class="form-control" :class="{ 'is-invalid' : file_invalidated }" id="UploadFile2" ref="uploadData_update" accept=".zip" @change="getFileData">
          <div class="invalid-feedback">
            {{`${ t('File') }${ t('not_be_empty') }`}}
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-warning text-white" @click="update_template_modal">
        {{`${ t('Update') }`}}
      </button>
    </template>
  </Modalupdate>
  <Modaldelete ref="modalDelete" @delete="delete_template_modal" @remove="removeDeleteData">
    <template v-slot:header>
      {{`${ t('Delete') }NRM ${ t('Template') }`}}
    </template>
  </Modaldelete>
  <Alert ref="alertRef" v-show="alertExist"></Alert>
</template>
<script setup>
import { $array } from 'alga-js';
import { useI18n } from 'vue-i18n';
import { Share } from '../assets/js/api';
import { delay } from '../assets/js/delay';
import { form } from '../assets/js/newFormData';
import { GenericTemplate } from '../assets/js/api';
import Table from '../components/global/table.vue';
import { closeModal } from '../assets/js/closeModel';
import { alertConfig } from '../assets/js/alertData';
import { ref, toRefs, watch, computed, onBeforeMount, defineAsyncComponent } from 'vue';
import { callCreate, callUpdate, callDelete, calldownload } from '../assets/js/templateOperate';
import { text_invalidated, file_invalidated, select_invalidated, file_Validate, text_Validate, select_Validate } from '../assets/js/validate';
const { t } = useI18n();
const { PluginList, TemplateList } = Share();
const { alertRef, alertExist } = toRefs(alertConfig);
const { createGenericTemplate, updateGenericTemplate, deleteGenericTemplate } = GenericTemplate();
const Alert = defineAsyncComponent(() => import(/* webpackChunkName: "Alert" */ '../components/global/alert.vue'));
const Modalcreate = defineAsyncComponent(() => import(/* webpackChunkName: "Modalcreate" */ '../components/global/modal-create.vue'));
const Modalupdate = defineAsyncComponent(() => import(/* webpackChunkName: "Modalupdate" */ '../components/global/modal-update.vue'));
const Modaldelete = defineAsyncComponent(() => import(/* webpackChunkName: "Modaldelete" */ '../components/global/modal-delete.vue'));

const modalCreate = ref(null);
const modalUpdate = ref(null);
const uploadData_update = ref(null);
const status = ref(false);
const th_list = [
  { name: "templateId", text: t("ID") },
  { name: "name", text: `${ t("Template") }${ t("Name") }` },
  { name: "description", text: t("Description") },
  { name: "templateType", text: t('Type') },
  { name: "nfvoType", text: t("NFVO") },
  { name: "operationStatus", text: `NRM ${ t('Status') }` },
  { name: "template_share", text: `分 享` },
  { name: "update_template", text: t("Update") },
  { name: "template_Download", text: t("Download") },
  { name: "delete_template", text: t("Delete") },
];
const td_list =  ref([]);
const fileData = ref({});
const templateId = ref('');
const templateName = ref('');
const filterEntries = ref([]);
const nfv_mano_list =  ref([]);
const templateDescription = ref('');
const description = t('Description');
const templateNameplaceholder = `${ t("Template") }${ t("Name") }`;
const currentNFVMANO = ref(`${ t('Please') }${ t('select') } ...`);
const columnSort = ref(['templateId', 'name', 'description', 'templateType', 'nfvoType', 'operationStatus']);
const repeatName = computed(() => {
  return td_list.value.map(e => e.name ).includes(templateName.value);
});
const sortNFVMANOList = computed(() => {
  return $array.sortBy(nfv_mano_list.value, 'name', 'asc');
});  
const getPluginList = async () => {  // 顯示 Table 資料
  const res = await PluginList();
  nfv_mano_list.value = res.data;
};
const getTableData = async () => {  // 顯示 Table 資料
  const res = await TemplateList();
  td_list.value = res.data.filter(x => x.templateType == 'NRM');
};
const create_Validate = () => { 
  const set = `${ t('Please') }${ t('select') } ...`;
  const textValidate = text_Validate([repeatName.value, templateName.value]);
  const selectValidate = select_Validate( currentNFVMANO.value, set);
  const validate = textValidate && selectValidate; 
  return validate;
};
const create_template_modal = () => { // 點擊 Create Modal 內創建按鈕
  const createValidate = create_Validate();
  if(createValidate) {
    const alertData = {
      Template: `${ t('template_header', 2) } ${ t('Template') }`,
      configSuccess: t('created'),
      configUnsuccess: t('create'),
    };
    const formName = ['name', 'description', 'nfvoType', 'templateType'];
    const formValue = [templateName.value, templateDescription.value, currentNFVMANO.value, 'NRM'];
    const formData = form(formName, formValue);
    callCreate(formData, [createGenericTemplate, getTableData], alertData);
    closeModal(modalCreate.value);
  }
};
const getFileData = e => { 
  fileData.value = e.target.files;
};
const update_template_validate = () => { 
  const fileValidate = file_Validate(fileData.value[0]);
  return fileValidate;
};
const update_template_button = (id, type) => { // 點擊 Update Modal 按鈕
  get_templateId(id);
  currentNFVMANO.value = type; 
};
const get_templateId = id => { 
  templateId.value = id; 
};
const update_template_modal = async () => { // 點擊 Update Modal 內更新按鈕
  const updateValidate = update_template_validate();
  if(updateValidate) {
    const alertData = {
      Template: `${ t('template_header', 2) } ${ t('Template') }`,
      configSuccess: t('updated'),
      configUnsuccess: t('update'),
    };
    const formName = ['name', 'templateType', 'templateFile'];
    const formValue = [currentNFVMANO.value, 'NRM', fileData.value[0]];
    const formData = form(formName, formValue);
    callUpdate([templateId.value, formData], [updateGenericTemplate, getTableData], alertData);
    closeModal(modalUpdate.value);
  }
};
const delete_template_modal = () => { // 點擊 Delete Modal 內刪除按鈕
  const alertData = {
    Template: `${ t('template_header', 2) } ${ t('Template') }`,
    configSuccess: t('deleted'),
    configUnsuccess: t('delete'),
  };
  callDelete(templateId.value, [deleteGenericTemplate, getTableData], alertData);
};
const updateTableData = val => {  // 每次執行 Table 操作，更新資料 
  filterEntries.value = val;
};
const download_template_button = file => { // 點擊 Download Modal 按鈕
  const alertData = {
    Template: `${ t('template_header', 2) } ${ t('Template') }`,
    configSuccess: t('downloaded'),
    configUnsuccess: t('download'),
  };
  calldownload(file, alertData);
};
const removeCreateData = () => { // 關閉 Create Modal
  templateName.value = '';
  templateDescription.value = '';
  currentNFVMANO.value = `${ t('Please') }${ t('select') } ...`;
  text_invalidated.value = false;
  select_invalidated.value = false;
};
const removeUpdateData = () => { // 關閉 Update Modal
  templateId.value = '';
  fileData.value = {};
  currentNFVMANO.value = `${ t('Please') }${ t('select') } ...`;
  file_invalidated.value = false;
  uploadData_update.value.value = null;
};
const removeDeleteData = () => { // 關閉 Delete Modal
  templateId.value = '';
};

watch(templateName, () => { text_invalidated.value = false; });
watch(fileData, () => { file_invalidated.value = false; });
watch(currentNFVMANO, () => { select_invalidated.value = false; });

onBeforeMount(async () => {
  try {
    await getTableData();
    await getPluginList();
  }
  catch(err) {
    console.log(err);
  }
  await delay(700);
  status.value = true;
});
</script>