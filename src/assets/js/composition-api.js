import { ref } from 'vue';
import { Share } from './api.js';
const { PluginList, TemplateList } = Share();
export const compositionAPI = () => {
  const alert = ref(null);
  const alertExist = ref(false);
  const filterEntries = ref([]);
  const nfv_mano_list = ref([]);
  const template_list = ref([]);
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
  const getTemplateData = async (templateName) => { // 顯示 Table 資料
    let res = await TemplateList();
    template_list.value = [];
    const array_template = res.data.filter(x => x.templateType == templateName);
    for(let i of array_template) {
      template_list.value.push(i);
    }
  };
  return { delay, alertEvent, updateTableData, getPluginData, getTemplateData, filterEntries, nfv_mano_list, template_list, alert, alertExist }
}