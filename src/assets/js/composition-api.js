import { $array } from 'alga-js';
import { ref, computed, watch, reactive, toRefs } from 'vue';
import { Share, GenericTemplate } from './api.js';
const { PluginList, TemplateList } = Share();
const { createGenericTemplate, updateGenericTemplate, deleteGenericTemplate } = GenericTemplate();
export const compositionAPI = () => {
  const info = reactive({
    templateId: ref(''), // Template 識別碼
    templateName: ref(''), // Template 名稱
    templateData: ref({}), // Template 檔案
    templateDescription: ref(''), // Template 描述
  });
  const list = reactive({
    filterEntries: ref([]), // 當前頁面資料的陣列
    nfv_mano_list: ref([]), // NFV MANO Plugin 資料的陣列
    template_list: ref([]), // 特定的 VNF/NSD/NRM Template 資料的陣列
    template_vnf_list: ref([]), // VNF 資料的陣列 
    generic_template_list: ref([]), // 有 Upload 的所有 VNF/NSD/NRM Template 資料的陣列
  });
  const alert = reactive({
    alertRef: ref(null), // alert1 對應的 ref
    alertExist: ref(false), // alert1 是否存在
  });
  const modal = reactive({
    modalShow: ref(null), // modalShow 對應的 ref
    modalCreate: ref(null), // modalCreate 對應的 ref
    modalUpdate: ref(null), // modalUpdate 對應的 ref
    modalDelete: ref(null), // modalDelete 對應的 ref
  });
  const select = reactive({
    selected_nfv_mano: ref('請選擇 ...'), // 當前選取到的 NFV MANO Plugin ( 預設'請選擇 ...' )
    selected_vnf_name: ref('請選擇 ...'), // 當前選取到的 VNF Template ( 預設'請選擇 ...' )
    selected_nsd_name: ref('請選擇 ...'), // 當前選取到的 NSD Template ( 預設'請選擇 ...' )
    selected_nrm_name: ref('請選擇 ...'), // 當前選取到的 NRM Template ( 預設'請選擇 ...' )
  });
  const sorted = reactive({
    sorted_nfv_mano_list: computed(() => $array.sortBy(nfv_mano_list.value, 'name', 'asc')), // 排序好的 NFV MANO Plugin 資料的陣列
    sorted_template_vnf_list: computed(() => $array.sortBy(generic_template_list.value.filter(x => x.templateType == 'VNF'), 'name', 'asc')), // 排序好的 VNF Template 資料的陣列
    sorted_template_nsd_list: computed(() => $array.sortBy(generic_template_list.value.filter(x => x.templateType == 'NSD'), 'name', 'asc')), // 排序好的 NSD Template 資料的陣列
    sorted_template_nrm_list: computed(() => $array.sortBy(generic_template_list.value.filter(x => x.templateType == 'NRM'), 'name', 'asc')), // 排序好的 NRM Template 資料的陣列
  });
  const upload = reactive({
    uploadData_create: ref(null), // create Modal 內的檔案上傳對應的 ref
    uploadData_update: ref(null), // update Modal 內的檔案上傳對應的 ref
  });
  const validate = reactive({
    text_invalidated: ref(false), // 驗證 Template 名稱輸入框是否合法 ( 名稱重複 或 名稱為空 )
    file_invalidated: ref(false), // 驗證 Template 檔案是否合法 ( 是否傳入檔案 )
    selected_vnf_invalidated: ref(false), // 驗證 VNF Template 選取框是否合法 ( 是否被選取 )
    selected_nsd_invalidated: ref(false), // 驗證 NSD Template 選取框是否合法 ( 是否被選取 )
    selected_nrm_invalidated: ref(false), // 驗證 NRM Template 選取框是否合法 ( 是否被選取 )
    selected_nfv_mano_invalidated: ref(false), // 驗證 NFV MANO Plugin 選取框是否合法 ( 是否被選取 )
  });
  const { uploadData_update } = toRefs(upload);
  const { alertRef, alertExist } = toRefs(alert);
  const { modalCreate, modalUpdate, modalDelete } = toRefs(modal);
  const { templateId, templateName, templateData, templateDescription } = toRefs(info);
  const { filterEntries, nfv_mano_list, template_list, template_vnf_list, generic_template_list } = toRefs(list);
  const { selected_nfv_mano, selected_vnf_name, selected_nsd_name, selected_nrm_name } = toRefs(select);
  const { text_invalidated, file_invalidated, selected_nfv_mano_invalidated, selected_vnf_invalidated, selected_nsd_invalidated, selected_nrm_invalidated } = toRefs(validate);
  const delay = (interval) => { // 計時器
    return new Promise((resolve) => {
      setTimeout(resolve, interval);
    });
  };
  const alertEvent = async (status, name, action) => { // 通知事件
    alertExist.value = true;
    await alertRef.value.alertInfo(status, name, action);
    await delay(100);
    alertExist.value = false;
  };
  const updateTableData = val => { // 表格變動事件，取得當前頁面表格資料
    filterEntries.value = val;
  }
  const getPluginData = async () => { // 獲取 NFV MANO Plugin 資料
    const res = await PluginList();
    nfv_mano_list.value = [];
    for (let i of res.data) {
      nfv_mano_list.value.push(i);
    }
  };
  const getTemplateData = async templateType => { // 獲取特定種類之 Template 資料
    let res = await TemplateList();
    template_list.value = [];
    const array_template = res.data.filter(x => x.templateType == templateType);
    for (let i of array_template) {
      template_list.value.push(i);
    }
  };
  const getGenericTemplateData = async () => {  // 獲取有 Upload 的 VNF NSD NRM 資料
    let res = await TemplateList();
    for(let i of res.data) {
      if(i.operationStatus == 'UPLOAD') {
        generic_template_list.value.push(i);
      }
    }
  };
  const removeShowData = () => { // Show Modal 關閉事件
    templateId.value = '';
    template_vnf_list.value = [];
  };
  const removeCreateData = () => { // Create Modal 關閉事件 
    templateName.value = '';
    templateDescription.value = '';
    selected_nfv_mano.value = '請選擇 ...';
    text_invalidated.value = false;
    selected_nfv_mano_invalidated.value = false;
  };
  const removeUpdateData = () => { // Update Modal 關閉事件
    templateId.value = '';
    templateData.value = {};
    selected_nfv_mano.value = '請選擇 ...';
    file_invalidated.value = false;
    uploadData_update.value.value = null;
  };
  const removeDeleteData = () => { // Delete Modal 關閉事件
    templateData.value = {};
  };
  const create_template_validate = () => { // Create Modal 驗證
    const repeatName = template_list.value.map(e => e.name).includes(templateName.value);
    if(!templateName.value || repeatName)
      text_invalidated.value = true;
    if(selected_nfv_mano.value == '請選擇 ...') 
      selected_nfv_mano_invalidated.value = true;
  };
  const create_template_modal = async (type, typeFullName) => { // 點擊 Create Modal 內創建按鈕
    create_template_validate();
    if(!text_invalidated.value && !selected_nfv_mano_invalidated.value) {
      const form = new FormData();
      form.append("name", templateName.value);
      form.append("description", templateDescription.value);
      form.append("nfvoType", selected_nfv_mano.value);
      form.append("templateType", type);
      try {
        await createGenericTemplate(form);
        await getTemplateData(type);
        alertEvent(1, typeFullName, 'created');
      }
      catch(err) {
        console.log(err);
        alertEvent(0, typeFullName, 'create');
      }
      modalCreate.value.closeModalEvent();
    }
  };
  const update_template_file = e => { // 更新檔案上傳 INPUT 的事件
    templateData.value = e.target.files;
  };
  const update_template_validate = () => { // Update Modal 驗證
    if(templateData.value[0] == null) {
      file_invalidated.value = true;
    } 
  };
  const update_template_button = (id, type) => { // 點擊 Update Modal 按鈕
    templateId.value = id;
    selected_nfv_mano.value = type;
  };
  const update_template_modal = async (type, typeFullName) => { // 點擊 Update Modal 內更新按鈕
    update_template_validate();
    if(!file_invalidated.value) {
      const form = new FormData();
      form.append("nfvoType", selected_nfv_mano.value);
      form.append("templateType", type);
      form.append("templateFile", templateData.value[0]);
      try {
        await updateGenericTemplate(templateId.value, form);
        await getTemplateData(type);
        alertEvent(1, typeFullName, 'updated');
      }
      catch(err) {
        console.log(err);
        alertEvent(0, typeFullName, 'update');
      }
      modalUpdate.value.closeModalEvent();
    }
  };
  const download_template_button = (file, typeFullName) => { // 點擊 Download Modal 按鈕
    if(file)
      alertEvent(1, typeFullName, 'downloaded');
    else
      alertEvent(0, typeFullName, 'download');
  };
  const delete_template_button = file => { // 點擊 Delete Modal 按鈕
    templateData.value = file;
  };
  const delete_template_modal = async (type, typeFullName) => { // 點擊 Delete Modal 內刪除按鈕
    try {
      await deleteGenericTemplate(templateData.value.templateId);
      await getTemplateData(type);
      alertEvent(1, typeFullName, 'deleted');
    }
    catch(err) {
      console.log(err);
      alertEvent(0, typeFullName, 'delete');
    }
    modalDelete.value.closeModalEvent();
  };
  watch(selected_nfv_mano, () => {
    selected_nfv_mano_invalidated.value = false;
  });
  watch(selected_vnf_name, () => {
    selected_vnf_invalidated.value = false;
  });
  watch(selected_nsd_name, () => {
    selected_nsd_invalidated.value = false;
  });
  watch(selected_nrm_name, () => {
    selected_nrm_invalidated.value = false;
  });
  return {
    info,
    list,
    alert,
    modal,
    select,
    sorted,
    upload,
    validate,
    delay,
    alertEvent,
    updateTableData, 
    getPluginData,
    getTemplateData,
    getGenericTemplateData,
    removeShowData,
    removeCreateData,
    removeUpdateData,
    removeDeleteData,
    create_template_validate,
    create_template_modal,
    update_template_file,
    update_template_button,
    update_template_modal,
    download_template_button,
    delete_template_button,
    delete_template_modal,
  }
}