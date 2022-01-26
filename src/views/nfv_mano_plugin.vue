<template>
  <Table :column="th_list" :entrie="td_list" :columnSort="columnSort" :columnNumber="columnNumber" @update="updateTableData" :status="status">
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
          <div class="d-flex justify-content-center align-items-center text-white bg-warning rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" data-bs-toggle="modal" data-bs-target="#update_plugin_Modal" @click="update_plugin_button(item.name)">
            <i class="bi bi-wrench"></i>
          </div>
        </td>
        <td class="w-0">
          <a :href="item.pluginFile" @click="download_template_button(item.pluginFile)" class="d-flex justify-content-center align-items-center text-white bg-primary rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px">
            <i class="bi bi-arrow-down"></i>
          </a>
        </td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-danger rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" data-bs-toggle="modal" data-bs-target="#delete_plugin_Modal" @click="delete_plugin_button(item)">
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
          <input type="file" class="form-control" :class="{ 'is-invalid' : file_invalidated }" id="UploadFile" ref="uploadData_create" accept=".zip" @change="create_plugin_file">
          <div class="invalid-feedback">
            檔案不得為空
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
          <input type="file" class="form-control" :class="{ 'is-invalid' : file_invalidated }" id="UploadFile2" ref="uploadData_update" accept=".zip" @change="update_plugin_file">
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
<script>
import { ref } from 'vue';
import { Share } from '../assets/js/api';
import { defineAsyncComponent } from 'vue';
import { nfv_mano_plugin } from '../assets/js/api';
import Table from '../components/global/table.vue';
import { useI18n } from 'vue-i18n'
const { PluginList } = Share();
const { createPluginList, updatePlugin, deletePlugin } = nfv_mano_plugin();
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
    const uploadData_create = ref(null)
    const uploadData_update = ref(null)
    const { t, locale } = useI18n()
    let placeholder;
    if(locale.value == 'en'){
      placeholder = `${t('Please')}${t('enter',['a '])}${t('Plugin')}${t('Name')}`
    }else{
      placeholder = `${t('Please')}${t('enter')}${t('Plugin')}${t('Name')}`
    }
    const th_list = [
        { name: "name", text: `${t("Plugin")}${t("Name")}` },
        { name: "allocate_nssi", text: `${t("Allocate")}NSSI${t("File")}` },
        { name: "dellocate_nssi", text: `${t("Deallocate")}NSSI${t("File")}` },
        { name: "update_plugin", text: t("Update") },
        { name: "plugin_file", text: t("Download") },
        { name: "delete_plugin", text: t("Delete") },
      ]
    return{
      modalCreate,
      modalUpdate,
      uploadData_update,
      uploadData_create,
      t,
      placeholder,
      th_list
    }
  },
  data() {
    return {
      status: false,
      filterEntries: [],
      // th_list: [
      //   { name: "name", text: "Plugin Name" },
      //   { name: "allocate_nssi", text: "Allocate NSSI File" },
      //   { name: "dellocate_nssi", text: "Deallocate NSSI File" },
      //   { name: "update_plugin", text: "Update" },
      //   { name: "plugin_file", text: "Download" },
      //   { name: "delete_plugin", text: "Delete" },
      // ],
      td_list: [],
      columnSort: ['name','allocate_nssi','dellocate_nssi'],
      columnNumber: 6,
      fileName: '',
      fileData: {},
      text_invalidated: false, //文字是否未通過認證
      file_invalidated: false,
      alertInfo: {
        alertExist: false,
        alertStatus: false,
        alertColor: '',
        alertIcon: '',
        alertTitle: '',
        alertContent: '',
      }
    };
  },
  computed: {
    repeatName() {
      return this.td_list.map(function(e) { return e.name }).includes(this.fileName);
    }
  },
  watch: {
    fileName() {
      this.text_invalidated = false;
    },
    fileData() {
      this.file_invalidated = false;
    }
  },
  async created() {
    try {
      await this.getTableData();
    }
    catch(err) {
      console.log(err);
    }
    await this.delay(700);
    this.status = true;
  },
  methods: {
    async getTableData() { // 顯示 Table 資料
      const res = await PluginList();
      this.td_list = [];
      for(let i of res.data) {     
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
      this.fileName = '';
      this.fileData = {};
      this.text_invalidated = false;
      this.file_invalidated = false;
      this.$refs.uploadData_create.value = null;
    },
    removeUpdateData() { // 關閉 Update Modal
      this.fileName = '';
      this.fileData = {};
      this.file_invalidated = false;
      this.$refs.uploadData_update.value = null;
    },
    removeDeleteData() { // 關閉 Delete Modal
      this.fileData = {};
    },
    create_plugin_file(e) { // 新增 Update Modal 內檔案
      this.fileData = e.target.files;
    },
    create_plugin_validate() { // 驗證 Create Modal
      if(this.repeatName || this.fileName == '') {
        this.text_invalidated = true;
      }
      if(this.fileData[0] == null) {
        this.file_invalidated = true;
      }
    },
    async create_plugin_modal() { // 點擊 Create Modal 內創建按鈕
      this.create_plugin_validate(); 
      if(this.text_invalidated == false && this.file_invalidated == false) {
        let form = new FormData();
        form.append("name", this.fileName);
        form.append("pluginFile", this.fileData[0]);
        try {
          await createPluginList(form);
          await this.getTableData();
          this.setAlertData('alert-success', 'bi bi-check-circle-fill', 'Operates Successfully', 'NFV MANO Plugin has been created !');
        }
        catch(error) {
          console.log(error);
          this.setAlertData('alert-danger', 'bi bi-x-circle-fill', 'Operates Unsuccessfully', 'Fail to create the NFV MANO Plugin !');
        }
        this.$refs.modalCreate.closeModalEvent();
      }
    },
    update_plugin_file(e) { // 更新 Update Modal 內檔案
      this.fileData = e.target.files;
    },
    update_plugin_validate() { 
      if(this.fileData[0] == null) { // 驗證 Update Modal
        this.file_invalidated = true;
      } 
    },
    update_plugin_button(name) { // 點擊 Update Modal 按鈕
      this.fileName = name;
    },
    async update_plugin_modal() { // 點擊 Update Modal 內更新按鈕
      this.update_plugin_validate();
      if(this.file_invalidated == false) {
        let form = new FormData();
        form.append("name", this.fileName);
        form.append("pluginFile", this.fileData[0]);
        try {
          await updatePlugin(this.fileName,form);
          await this.getTableData();
          this.setAlertData('alert-success', 'bi bi-check-circle-fill', 'Operates Successfully', 'NFV MANO Plugin has been updated !');
        }
        catch(error) {
          console.log(error);
          this.setAlertData('alert-danger', 'bi bi-x-circle-fill', 'Operates Unsuccessfully', 'Fail to update the NFV MANO Plugin !');
        }
        this.$refs.modalUpdate.closeModalEvent();
      }
    },
    download_template_button(file) { // 點擊 Download Modal 按鈕
      if(file == null)
        this.setAlertData('alert-danger', 'bi bi-x-circle-fill', 'Operates Unsuccessfully', 'Fail to download the NFV MANO Plugin !');
      else
        this.setAlertData('alert-success', 'bi bi-check-circle-fill', 'Operates Successfully', 'NFV MANO Plugin has been downloaded !');
    },
    delete_plugin_button(file) { // 點擊 Delete Modal 按鈕
      this.fileData = file;
    },
    async delete_plugin_modal() { // 點擊 Delete Modal 內刪除按鈕
      try {
        await deletePlugin(this.fileData.name)
        await this.getTableData();
        this.setAlertData('alert-success', 'bi bi-check-circle-fill', 'Operates Successfully', 'NFV MANO Plugin has been deleted !');
      }
      catch(error) {
        console.log(error);
        this.setAlertData('alert-danger', 'bi bi-x-circle-fill', 'Operates Unsuccessfully', 'Fail to delete the NFV MANO Plugin !');
      }
    },
  }
}
</script>