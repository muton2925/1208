import { ref, reactive, toRefs } from 'vue';
import { nss_template } from './api.js';
const { nssTemplateList } = nss_template();
const variables = () => {
  const a = ref(1);
  const list = reactive({
    nfv_mano_list: ref([]), // NFV MANO Plugin 資料的陣列
    template_list: ref([]), // 特定的 VNF/NSD/NRM Template 資料的陣列
    generic_template_list: ref([]), // 有 Upload 的所有 VNF/NSD/NRM Template 資料的陣列
  });
  return {...toRefs(list),...toRefs(a)};
};
const { template_list,a } = variables();
const get = () => {
  const pl = () => {
    a.value++;
    console.log(a.value)
  }
  const getNssTemplateData = async () => {
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
  return { getNssTemplateData,pl };
};
export { variables, get };