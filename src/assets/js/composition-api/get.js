import { Share, nss_template } from '@/assets/js/api.js';
const { nssTemplateList } = nss_template();
const { TemplateList, PluginList } = Share();
const getNssTemplateData = async () => {
  const arr = [];
  const res = await nssTemplateList();
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
      arr.push(obj);
    }
  }
  return arr;
};
const getGenericTemplateData = async () => {
  const res = await TemplateList();
  return res.data.filter(x => x.operationStatus == 'UPLOAD');
};
const getPluginData = async () => {
  const res = await PluginList();
  return res.data;
};
export { getNssTemplateData, getGenericTemplateData, getPluginData };