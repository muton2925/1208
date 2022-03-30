
import { alertEvent } from './alertData'

/**
 * create
 * @param {*} form - formData
 * @param {Array} apiList - createAPI and getFunction
 * @param {object} alertData - Template and config
 * 
 */

 const callCreate =  async (form, apiList, alertData) => {  
    const [ createData, getTableData ] = apiList;
    const { Template, configSuccess, configUnsuccess } = alertData
    try {
      await createData(form);
      await getTableData();
      alertEvent(1, Template, configSuccess);
    }
    catch(error) {
      console.log(error);
      alertEvent(0, Template, configUnsuccess);
    }
}

/**
 * updata
 * @param {*} updateData 
 * @param {*} element 
 * @param {*} apiList 
 */

 async function callUpdate(updateData, apiList, alertData) { // 點擊 Update Modal 內更新按鈕
    const [fileName, form] = updateData
    const [updatePlugin, getTableData] = apiList
    const { Template, configSuccess, configUnsuccess } = alertData
    try {
      await updatePlugin(fileName, form);
      await getTableData();
      alertEvent(1, Template, configSuccess);
    }
    catch(error) {
      console.log(error);
      alertEvent(0, Template, configUnsuccess);
    }
}

/**
 * Delete
 * @param {*} fileName 
 * @param {*} apiList 
 */

async function callDelete(fileName, apiList, alertData) { // 點擊 Delete Modal 內刪除按鈕
  const [deletePlugin, getTableData] = apiList
  const { Template, configSuccess, configUnsuccess } = alertData
  try {
    await deletePlugin(fileName)
    await getTableData();
    alertEvent(1, Template, configSuccess);
  }
  catch(error) {
    console.log(error);
    alertEvent(0, Template, configUnsuccess);
  }
}
/**
 * 
 * @param {*} file 
 */

const calldownload = (file, alertData) => { // 點擊 Download Modal 按鈕
  const { Template, configSuccess, configUnsuccess } = alertData
  if(file == null)
  alertEvent(0, Template, configUnsuccess);
  else
  alertEvent(1, Template, configSuccess);
}
export { callDelete }
export { callCreate }
export { callUpdate }
export { calldownload }

