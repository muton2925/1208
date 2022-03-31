<template>
  <Table :column="th_list" :entrie="td_list" :columnSort="columnSort" :status="status" @update="updateTableData">
    <template v-slot:header>
      {{ `NFV MANO ${ t('Plugin') }`}}
    </template>
    <template v-slot:button>
      {{ t('Create') }} {{ t('Plugin') }}
    </template>
    <template v-slot:table-name>
      {{ `NFV MANO ${ t('Plugin') } ${ t('list') }`}}
    </template>
    <template v-slot:table-td>
      <tr v-for="item in filterEntries" :key="item.name">
        <td class="tablecell-custom">{{ item.name }}</td>
        <td class="tablecell-custom">{{ item.allocate_nssi }}</td>
        <td class="tablecell-custom">{{ item.deallocate_nssi }}</td>
        <td class="w-0">
          <div class="d-flex justify-content-center form-check form-switch mb-0">
            <input class="form-check-input cursor-pointer" type="checkbox" role="switch" checked>
          </div>
        </td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-warning rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" data-bs-toggle="modal" data-bs-target="#update_plugin_Modal" @click="get_plugin_name(item.name)">
            <i class="bi bi-wrench"></i>
          </div>
        </td>
        <td class="w-0">
          <a :href="item.pluginFile" @click="download_template_button(item.pluginFile)" class="d-flex justify-content-center align-items-center text-white bg-primary rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px">
            <i class="bi bi-arrow-down"></i>
          </a>
        </td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-danger rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" data-bs-toggle="modal" data-bs-target="#delete_plugin_Modal" @click="get_plugin_name(item.name)">
            <i class="bi bi-trash"></i>
          </div>
        </td>
      </tr>
    </template>
  </Table>
  <Modalcreate ref="modalCreate" @remove="removeCreateData">
    <template v-slot:header>
      {{ `${ t('Create') }${ t('new') } NFV MANO ${ t('Plugin') }` }}  
    </template>
    <template v-slot:body>
      <div>
        <div class="mb-3">
          <label for="InputFile" class="form-label">
            {{ `${ t('Plugin') }${ t('Name') } :` }}
          </label>
          <input type="text" class="form-control" :class="{ 'is-invalid' : text_invalidated }" id="InputFile" :placeholder="placeholder" v-model.trim="fileName" @keypress.enter="create_plugin_modal">
          <div class="invalid-feedback">
            <template v-if="repeatName">
              {{ `${ t('this') }${ t('Plugin') }${ t('Name') }${ t('already_exists') }` }}
            </template>
            <template v-else-if="fileName.length > 20">
              {{ `請勿輸入超過 20 個字元` }}
            </template>
            <template v-else>
              {{ `${ t('Plugin') }${ t('Name') }${ t('not_be_empty') }` }}
            </template>
          </div>
        </div>
        <div class="mb-2">
          <label for="UploadFile" class="form-label">
            {{ `${ t('Plugin') }${ t('File') } :` }}
          </label>
          <input type="file" class="form-control" :class="{ 'is-invalid' : file_invalidated }" id="UploadFile" ref="uploadData_create" accept=".zip" @change="getFileData">
          <div class="invalid-feedback">
            {{ `${ t('Plugin') }${ t('File') }${ t('not_be_empty') }` }}
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-primary text-white" @click="create_plugin_modal">{{ t('Create') }}</button>
    </template>
  </Modalcreate>
  <Modalupdate ref="modalUpdate" @remove="removeUpdateData">
    <template v-slot:header>
      {{ `${ t('Update') }${ t('Service') }${ t('Mapping') }${ t('Plugin') }` }}  
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">
            {{ `${ t('Plugin') }${ t('Name') } :` }}
          </label>
          <input type="text" class="form-control" id="InputFile" :placeholder="placeholder" v-model="fileName" readonly>
        </div>
        <div class="mb-2">
          <label for="UploadFile2" class="form-label">
            {{ `${ t('Plugin') }${ t('File') } :` }}
          </label>
          <input type="file" class="form-control" :class="{ 'is-invalid' : file_invalidated }" id="UploadFile2" ref="uploadData_update" accept=".zip" @change="getFileData">
          <div class="invalid-feedback">
            {{ `${ t('File') }${ t('not_be_empty') }` }}
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-warning text-white" @click="update_plugin_modal">{{ t('Update') }}</button>
    </template>
  </Modalupdate>
  <Modaldelete @delete="delete_plugin_modal" @remove="removeDeleteData">
    <template v-slot:header>
      {{ `${ t('Delete') }${ t('Service') }${ t('Mapping') }${ t('Plugin') }` }} 
    </template>
  </Modaldelete>
  <Alert ref="alertRef" v-show="alertExist"></Alert>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import { delay } from '@/assets/js/delay';
import { form } from '@/assets/js/newFormData';
import Table from '../components/global/table.vue';
import { alertConfig } from '@/assets/js/alertData';
import { closeModal } from '@/assets/js/closeModel';
import { Share, nfv_mano_plugin } from '@/assets/js/api';
import { ref, toRefs, watch, computed, onBeforeMount, defineAsyncComponent } from 'vue';
import { callCreate, callUpdate, callDelete, callDownload } from '@/assets/js/templateOperate';
import { text_invalidated, file_invalidated, file_Validate, text_Validate } from '@/assets/js/validate';
const Alert = defineAsyncComponent(() => import(/* webpackChunkName: "Alert" */ '../components/global/alert.vue'));
const Modalcreate = defineAsyncComponent(() => import(/* webpackChunkName: "Modalcreate" */ '../components/global/modal-create.vue'));
const Modalupdate = defineAsyncComponent(() => import(/* webpackChunkName: "Modalupdate" */ '../components/global/modal-update.vue'));
const Modaldelete = defineAsyncComponent(() => import(/* webpackChunkName: "Modaldelete" */ '../components/global/modal-delete.vue'));
const { PluginList } = Share();
const { createPluginList, updatePlugin, deletePlugin } = nfv_mano_plugin();
const modalCreate = ref(null);
const modalUpdate = ref(null);
const uploadData_create = ref(null);
const uploadData_update = ref(null);
const { t, locale } = useI18n();
let placeholder;
const th_list = [
  { name: "name", text: `${ t("Plugin") }${ t("Name") }` },
  { name: "allocate_nssi", text: `${ t("Allocate") }NSSI${ t("File") }` },
  { name: "dellocate_nssi", text: `${ t("Deallocate") }NSSI${ t("File") }` },
  { name: "template_share", text: `分 享` },
  { name: "update_plugin", text: t("Update") },
  { name: "plugin_file", text: t("Download") },
  { name: "delete_plugin", text: t("Delete") },
];
const td_list = ref([]);
const fileName = ref('');
const fileData = ref({});
const status = ref(false);
const filterEntries = ref([]);
const { alertRef, alertExist } = toRefs(alertConfig);
const columnSort = ['name', 'allocate_nssi', 'dellocate_nssi'];
const repeatName = computed(() => { 
  return td_list.value.map(e => { return e.name }).includes(fileName.value); 
});
if(locale.value == 'en') 
  placeholder = `${ t('Please') }${ t('enter', ['a '])}${ t('Plugin') }${ t('Name') }`;
else 
  placeholder = `${ t('Please') }${ t('enter') }${ t('Plugin') }${ t('Name') }`;
const get_plugin_name = name => { // Update Modal 內名稱
  fileName.value = name; 
}; 
const getFileData = e => { // 更新 Update Modal 內檔案
  fileData.value = e.target.files;
}; 
const getTableData = async () => { // 顯示 Table 資料
  const res = await PluginList();
  td_list.value = res.data;
};
const create_validate = () => {  // Create Modal 驗證
  const textValidate = text_Validate([repeatName.value, fileName.value]);
  const fileValidate = file_Validate(fileData.value[0]);
  const validate = textValidate && fileValidate; 
  return validate;
};
const create_plugin_modal = () => { // 點擊 Create Modal 內創建按鈕
  const createValidate = create_validate();
  if(createValidate) {
    const formData = form(["name", "pluginFile"], [fileName.value, fileData.value[0]]);
    const alertData = {
      Template: `NFV MANO ${ t('Plugin') }`,
      configSuccess: t('created'),
      configUnsuccess: t('create'),
    };
    callCreate(formData, [createPluginList, getTableData], alertData);
    closeModal(modalCreate.value);
  }
};
const update_plugin_validate = () => { // Update Modal 驗證
  const fileValidate = file_Validate(fileData.value[0]);
  return fileValidate;
};
const update_plugin_modal = () => { // 點擊 Update Modal 內更新按鈕
  const updateValidate = update_plugin_validate();
  if(updateValidate) {
    const formData = form(["name", "pluginFile"], [fileName.value, fileData.value[0]]);
    const alertData = {
      Template: `NFV MANO ${t('Plugin')}`,
      configSuccess: t('updated'),
      configUnsuccess: t('update'),
    };
    callUpdate([fileName.value, formData], [updatePlugin, getTableData], alertData);
    closeModal(modalUpdate.value);
  }
};
const delete_plugin_modal = () => { // 點擊 Delete Modal 內刪除按鈕
  const alertData = {
    Template: `NFV MANO ${ t('Plugin') }`,
    configSuccess: t('deleted'),
    configUnsuccess: t('delete'),
  };
  callDelete(fileName.value, [deletePlugin, getTableData], alertData);
};
const updateTableData = val => {  // 每次執行 Table 操作，更新資料 
  filterEntries.value = val;
};
const removeCreateData = () => { // 關閉 Create Modal
  fileName.value = '';
  fileData.value = {};
  text_invalidated.value = false;
  file_invalidated.value = false;
  uploadData_create.value.value = null;
};
const removeUpdateData = () => { // 關閉 Update Modal
  fileName.value = '';
  fileData.value = {};
  file_invalidated.value = false;
  uploadData_update.value.value = null; 
};
const removeDeleteData = () => { // 關閉 Delete Modal
  fileName.value = '';
};
const download_template_button = file => { // 點擊 Download Modal 按鈕
  const alertData = {
    Template: `NFV MANO ${t('Plugin')}`,
    configSuccess: t('downloaded '),
    configUnsuccess: t('download'),
  };
  callDownload(file, alertData);
};

watch(fileName, () => { text_invalidated.value = false; });
watch(fileData, () => { file_invalidated.value = false; });

onBeforeMount(async () => {

  try {
    await getTableData();
  }
  catch(err) {
    console.log(err);
  }
  await delay(700);
  status.value = true;
});
</script>