import { delay } from './delay.js';
import { ref, toRefs, reactive } from 'vue';
export const alert = () => {
  const alertInfo = reactive({
    alertRef: ref(null), // alert1 對應的 ref
    alertExist: ref(false), // alert1 是否存在
  });
  const { alertRef, alertExist } = toRefs(alertInfo);
  const alertEvent = async (status, name, action) => { // 通知事件
    alertExist.value = true;
    await alertRef.value.alertInfo(status, name, action);
    await delay(100);
    alertExist.value = false;
  };
  return { ...toRefs(alertInfo), alertEvent };
}