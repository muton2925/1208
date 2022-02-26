/**
 * 
 * @param {*} updateData 
 * @param {*} element 
 * @param {*} apiList 
 */
async function callUpdate(updateData, element, apiList) { // 點擊 Update Modal 內更新按鈕
        const [fileName, form] = updateData
        const [updatePlugin, getTableData] = apiList
        try {
          await updatePlugin(fileName, form);
          await getTableData();
          // this.setAlertData('alert-success', 'bi bi-check-circle-fill', 'Operates Successfully', 'NFV MANO Plugin has been updated !');
        }
        catch(error) {
          console.log(error);
          // this.setAlertData('alert-danger', 'bi bi-x-circle-fill', 'Operates Unsuccessfully', 'Fail to update the NFV MANO Plugin !');
        }
        element.closeModalEvent();
  }
export {callUpdate}