// import { $array } from 'alga-js';
import { ref, reactive, toRefs } from 'vue';
const info = () => {
  const infoReactive = reactive({
    templateId: ref(''), // Template 識別碼
    templateName: ref(''), // Template 名稱
    templateData: ref({}), // Template 檔案
    templateDescription: ref(''), // Template 描述
  });
  return toRefs(infoReactive);
};
const list = () => {
  const listReactive = reactive({
    nfv_mano_list: ref([]), // NFV MANO Plugin 資料的陣列
    template_list: ref([]), // 特定的 VNF/NSD/NRM Template 資料的陣列
    generic_template_list: ref([]), // 有 Upload 的所有 VNF/NSD/NRM Template 資料的陣列
  });
  return toRefs(listReactive);
};
const modal = () => {
  const modalReactive = reactive({
    modalShow: ref(null), // modalShow 對應的 ref
    modalCreate: ref(null), // modalCreate 對應的 ref
    modalUpdate: ref(null), // modalUpdate 對應的 ref
    modalDelete: ref(null), // modalDelete 對應的 ref
  });
  return toRefs(modalReactive);
};
const select = () => {
  const selectReactive = reactive({
    selected_nfv_mano: ref('請選擇 ...'), // 當前選取到的 NFV MANO Plugin ( 預設'請選擇 ...' )
    selected_vnf_name: ref('請選擇 ...'), // 當前選取到的 VNF Template ( 預設'請選擇 ...' )
    selected_nsd_name: ref('請選擇 ...'), // 當前選取到的 NSD Template ( 預設'請選擇 ...' )
    selected_nrm_name: ref('請選擇 ...'), // 當前選取到的 NRM Template ( 預設'請選擇 ...' )
  });
  return toRefs(selectReactive);
};
const sorted = () => {
  const sortedReactive = reactive({
    sorted_nfv_mano_list: ref([]),
    sorted_template_vnf_list: ref([]),
    sorted_template_nsd_list: ref([]),
    sorted_template_nrm_list: ref([]),
    // sorted_nfv_mano_list: computed(() => $array.sortBy(list.nfv_mano_list.value, 'name', 'asc')), // 排序好的 NFV MANO Plugin 資料的陣列
    // sorted_template_vnf_list: computed(() => $array.sortBy(list.generic_template_list.value.filter(x => x.templateType == 'VNF'), 'name', 'asc')), // 排序好的 VNF Template 資料的陣列
    // sorted_template_nsd_list: computed(() => $array.sortBy(list.generic_template_list.value.filter(x => x.templateType == 'NSD'), 'name', 'asc')), // 排序好的 NSD Template 資料的陣列
    // sorted_template_nrm_list: computed(() => $array.sortBy(list.generic_template_list.value.filter(x => x.templateType == 'NRM'), 'name', 'asc')), // 排序好的 NRM Template 資料的陣列
  });
  return toRefs(sortedReactive);
};
const upload = () => {
  const uploadReactive = reactive({
    uploadData_create: ref(null), // create Modal 內的檔案上傳對應的 ref
    uploadData_update: ref(null), // update Modal 內的檔案上傳對應的 ref
  });
  return toRefs(uploadReactive);
};
const validate = () => {
  const validateReactive = reactive({
    text_invalidated: ref(false), // 驗證 Template 名稱輸入框是否合法 ( 名稱重複 或 名稱為空 )
    file_invalidated: ref(false), // 驗證 Template 檔案是否合法 ( 是否傳入檔案 )
    selected_vnf_invalidated: ref(false), // 驗證 VNF Template 選取框是否合法 ( 是否被選取 )
    selected_nsd_invalidated: ref(false), // 驗證 NSD Template 選取框是否合法 ( 是否被選取 )
    selected_nrm_invalidated: ref(false), // 驗證 NRM Template 選取框是否合法 ( 是否被選取 )
    selected_nfv_mano_invalidated: ref(false), // 驗證 NFV MANO Plugin 選取框是否合法 ( 是否被選取 )
  })
  return toRefs(validateReactive);
};
// watch(selected_nfv_mano, () => {
//   selected_nfv_mano_invalidated.value = false;
// });
// watch(selected_vnf_name, () => {
//   selected_vnf_invalidated.value = false;
// });
// watch(selected_nsd_name, () => {
//   selected_nsd_invalidated.value = false;
// });
// watch(selected_nrm_name, () => {
//   selected_nrm_invalidated.value = false;
// });
export { info, list, modal, select, sorted, validate, upload };
