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
          <select @change="selectChangeEvent('VNF')" v-model="selected_vnf_name" class="form-select form-select" :class="{ 'is-invalid' : selected_vnf_invalidated }" id="select1" aria-label=".form-select example">
            <option selected>請選擇 ...</option>
            <option v-for="item in sorted_template_vnf_list" :key="item.templateId" :value="item.name">{{ item.name }}</option>
          </select>
          <div class="mt-2" v-if="selected_vnf_name != '請選擇 ...'">
            <div>VNF ID : {{ selected_vnf_id }}</div>
            <div>VNF Description : {{ selected_vnf_description }}</div>
          </div>
          <div class="invalid-feedback">
            請選擇一個 VNF Template
          </div>
        </div>
        <div class="mb-3">
          <label for="select2" class="form-label">NSD Template :</label>
          <select @change="selectChangeEvent('NSD')"  v-model="selected_nsd_name" class="form-select form-select" :class="{ 'is-invalid' : selected_nsd_invalidated }" id="select2" aria-label=".form-select example">
            <option selected>請選擇 ...</option>
            <option v-for="item in sorted_template_nsd_list" :key="item.templateId" :value="item.name">{{ item.name }}</option>
          </select>
          <div class="mt-2" v-if="selected_nsd_name != '請選擇 ...'">
            <div>NSD ID : {{ selected_nsd_id }}</div>
            <div>NSD Description : {{ selected_nsd_description }}</div>
          </div>
          <div class="invalid-feedback">
            請選擇一個 NSD Template
          </div>
        </div>
        <div class="mb-3">
          <label for="select3" class="form-label">NRM Template :</label>
          <select @change="selectChangeEvent('NRM')" v-model="selected_nrm_name" class="form-select form-select" :class="{ 'is-invalid' : selected_nrm_invalidated }" id="select3" aria-label=".form-select example">
            <option selected>請選擇 ...</option>
            <option v-for="item in sorted_template_nrm_list" :key="item.templateId" :value="item.name">{{ item.name }}</option>
          </select>
          <div class="mt-2" v-if="selected_nrm_name != '請選擇 ...'">
            <div>NRM ID : {{ selected_nrm_id }}</div>
            <div>NRM Description : {{ selected_nrm_description }}</div>
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
  <Alert ref="alertRef" v-show="alertExist"></Alert>
</template>
<script>
import { alert, delay, info, list, modal, select, sorted, update, validate, getNssTemplateData, getGenericTemplateData, getPluginData, } from '@/assets/js/composition-api/index.js';
import axios from 'axios';
import router from '@/router';
import { useStore } from 'vuex';
import { $array } from 'alga-js';
import { nss_template } from '../assets/js/api.js';
import Table from '../components/global/table.vue';
import { compositionAPI } from '../assets/js/composition-api';
import { ref, reactive, toRefs, onMounted, onUnmounted, defineAsyncComponent } from 'vue';
const { nssTemplateList, createNssTemplate, deleteNssTemplate } = nss_template();
const { removeDeleteData, delete_template_button } = compositionAPI();
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
    const store = useStore(); // 使用 vuex
    const { alertRef, alertExist, alertEvent } = alert(); // alert 組件解構 ( alert 綁定對象, alert 是否存在, alert 呼叫事件 )
    const { templateId, templateData, templateDescription } = info(); // info 組件解構 ( 當筆資料之 Id, 當筆資料之完整資料, 當筆資料之 Description )
    const { template_list, nfv_mano_list, generic_template_list } = list();
    const { modalCreate, modalDelete } = modal(); // modal 組件解構 ( 創建用 Modal 綁定對象, 刪除用 Modal 綁定對象 )
    const { selected_nfv_mano, selected_vnf_name, selected_nsd_name, selected_nrm_name } = select(); // select 組件解構 ( 當前選中之 NFV MANO Plugin, 當前選中之 VNF Template, 當前選中之 NSD Template, 當前選中之 NRM Template )
    const { sorted_nfv_mano_list, sorted_template_vnf_list, sorted_template_nsd_list, sorted_template_nrm_list } = sorted();
    const { filterEntries, updateTableData } = update();
    const { selected_nfv_mano_invalidated, selected_vnf_invalidated, selected_nsd_invalidated, selected_nrm_invalidated } = validate(); // validate 組件解構 ( 選中 NFV MANO Plugin 之驗證狀態, 選中 VNF Template 之驗證狀態, )
    const columnSort = ref(['templateId','description','nfvoType']); // 需要排序之欄位
    const th_list = ref([ // 所有欄位資料
      { name: "templateId", text: "ID" },
      { name: "description", text: "Description" },
      { name: "nfvoType", text: "NFVO" },
      { name: "template_list", text: "Template" },
      { name: "allocate_nssi", text: "Allocate" },
      { name: "delete_template", text: "Delete" },
    ]);
    const template_list_collection = reactive({ // Show Modal 內的 VNF / NSD / NRM 的資訊 (ID)
      template_vnf_id: '',
      template_nsd_id: '',
      template_nrm_id: '',
    });
    const template_select_collection = reactive({ // Create Modal 內的""當前選取之 VNF / NSD / NRM 的資訊"" (ID 和 Description)
      selected_vnf_id: ref(''),
      selected_nsd_id: ref(''),
      selected_nrm_id: ref(''),
      selected_vnf_description: ref(''),
      selected_nsd_description: ref(''),
      selected_nrm_description: ref(''),
    });
    const { template_vnf_id, template_nsd_id, template_nrm_id } = toRefs(template_list_collection);
    const { selected_vnf_id, selected_nsd_id, selected_nrm_id, selected_vnf_description, selected_nsd_description, selected_nrm_description } = toRefs(template_select_collection);
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
      selected_vnf_name.value = '請選擇 ...';
      selected_nsd_name.value = '請選擇 ...';
      selected_nrm_name.value = '請選擇 ...';
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
    const selectChangeEvent = type => { // 切換 Create Modal Select
      if(type == 'VNF' && selected_vnf_name.value != '請選擇 ...') {
        const index = sorted_template_vnf_list.value.findIndex(x => x.name == selected_vnf_name.value);
        selected_vnf_id.value = sorted_template_vnf_list.value[index].templateId;
        selected_vnf_description.value = sorted_template_vnf_list.value[index].description;
      }
      if(type == 'NSD' && selected_nsd_name.value != '請選擇 ...') {
        const index = sorted_template_nsd_list.value.findIndex(x => x.name == selected_nsd_name.value);
        selected_nsd_id.value = sorted_template_nsd_list.value[index].templateId;
        selected_nsd_description.value = sorted_template_nsd_list.value[index].description;
      }
      else if(type == 'NRM' && selected_nrm_name.value != '請選擇 ...'){
        const index = sorted_template_nrm_list.value.findIndex(x => x.name == selected_nrm_name.value);
        selected_nrm_id.value = sorted_template_nrm_list.value[index].templateId;
        selected_nrm_description.value = sorted_template_nrm_list.value[index].description;
      }
    }
    const create_template_validate = () => { // 驗證 Create Modal
      if(selected_vnf_name.value == '請選擇 ...')
        selected_vnf_invalidated.value = true;
      if(selected_nsd_name.value == '請選擇 ...')
        selected_nsd_invalidated.value = true;
      if(selected_nrm_name.value == '請選擇 ...')
        selected_nrm_invalidated.value = true;
      if(selected_nfv_mano.value == '請選擇 ...') 
        selected_nfv_mano_invalidated.value = true;
    };
    const create_template_modal = async () => { // 點擊 Create Modal 內創建按鈕
      create_template_validate();
      if(!selected_vnf_invalidated.value && !selected_nsd_invalidated.value && !selected_nrm_invalidated.value && !selected_nfv_mano_invalidated.value) {
        const form = new FormData();
        form.append("nfvoType", selected_nfv_mano.value);
        form.append("genericTemplates", selected_vnf_id.value);
        form.append("genericTemplates", selected_nsd_id.value);
        form.append("genericTemplates", selected_nrm_id.value);
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
        [template_list.value, generic_template_list.value, nfv_mano_list.value] = await axios.all([getNssTemplateData(), getGenericTemplateData(), getPluginData()]);
        sorted_nfv_mano_list.value = $array.sortBy(nfv_mano_list.value, 'name', 'asc');
        sorted_template_vnf_list.value = $array.sortBy(generic_template_list.value.filter(x => x.templateType == 'VNF'), 'name', 'asc');
        sorted_template_nsd_list.value = $array.sortBy(generic_template_list.value.filter(x => x.templateType == 'NSD'), 'name', 'asc');
        sorted_template_nrm_list.value = $array.sortBy(generic_template_list.value.filter(x => x.templateType == 'NRM'), 'name', 'asc');
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
      alertRef, alertExist, modalCreate, modalDelete, templateId, templateDescription,selected_nfv_mano_invalidated, selected_vnf_invalidated, selected_nsd_invalidated, selected_nrm_invalidated,selected_nfv_mano, selected_vnf_name, selected_nsd_name, selected_nrm_name,
      sorted_nfv_mano_list, sorted_template_vnf_list, sorted_template_nsd_list, sorted_template_nrm_list,
      template_list,
      filterEntries,
      th_list,
      columnSort,
      removeShowData,
      removeCreateData,
      removeDeleteData,
      updateTableData,
      selectChangeEvent,
      show_template_button,
      create_template_modal,
      delete_template_button,
      delete_template_modal,
      allocate_template_button,
      ...toRefs(template_list_collection),
      ...toRefs(template_select_collection),
    }
  },
}
</script>