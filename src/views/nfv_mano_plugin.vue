<template>
  <Table v-if="status" :column="th_list" :entrie="td_list" :columnSort="columnSort" :columnNumber="columnNumber" @update="updateTableData">
    <template v-slot:header>
      NFV MANO Plugin
    </template>
    <template v-slot:button>
      Create Plugin
    </template>
    <template v-slot:table-name>
      NFV MANO Plugin List
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
          <a :href="item.pluginFile" class="d-flex justify-content-center align-items-center text-white bg-primary rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" >
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
      Create new NFV MANO Plugin
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">Plugin Name :</label>
          <input type="text" class="form-control" :class="{ 'is-invalid' : text_invalidated }" id="InputFile" placeholder="請輸入 Plugin 名稱" v-model="fileName">
          <div class="invalid-feedback">
            <template v-if="repeatName">
              此 Plugin 名稱已存在
            </template>
            <template v-else>
              Plugin 名稱不得為空
            </template>
          </div>
        </div>
        <div class="mb-2">
          <label for="UploadFile" class="form-label">Plugin File :</label>
          <input type="file" class="form-control" :class="{ 'is-invalid' : file_invalidated }" id="UploadFile" ref="uploadData_create" accept=".zip" @change="create_plugin_file">
          <div class="invalid-feedback">
            檔案不得為空
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-primary text-white" @click="create_plugin_modal">Create</button>
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
            Plugin Name :
          </label>
          <input type="text" class="form-control" id="InputFile" placeholder="請輸入 Plugin 名稱" v-model="fileName" readonly>
        </div>
        <div class="mb-2">
          <label for="UploadFile2" class="form-label">
            Plugin File :
          </label>
          <input type="file" class="form-control" :class="{ 'is-invalid' : file_invalidated }" id="UploadFile2" ref="uploadData_update" accept=".zip" @change="update_plugin_file">
          <div class="invalid-feedback">
            檔案不得為空
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-warning text-white" @click="update_plugin_modal">Update</button>
    </template>
  </Modalupdate>
  <Modaldelete @delete="delete_plugin_modal" @remove="removeDeleteData">
    <template v-slot:header>
      Delete Service Mapping Plugin
    </template>
  </Modaldelete>
</template>
<script>
import { ref } from 'vue';
import { Share } from '../assets/js/api';
import { defineAsyncComponent } from 'vue';
import { nfv_mano_plugin } from '../assets/js/api';
import Table from '../components/global/table.vue';
const Modalcreate = defineAsyncComponent(() => import(/* webpackChunkName: "Modalcreate" */ '../components/global/modal-create.vue'));
const Modalupdate = defineAsyncComponent(() => import(/* webpackChunkName: "Modalupdate" */ '../components/global/modal-update.vue'));
const Modaldelete = defineAsyncComponent(() => import(/* webpackChunkName: "Modaldelete" */ '../components/global/modal-delete.vue'));
export default {
  components: {
    Table,
    Modalcreate,
    Modalupdate,
    Modaldelete,
  },
  setup() {
    const modalCreate = ref(null)
    const modalUpdate = ref(null)
    const uploadData_create = ref(null)
    const uploadData_update = ref(null)
    return{
      modalCreate,
      modalUpdate,
      uploadData_update,
      uploadData_create,
    }
  },
  data() {
    return {
      status: true,
      filterEntries: [],
      th_list: [
        { name: "name", text: "Plugin Name", sort: true, status: 'none' },
        { name: "allocate_nssi", text: "Allocate NSSI File", sort: true, status: 'none' },
        { name: "dellocate_nssi", text: "Deallocate NSSI File", sort: true, status: 'none' },
        { name: "update_plugin", text: "Update", sort: false, status: 'none' },
        { name: "plugin_file", text: "Download", sort: false, status: 'none' },
        { name: "delete_plugin", text: "Delete", sort: false, status: 'none' },
      ],
      td_list: [],
      columnSort: ['name','allocate_nssi','dellocate_nssi'],
      columnNumber: 6,
      fileName: '',
      fileData: {},
      text_invalidated: false, //文字是否未通過認證
      file_invalidated: false
    };
  },
  computed: {
    repeatName() {
      return this.td_list.map(function(e) { return e.name }).includes(this.fileName);
    }
  },
  watch: {
    fileName: {
      handler: function() {
        this.text_invalidated = false;
      }
    },
    fileData: {
      handler: function() {
        this.file_invalidated = false;
      }
    }
  },
  async created() {
    await this.getTableData();
    this.status = true;
  },
  methods: {
    async getTableData() { // 顯示 Table 資料
      const { PluginList } = Share();
      await PluginList()
      .then(res => {
        this.td_list = [];
        for(let i of res.data){     
          this.td_list.push(i);
        }
      })
      .catch(res => {
        console.log(res);
        })
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
    create_plugin_modal() { // 點擊 Create Modal 內創建按鈕
      this.create_plugin_validate(); 
      if(this.text_invalidated == false && this.file_invalidated == false) {
        const { createPluginList } = nfv_mano_plugin();
        let form = new FormData();
        form.append("name", this.fileName);
        form.append("pluginFile", this.fileData[0]);
        createPluginList(form)
        .then(() => {
          this.$refs.modalCreate.closeModalEvent();
          this.getTableData();
        })
        .catch(res => {
          console.log(res);
        })
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
    update_plugin_modal() { // 點擊 Update Modal 內更新按鈕
      this.update_plugin_validate();
      if(this.file_invalidated == false) {
        const { updatePlugin } = nfv_mano_plugin();
        let form = new FormData();
        form.append("name", this.fileName);
        form.append("pluginFile", this.fileData[0]);
        updatePlugin(this.fileName,form)
        .then(() => {
          this.$refs.modalUpdate.closeModalEvent();
          this.getTableData();
        })
        .catch(res => {
          console.log(res);
        })
      }
    },
    delete_plugin_button(file) { // 點擊 Delete Modal 按鈕
      this.fileData = file;
    },
    delete_plugin_modal() { // 點擊 Delete Modal 內刪除按鈕
      const { deletePlugin } = nfv_mano_plugin();
      deletePlugin(this.fileData.name)
      .then(() => {
        this.getTableData();
      })
      .catch(res => {
        console.log(res)
      })
    },
  }
}
</script>