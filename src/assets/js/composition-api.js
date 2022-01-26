import { $array } from 'alga-js';
import { ref, computed } from 'vue';
import { Share, GenericTemplate } from './api.js';
const { PluginList, TemplateList } = Share();
const { createGenericTemplate, updateGenericTemplate, deleteGenericTemplate } = GenericTemplate();
export const compositionAPI = () => {
  const alert = ref(null); // alert 對應的 ref
  const alertExist = ref(false); // alert 是否存在
  const modalShow = ref(null); // modalShow 對應的 ref
  const modalCreate = ref(null); // modalCreate 對應的 ref
  const modalUpdate = ref(null); // modalUpdate 對應的 ref
  const modalDelete = ref(null); // modalDelete 對應的 ref
  const uploadData_update = ref(null); // update Modal 內的檔案上傳對應的 ref
  const filterEntries = ref([]); // 當前頁面資料的陣列
  const nfv_mano_list = ref([]); // NFV_MANO_Plugin 資料的陣列
  const template_list = ref([]); // VNF/NSD/NRM Template 資料的陣列
  const sorted_nfv_mano_list = computed(() => $array.sortBy(nfv_mano_list.value, 'name', 'asc')); // 排序好的 NFV_MANO_Plugin 資料的陣列
  const templateId = ref(''); // Template 識別碼
  const templateName = ref(''); // Template 名稱
  const templateData = ref({}); // Template 檔案
  const templateDescription = ref(''); // Template 描述
  const selected_nfv_mano = ref('請選擇 ...'); // 當前選取到的 NFV_MANO_Plugin ( 預設'請選擇 ...' )
  const text_invalidated = ref(false); // 驗證 Template 名稱輸入框是否合法 ( 名稱重複 或 名稱為空 )
  const file_invalidated = ref(false); // 驗證 Template 檔案是否合法 ( 是否傳入檔案 )
  const select_invalidated = ref(false); // 驗證 NFV_MANO_Plugin 選取框是否合法 ( 是否被選取 )
  const delay = (interval) => { // 計時器
    return new Promise((resolve) => {
      setTimeout(resolve, interval);
    });
  };
  const alertEvent = async (status, name, action) => { // 通知事件
    alertExist.value = true;
    await alert.value.alertInfo(status, name, action);
    await delay(100);
    alertExist.value = false;
  };
  const updateTableData = val => { // 表格變動事件，取得當前頁面表格資料
    filterEntries.value = val;
  }
  const getPluginData = async () => { // 取得 NFV_MANO_Plugin 資料
    const res = await PluginList();
    nfv_mano_list.value = [];
    for (let i of res.data) {
      nfv_mano_list.value.push(i);
    }
  };
  const getTemplateData = async templateType => { // 顯示 Template 資料
    let res = await TemplateList();
    template_list.value = [];
    const array_template = res.data.filter(x => x.templateType == templateType);
    for (let i of array_template) {
      template_list.value.push(i);
    }
  };
  const removeCreateData = () => { // Create Modal 關閉事件 
    templateName.value = '';
    templateDescription.value = '';
    selected_nfv_mano.value = '請選擇 ...';
    text_invalidated.value = false;
    select_invalidated.value = false;
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
      select_invalidated.value = true;
  };
  const create_template_modal = async (type, typeFullName) => { // 點擊 Create Modal 內創建按鈕
    create_template_validate();
    if(!text_invalidated.value && !select_invalidated.value) {
      console.log(123)
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
  return {
    delay,
    updateTableData, 
    getPluginData,
    getTemplateData,
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
    alert,
    alertExist,
    modalShow,
    modalCreate,
    modalUpdate,
    modalDelete,
    uploadData_update,
    filterEntries,
    nfv_mano_list,
    template_list,
    sorted_nfv_mano_list,
    templateId,
    templateName,
    templateData,
    templateDescription,
    selected_nfv_mano,
    text_invalidated,
    file_invalidated,
    select_invalidated,
  }
}