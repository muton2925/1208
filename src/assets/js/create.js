/**
 * 
 * @param {*} form - formData
 * @param {*} element - modal element
 * @param {Array} apiList - createAPI and getFunction
 * 
 */
const callCreate =  async (form, element, apiList) => {  
        const [createData, getTableData] = apiList
        try {
          await createData(form);
          await getTableData();
          // this.setAlertData('alert-success', 'bi bi-check-circle-fill', 'Operates Successfully', 'NFV MANO Plugin has been created !');
        }
        catch(error) {
          console.log(error);
          // this.setAlertData('alert-danger', 'bi bi-x-circle-fill', 'Operates Unsuccessfully', 'Fail to create the NFV MANO Plugin !');
        }
        element.closeModalEvent();
}

export { callCreate }