async function getTableData() { // 顯示 Table 資料
    const res = await PluginList();
    td_list.value = [];
    for(let i of res.data) {     
      td_list.value.push(i);
    }
  }
export {getTableData}