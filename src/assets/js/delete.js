async function callDelete(fileName, apiList) { // 點擊 Delete Modal 內刪除按鈕
    const [deletePlugin, getTableData] = apiList
    try {
      await deletePlugin(fileName)
      await getTableData();
      // this.setAlertData('alert-success', 'bi bi-check-circle-fill', 'Operates Successfully', 'NFV MANO Plugin has been deleted !');
    }
    catch(error) {
      console.log(error);
      // this.setAlertData('alert-danger', 'bi bi-x-circle-fill', 'Operates Unsuccessfully', 'Fail to delete the NFV MANO Plugin !');
    }
  }

export { callDelete }