<template>
  <Table :column="th_list" :entrie="td_list" :columnSort="columnSort" @update="updateTableData">
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
      Create new NFV MANO Plugin
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">Plugin Name :</label>
          <input type="text" class="form-control" :class="{ 'is-invalid' : text_invalidated }" id="InputFile" placeholder="請輸入 Plugin 名稱" v-model="fileName">
          <div class="invalid-feedback">
            <template v-if="!fileName">
              Plugin 名稱不得為空
            </template>
            <template v-else>
              此 Plugin 名稱已存在
            </template>
          </div>
        </div>
        <div class="mb-2">
          <label for="UploadFile" class="form-label">Plugin File :</label>
          <input type="file" class="form-control" :class="{ 'is-invalid' : file_invalidated }" id="UploadFile" ref="uploadData_create" accept=".zip" @change="change_plugin_file">
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
          <input type="file" class="form-control" :class="{ 'is-invalid' : file_invalidated }" id="UploadFile2" ref="uploadData_update" accept=".zip" @change="change_plugin_file">
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
  <Modaldelete ref="modalDelete" @remove="removeDeleteData" @delete="delete_plugin_modal">
    <template v-slot:header>
      Delete Service Mapping Plugin
    </template>
  </Modaldelete>
  <Alert ref="alert" v-show="alertExist"></Alert>
</template>
<script>
import { useStore } from 'vuex';
import Table from '../components/global/table.vue';
import { Share, nfv_mano_plugin } from '../assets/js/api';
import { ref, watch, defineAsyncComponent, onMounted, onUnmounted } from 'vue';
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
    const store = useStore();
    const alertExist = ref(false);
    const filterEntries = ref([]);
    const columnSort = ref(['name','allocate_nssi','dellocate_nssi']);
    const th_list = ref([
      { name: "name", text: "Plugin Name" },
      { name: "allocate_nssi", text: "Allocate NSSI File" },
      { name: "dellocate_nssi", text: "Deallocate NSSI File" },
      { name: "update_plugin", text: "Update" },
      { name: "plugin_file", text: "Download" },
      { name: "delete_plugin", text: "Delete" },
    ]);
    const td_list = ref([]);
    const fileName = ref('');
    const fileData = ref({});
    const text_invalidated = ref(false);
    const file_invalidated = ref(false);
    const getTableData = async () => {
      const res = await PluginList();
      td_list.value = [];
      for (let i of res.data) {
        td_list.value.push(i);
      }
    };
    const delay = (interval) => {
      return new Promise((resolve) => {
        setTimeout(resolve, interval);
      });
    };
    const alertEvent = async (status, name, action) => {
      alertExist.value = true;
      await alert.value.alertInfo(status, name, action);
      await delay(100);
      alertExist.value = false;
    };
    const updateTableData = val => {
      filterEntries.value = val;
    }
    const removeCreateData = () => {
      fileName.value = '';
      fileData.value = {};
      text_invalidated.value = false;
      file_invalidated.value = false;
      uploadData_create.value.value = null;
    };
    const removeUpdateData = () => {
      fileName.value = '';
      fileData.value = {};
      file_invalidated.value = false;
      uploadData_update.value.value = null;
    };
    const removeDeleteData = () => {
      fileData.value = {};
    };
    const change_plugin_file = e => {
      fileData.value = e.target.files;
    };
    const create_plugin_validate = () => {
      const repeatName = td_list.value.map(e => e.name).includes(fileName.value);
      if(!fileName.value || repeatName)
        text_invalidated.value = true;
      if(fileData.value[0] == null)
        file_invalidated.value = true;
    };
    const create_plugin_modal = async () => {
      create_plugin_validate();
      if(!text_invalidated.value && !file_invalidated.value) {
        const form = new FormData();
        form.append("name", fileName.value);
        form.append("pluginFile", fileData.value[0]);
        try {
          await createPluginList(form);
          await getTableData();
          alertEvent(1, 'NFV MANO Plugin', 'created');
        }
        catch(err) {
          console.log(err);
          alertEvent(0, 'NFV MANO Plugin', 'create');
        }
        modalCreate.value.closeModalEvent();
      }
    };
    const update_plugin_validate = () => {
      if(fileData.value[0] == null) { // 驗證 Update Modal
        file_invalidated.value = true;
      } 
    };
    const update_plugin_button = name => {
      fileName.value = name;
    };
    const update_plugin_modal = async () => {
      update_plugin_validate();
      if(!file_invalidated.value) {
        const form = new FormData();
        form.append("name", fileName.value);
        form.append("pluginFile", fileData.value[0]);
        try {
          await updatePlugin(fileName.value,form);
          await getTableData();
          alertEvent(1, 'NFV MANO Plugin', 'updated');
        }
        catch(err) {
          console.log(err);
          alertEvent(0, 'NFV MANO Plugin', 'update');
        }
        modalUpdate.value.closeModalEvent();
      }
    };
    const download_template_button = file => {
      if(file)
        alertEvent(1, 'NFV MANO Plugin', 'downloaded');
      else
        alertEvent(0, 'NFV MANO Plugin', 'download');
    }
    const delete_plugin_button = file => {
      fileData.value = file;
    };
    const delete_plugin_modal = async () => {
      try {
        await deletePlugin(fileData.value.name);
        await getTableData();
        alertEvent(1, 'NFV MANO Plugin', 'deleted');
      }
      catch(err) {
        console.log(err);
        alertEvent(0, 'NFV MANO Plugin', 'delete');
      }
      modalDelete.value.closeModalEvent();
    };
    watch(
      () => fileName.value,
      () => {
        text_invalidated.value = false;
      }
    );
    watch(
      () => fileData.value,
      () => {
        file_invalidated.value = false;
      }
    );
    const alert = ref(null);
    const modalCreate = ref(null);
    const modalUpdate = ref(null);
    const modalDelete = ref(null);
    const uploadData_create = ref(null);
    const uploadData_update = ref(null);
    onMounted(async () => {
      try {
        await getTableData();
      } 
      catch (err) {
        console.log(err);
      }
      await delay(700);
      store.commit("statusOn");
    });
    onUnmounted(() => {
      store.commit("statusOff");
    })
    return {
      alert,
      alertExist,
      filterEntries,
      columnSort,
      th_list,
      td_list,
      fileName,
      getTableData,
      updateTableData,
      text_invalidated,
      file_invalidated,
      change_plugin_file,
      create_plugin_modal,
      update_plugin_button,
      update_plugin_modal,
      download_template_button,
      delete_plugin_button,
      delete_plugin_modal,
      removeCreateData,
      removeUpdateData,
      removeDeleteData,
      uploadData_update,
      uploadData_create,
      modalCreate,
      modalUpdate,
      modalDelete,
    };
  },
}
</script>