<template>
  <Table :column="th_list" :entrie="template_list" :columnSort="columnSort" @update="updateTableData">
    <template v-slot:header>
      Virtualized Network Function Template
    </template>
    <template v-slot:button>
      Create VNF Template
    </template>
    <template v-slot:table-name>
      VNF Template List
    </template>
    <template v-slot:table-td>
      <tr v-for="item in filterEntries" :key="item.templateId">
        <td  class="tablecell-custom">
          <i class="bi bi-list cursor-pointer me-1" data-bs-toggle="modal" data-bs-target="#show_plugin_Modal" @click="show_template_button(item.templateId,item.content)"></i>
          {{ item.templateId }}
        </td>
        <td class="tablecell-custom">{{ item.name }}</td>
        <td class="tablecell-custom">{{ item.description }}</td>
        <td class="tablecell-custom">{{ item.templateType }}</td>
        <td class="tablecell-custom">{{ item.nfvoType }}</td>
        <td class="tablecell-custom">{{ item.operationStatus }}</td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-warning rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" data-bs-toggle="modal" data-bs-target="#update_plugin_Modal" @click="update_template_button(item.templateId, item.nfvoType)">
            <i class="bi bi-wrench"></i>
          </div>
        </td>
        <td class="w-0">
          <a :href="item.templateFile" @click="download_template_button(item.templateFile, 'VNF Template')" class="d-flex justify-content-center align-items-center text-white bg-primary rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px">
            <i class="bi bi-arrow-down"></i>
          </a>
        </td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-danger rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px"  data-bs-toggle="modal" data-bs-target="#delete_plugin_Modal" @click="delete_template_button(item)">
            <i class="bi bi-trash"></i>
          </div>
        </td>
      </tr>
    </template>
  </Table>
  <Modalcreate ref="modalCreate" @remove="removeCreateData">
    <template v-slot:header>
      Create new VNF Template
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">Template Name :</label>
          <input type="text" class="form-control" :class="{ 'is-invalid' : text_invalidated }" id="InputFile" placeholder="Template Name" v-model="templateName">
          <div class="invalid-feedback">
            <template v-if="!templateName">
              Template 名稱不得為空
            </template>
            <template v-else>
              此 Template 名稱已存在
            </template>
          </div>
        </div>
        <div class="mb-3">
          <label for="InputFile2" class="form-label">VNF Description :</label>
          <input type="text" class="form-control" id="InputFile2" placeholder="Description" v-model="templateDescription">
        </div>
        <div class="mb-2">
          <label for="InputFile3" class="form-label">NFVO Name :</label>
          <select v-model="selected_nfv_mano" class="form-select form-select" :class="{ 'is-invalid' : select_invalidated }" id="InputFile3" aria-label=".form-select example">
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
      <button type="button" class="btn btn-primary text-white" @click="create_template_modal('VNF', 'VNF Template')">Create</button>
    </template>
  </Modalcreate>
  <Modalshow ref="modalShow" @remove="removeShowData">
    <template v-slot:header>
      VNF List
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">VNF Template ID :</label>
          <input type="text" class="form-control" id="InputFile" placeholder="請輸入 Plugin 名稱" v-model="templateId" readonly>
        </div>
        <div>
          <label for="VnfList" class="form-label">VNF ID List :</label>
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="item in template_vnf_list" :key="item">{{ item }}</li>
          </ul>
        </div>
      </form>
    </template>
  </Modalshow>
  <Modalupdate ref="modalUpdate" @remove="removeUpdateData">
    <template v-slot:header>
      Update Service Mapping Plugin
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">
             VNF Template ID :
          </label>
          <input type="text" class="form-control" id="InputFile" placeholder="請輸入 Plugin 名稱" v-model="templateId" readonly>
        </div>
        <div class="mb-2">
          <label for="UploadFile2" class="form-label">
             VNF Template File :
          </label>
          <input type="file" class="form-control" :class="{ 'is-invalid' : file_invalidated }" id="UploadFile2" ref="uploadData_update" accept=".zip" @change="update_template_file">
          <div class="invalid-feedback">
            檔案不得為空
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-warning text-white" @click="update_template_modal('VNF', 'VNF Template')">Update</button>
    </template>
  </Modalupdate>
  <Modaldelete ref="modalDelete" @remove="removeDeleteData" @delete="delete_template_modal('VNF', 'VNF Template')">
    <template v-slot:header>
      Delete VNF Template
    </template>
  </Modaldelete>
  <Alert ref="alert" v-show="alertExist"></Alert>
</template>
<script>
import axios from 'axios';
import { useStore } from 'vuex';
import Table from '../components/global/table.vue';
import { compositionAPI } from '../assets/js/composition-api';
import { ref, watch, onMounted, onUnmounted, defineAsyncComponent, } from 'vue';
const { delay, updateTableData, getTemplateData, getPluginData, removeShowData, removeCreateData, removeUpdateData, removeDeleteData, create_template_modal, update_template_file, update_template_button, update_template_modal, download_template_button, delete_template_button, delete_template_modal, filterEntries, template_list, template_vnf_list, sorted_nfv_mano_list, templateId, templateName, templateData, templateDescription, text_invalidated, file_invalidated, select_invalidated, selected_nfv_mano, alert, alertExist, modalShow, modalCreate, modalUpdate, modalDelete, uploadData_update } = compositionAPI();
const Alert = defineAsyncComponent(() => import(/* webpackChunkName: "Alert" */ '../components/global/alert.vue'));
const Modalshow = defineAsyncComponent(() => import(/* webpackChunkName: "Modalshow" */ '../components/global/modal-show.vue'));
const Modalcreate = defineAsyncComponent(() => import(/* webpackChunkName: "Modalcreate" */ '../components/global/modal-create.vue'));
const Modalupdate = defineAsyncComponent(() => import(/* webpackChunkName: "Modalupdate" */ '../components/global/modal-update.vue'));
const Modaldelete = defineAsyncComponent(() => import(/* webpackChunkName: "Modaldelete" */ '../components/global/modal-delete.vue'));
export default {
  components: {
    Table,
    Alert,
    Modalshow,
    Modalcreate,
    Modalupdate,
    Modaldelete,
  },
  setup() {
    const store = useStore();
    const columnSort = ref(["templateId","name","description","templateType","nfvoType","operationStatus"]);
    const th_list = ref([
        { name: "templateId", text: "ID List" },
        { name: "name", text: "Template Name" },
        { name: "description", text: "Description" },
        { name: "templateType", text: "Type" },
        { name: "nfvoType", text: "NFVO" },
        { name: "operationStatus", text: "VNF Status" },
        { name: "update_template", text: "Update" },
        { name: "Template_Download", text: "Download" },
        { name: "delete_template", text: "Delete" },
      ]);
    const show_template_button = (id, content) => { // 點擊 Show Modal 按鈕
      templateId.value = id;
      const map = new Map();
      map.set(content);
      for (const value of map) {
        template_vnf_list.value = [];
        if (value[0].length == 0) {
          const str = "No Upload Virtualized Network Function Template!!";
          template_vnf_list.value.push(str);
        }
        for (const item of value[0]) {
          let tojson = JSON.parse(item.topology_template.replace(/'/g,'"').replace(/:[ ]*False/,":false").replace(/:[ ]*True/,":true"));
          template_vnf_list.value.push(tojson.node_templates.VNF1.properties.descriptor_id);
        }
      }
    };
    watch(templateName, () => {
      text_invalidated.value = false;
    });
    watch(templateData, () => {
      file_invalidated.value = false;
    });
    watch(selected_nfv_mano, () => {
      select_invalidated.value = false;
    });
    onMounted(async () => {
      try {
        await axios.all([getTemplateData('VNF'), getPluginData()]);
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
    return {
      alert,
      alertExist,
      modalShow,
      modalCreate,
      modalUpdate,
      modalDelete,
      uploadData_update,
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
      text_invalidated,
      file_invalidated,
      select_invalidated,
      removeShowData,
      removeCreateData,
      removeUpdateData,
      removeDeleteData,
      updateTableData,
      show_template_button,
      create_template_modal,
      update_template_file,
      update_template_button,
      update_template_modal,
      download_template_button,
      delete_template_button,
      delete_template_modal,
    }
  },
}
</script>