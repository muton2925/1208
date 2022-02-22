import { reactive } from "vue";

const alertInfo = reactive({
    alertExist: false,
    alertStatus: false,
    alertColor: '',
    alertIcon: '',
    alertTitle: '',
    alertContent: '',
})
async function setAlertData(config) { // alert 的樣式
    const resetConfig = JSON.parse(JSON.stringify(alertInfo))
    alertInfo.alertStatus = false; // 避免重複動作太快
    alertInfo.alertExist = false; // 避免重複動作太快
    alertInfo = config
    await this.delay(1500);
    alertInfo.alertStatus = false;
    await this.delay(100);
    alertInfo = resetConfig
  }