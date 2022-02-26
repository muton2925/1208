<template>
  <Table :column="th_list" :entrie="td_list" :columnSort="columnSort"  @update="updateTableData" :status="status">
    <template v-slot:header>
      <!-- {{ t('Plugin_header') }}{{ t('Plugin') }} -->
      {{ `NFV MANO ${t('Plugin')}`}}
      <!-- NFV MANO Plugin -->
    </template>
    <template v-slot:button>
      {{ t('Create') }} {{ t('Plugin') }}
      <!-- Create Plugin -->
    </template>
    <template v-slot:table-name>
      {{ `NFV MANO ${t('Plugin')} ${t('list')}   `}}
      <!-- NFV MANO Plugin List -->
    </template>
    <template v-slot:table-td>
      <tr v-for="item in filterEntries" :key="item.name">
        <td class="tablecell-custom">{{ item.name }}</td>
        <td class="tablecell-custom">{{ item.allocate_nssi }}</td>
        <td class="tablecell-custom">{{ item.deallocate_nssi }}</td>
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
      {{  `${t('Create')}${t('new')} NFV MANO ${t('Plugin')}` }}  
      <!-- Create new NFV MANO Plugin -->
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">
            {{  `${t('Plugin')}${t('Name')} :` }}
            <!-- Plugin Name : -->

          </label>
          <input type="text" class="form-control" :class="{ 'is-invalid' : text_invalidated }" id="InputFile" :placeholder="placeholder" v-model="fileName">
          <div class="invalid-feedback">
            <template v-if="repeatName">
              {{  `${t('this')}${t('Plugin')}${t('Name')}${t('already_exists')}` }}
              <!-- 此 Plugin 名稱已存在 -->
            </template>
            <template v-else>
               {{  `${t('Plugin')}${t('Name')}${t('not_be_empty')}` }}
              <!-- Plugin 名稱不得為空 -->
            </template>
          </div>
        </div>
        <div class="mb-2">
          <label for="UploadFile" class="form-label">
            {{  `${t('Plugin')}${t('File')} :` }}
            <!-- Plugin File : -->
          </label>
          <input type="file" class="form-control" :class="{ 'is-invalid' : file_invalidated }" id="UploadFile" ref="uploadData_create" accept=".zip" @change="getFileData">
          <div class="invalid-feedback">
            {{  `${t('Plugin')}${t('File')}${t('not_be_empty')}` }}
            <!-- 檔案不得為空 -->
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-primary text-white" @click="create_plugin_modal">{{t('Create')}}</button>
    </template>
  </Modalcreate>
  <Modalupdate ref="modalUpdate" @remove="removeUpdateData">
    <template v-slot:header>
      {{  `${t('Update')}${t('Service')}${t('Mapping')}${t('Plugin')}` }}  
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">
            {{  `${t('Plugin')}${t('Name')} :` }}
            <!-- Plugin Name : -->
          </label>
          <input type="text" class="form-control" id="InputFile" :placeholder="placeholder" v-model="fileName" readonly>
        </div>
        <div class="mb-2">
          <label for="UploadFile2" class="form-label">
            {{  `${t('Plugin')}${t('File')} :` }}
            <!-- Plugin File : -->
          </label>
          <input type="file" class="form-control" :class="{ 'is-invalid' : file_invalidated }" id="UploadFile2" ref="uploadData_update" accept=".zip" @change="getFileData">
          <div class="invalid-feedback">
            檔案不得為空
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-warning text-white" @click="update_plugin_modal">{{t('Update')}}</button>
    </template>
  </Modalupdate>
  <Modaldelete @delete="delete_plugin_modal" @remove="removeDeleteData">
    <template v-slot:header>
      {{  `${t('Delete')}${t('Service')}${t('Mapping')}${t('Plugin')}` }} 
      <!-- Delete Service Mapping Plugin -->
    </template>
  </Modaldelete>
  <Alert v-show="alertInfo.alertExist" v-bind="alertInfo"></Alert>
</template>
<script setup>
  import { computed, onBeforeMount, ref, watch } from 'vue';
  import { Share } from '../assets/js/api';
  import { defineAsyncComponent } from 'vue';
  import { nfv_mano_plugin } from '../assets/js/api';
  import Table from '../components/global/table.vue';
  import { useI18n } from 'vue-i18n'
  import { delay } from '../assets/js/delay'
  import { form } from '../assets/js/newFormData'
  import { callCreate } from '../assets/js/create'
  import { callUpdate } from '../assets/js/upload'
  import { callDelete } from '../assets/js/delete'
  import { text_invalidated, file_invalidated, file_Validate, text_Validate } from '../assets/js/validate'
  const { PluginList } = Share();
  const { createPluginList, updatePlugin, deletePlugin } = nfv_mano_plugin();
  const Alert = defineAsyncComponent(() => import(/* webpackChunkName: "Alert" */ '../components/global/alert.vue'));
  const Modalcreate = defineAsyncComponent(() => import(/* webpackChunkName: "Modalcreate" */ '../components/global/modal-create.vue'));
  const Modalupdate = defineAsyncComponent(() => import(/* webpackChunkName: "Modalupdate" */ '../components/global/modal-update.vue'));
  const Modaldelete = defineAsyncComponent(() => import(/* webpackChunkName: "Modaldelete" */ '../components/global/modal-delete.vue'));
  const modalCreate = ref(null)
  const modalUpdate = ref(null)
  const uploadData_create = ref(null)
  const uploadData_update = ref(null)
  const { t, locale } = useI18n()
  const th_list = [
      { name: "name", text: `${t("Plugin")}${t("Name")}` },
      { name: "allocate_nssi", text: `${t("Allocate")}NSSI${t("File")}` },
      { name: "dellocate_nssi", text: `${t("Deallocate")}NSSI${t("File")}` },
      { name: "update_plugin", text: t("Update") },
      { name: "plugin_file", text: t("Download") },
      { name: "delete_plugin", text: t("Delete") },
    ]
  const fileData = ref({})
  const filterEntries = ref([])
  const columnSort = ref(['name','allocate_nssi','dellocate_nssi'])
  const alertInfo = ref( {
      alertExist: false,
      alertStatus: false,
      alertColor: '',
      alertIcon: '',
      alertTitle: '',
      alertContent: '',
  })
  let placeholder;
  let td_list =  ref([])
  let status = ref(false)
  let fileName = ref('')
  
  if(locale.value == 'en'){
    placeholder = `${t('Please')}${t('enter',['a '])}${t('Plugin')}${t('Name')}`
  }else{
    placeholder = `${t('Please')}${t('enter')}${t('Plugin')}${t('Name')}`
  }
  
  onBeforeMount(async ()=> {
    try {
      await getTableData();
    }
    catch(err) {
      console.log(err);
    }
    await delay(700);
    status.value = true;
  })
  
  const repeatName = computed(()=>{
    return td_list.value.map(e => { return e.name }).includes(fileName.value)
  })   
  
  watch(fileName,()=>{ text_invalidated.value = false; })
  watch(fileData,()=>{ file_invalidated.value = false; })
  
  const getTableData = async () => { // 顯示 Table 資料
    const res = await PluginList();
    td_list.value = [];
    for(let i of res.data) {     
      td_list.value.push(i);
    }
  }
   // 更新 Update Modal 內檔案
  const getFileData = e => { fileData.value = e.target.files; }
  const create_Validate = () => { 
    const textValidate = text_Validate( [repeatName.value, fileName.value] );
    const fileValidate = file_Validate( fileData.value[0] );
    const validate = textValidate && fileValidate; 
    return validate
  }
  const  create_plugin_modal = () => { // 點擊 Create Modal 內創建按鈕
    const createValidate = create_Validate()
    if(createValidate) {
      const formData = form(["name", "pluginFile"], [fileName.value, fileData.value[0]] )
      callCreate( formData, modalCreate.value, [createPluginList, getTableData] )
    }
  }
  const update_plugin_validate = () => { 
    const fileValidate = file_Validate( fileData.value[0] );
    return fileValidate
  }
  const get_plugin_name = name =>  { fileName.value = name; }
  const update_plugin_modal = () => { // 點擊 Update Modal 內更新按鈕
    const updateValidate = update_plugin_validate()
    if(updateValidate) {
      const formData = form(["name", "pluginFile"], [fileName.value, fileData.value[0]])
      callUpdate([fileName.value, formData], modalUpdate.value, [updatePlugin, getTableData])
    }
  }
  const delete_plugin_modal = () => { // 點擊 Delete Modal 內刪除按鈕
    callDelete(fileName.value, [deletePlugin, getTableData])
  }
  async function setAlertData(color,icon,title,content) { // alert 的樣式
    alertInfo.value.alertStatus = false; // 避免重複動作太快
    alertInfo.value.alertExist = false; // 避免重複動作太快
    alertInfo.value.alertColor = color;
    alertInfo.value.alertIcon = icon;
    alertInfo.value.alertTitle = title;
    alertInfo.value.alertContent = content;
    alertInfo.value.alertStatus = true;
    alertInfo.value.alertExist = true;
    await delay(1500);
    alertInfo.value.alertStatus = false;
    await delay(100);
    alertInfo.value.alertExist = false;
    alertInfo.value.alertColor = '';
    alertInfo.value.alertIcon = '';
    alertInfo.value.alertTitle = '';
    alertInfo.value.alertContent = '';
  }
  const updateTableData = val => {  // 每次執行 Table 操作，更新資料 
    filterEntries.value = val;
  }
  const removeCreateData = () => { // 關閉 Create Modal
    fileName.value = '';
    fileData.value = {};
    text_invalidated.value = false;
    file_invalidated.value = false;
    uploadData_create.value.value = null;
  }
  const removeUpdateData = () => { // 關閉 Update Modal
    fileName.value = '';
    fileData.value = {};
    file_invalidated.value = false;
    uploadData_update.value.value = null; 
  }
  const removeDeleteData = () => { // 關閉 Delete Modal
    fileName.value = '';
  }
  const download_template_button = file => { // 點擊 Download Modal 按鈕
    if(file == null)
      setAlertData('alert-danger', 'bi bi-x-circle-fill', 'Operates Unsuccessfully', 'Fail to download the NFV MANO Plugin !');
    else
      setAlertData('alert-success', 'bi bi-check-circle-fill', 'Operates Successfully', 'NFV MANO Plugin has been downloaded !');
  }



</script>