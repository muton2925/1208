<template>
  <Table v-if="status" :column="th_list" :entrie="td_list" :columnSort="columnSort" :columnNumber="columnNumber" @update="updateData">
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
        <td>{{ item.name }}</td>
        <td>{{ item.allocate_nssi }}</td>
        <td>{{ item.deallocate_nssi }}</td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-warning rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" data-bs-toggle="modal" data-bs-target="#update_plugin_Modal" @click="update_plugin(item.name)">
            <i class="bi bi-wrench"></i>
          </div>
        </td>
        <td class="w-0">
          <a :href="item.pluginFile">
          <div class="d-flex justify-content-center align-items-center text-white bg-primary rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" >
            <i class="bi bi-arrow-down"></i>
          </div>
          </a>
        </td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-danger rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" data-bs-toggle="modal" data-bs-target="#delete_plugin_Modal" @click="delete_plugin(item)">
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
      <form :class="{ 'was-invalidated': isinvalidated }">
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
          <input type="file" class="form-control" :class="{ 'is-invalid' : file_invalidated }" id="UploadFile" ref="uploadData_create" accept=".zip" @change="add_plugin">
          <div class="invalid-feedback">
            檔案不得為空
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-primary text-white" @click="create_plugin">Create</button>
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
            Plugin Name :
          </label>
          <input type="text" class="form-control" id="InputFile" placeholder="請輸入 Plugin 名稱" v-model="fileName" readonly>
        </div>
        <div class="mb-2">
          <label for="UploadFile2" class="form-label">
            Plugin File :
          </label>
          <input type="file" class="form-control" :class="{ 'is-invalid' : file_invalidated }" id="UploadFile2" ref="uploadData_update" accept=".zip" @change="add_plugin">
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
  <Modaldelete @delete="deleteData" @remove="removeFile"></Modaldelete>
</template>
<script>
import Modalcreate from '../components/global/modal-create.vue';
import Modalupdate from '../components/global/modal-update.vue';
import Modaldelete from '../components/global/modal-delete.vue';
import Table from '../components/global/table.vue';
import { ref } from 'vue';
import { $array } from 'alga-js';
import { Share } from '../assets/js/api';
import { nfv_mano_plugin } from '../assets/js/api';
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
  async created() {
    await this.getTableData();
    this.status = true;
  },
  data() {
    return {
      filterEntries: [],
      status: true,
      th_list: [
        { name: "name", text: "Plugin Name", sort: true, status: 'none' },
        { name: "allocate_nssi", text: "Allocate NSSI File", sort: true, status: 'none' },
        { name: "dellocate_nssi", text: "Deallocate NSSI File", sort: true, status: 'none' },
        { name: "update_plugin", text: "Update Plugin", sort: false, status: 'none' },
        { name: "plugin_file", text: "Plugin File", sort: false, status: 'none' },
        { name: "delete_plugin", text: "Delete Plugin", sort: false, status: 'none' },
      ],
      td_list:[],
      columnSort: ['name','allocate_nssi','dellocate_nssi'],
      columnNumber: 6,
      fileName: '',
      fileData: {},
      text_invalidated: false, //文字是否未通過認證
      file_invalidated: false
    };
  },
  computed: {
    isinvalidated() {
      return this.text_invalidated || this.file_invalidated;
    },
    repeatName() {
      return this.td_list.map(function(e) { return e.name }).includes(this.fileName);
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
  methods: {
    async getTableData(){
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
    updateData(val) {  // emit
      this.filterEntries = val;
    },
    deleteData() { // emit
      const { deletePlugin } = nfv_mano_plugin();
      deletePlugin(this.fileData.name)
      .then(() => {
        let index = this.td_list.indexOf(this.fileData);
        this.td_list = $array.destroy(this.td_list, index);
        this.removeFile();
      })
      .catch(res => {
        console.log(res)
        this.removeFile();
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
    removeCreateData() {
      this.removeData();
      this.validate_clear();
      this.$refs.uploadData_create.value = null;
    },
    removeUpdateData() {
      this.removeData();
      this.validate_clear();
      this.$refs.uploadData_update.value = null;
    },
    add_plugin(e) {
      this.fileData = e.target.files;
    },
    create_plugin() {
      this.create_validate(); 
      if(this.isinvalidated == false) {
        const { createPluginList } = nfv_mano_plugin();
        let form = new FormData();
        form.append("name", this.fileName);
        form.append("pluginFile", this.fileData[0]);
        createPluginList(form)
        .then(() => {
          this.getTableData();
          this.$refs.modalCreate.closeModalEvent();
          this.removeCreateData();
        })
        .catch(res => {
          console.log(res);
          this.removeCreateData();
        })
      }
    },
    create_validate() {
      if(this.repeatName || this.fileName == '') {
        this.text_invalidated = true;
      }
      if(this.fileData[0] == null) {
        this.file_invalidated = true;
      }
    },
    update_validate() {
      if(this.fileData[0] == null) {
        this.file_invalidated = true;
      } 
    },
    update_plugin(name) {
      this.fileName = name;
    },
    update_plugin_modal() {
      this.update_validate();
      if(this.isinvalidated == false) {
        const { updatePlugin } = nfv_mano_plugin();
        let form = new FormData();
        form.append("name", this.fileName);
        form.append("pluginFile", this.fileData[0]);
        updatePlugin(this.fileName,form)
        .then((res) => {
          const index = this.td_list.map(function(e) { return e.name }).indexOf(this.fileName);
          this.td_list[index].pluginFile = res.data.pluginFile;
          this.$refs.modalUpdate.closeModalEvent();
          this.removeUpdateData();
        })
        .catch(res => {
          console.log(res);
          this.removeUpdateData();
        })
      }
    },
    delete_plugin(file) {
      this.fileData = file;
    },
  }
}
</script>
<style scoped>

</style>

