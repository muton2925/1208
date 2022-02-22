

async function create_template_modal(validate, FormData, element) { // 點擊 Create Modal 內創建按鈕
    this.create_template_validate();
    
    if(!this.text_invalidated && !this.select_invalidated) {
      let form = new FormData();
      form.append("name", this.templateName);
      form.append("description", this.templateDescription);
      form.append("nfvoType", this.currentNFVMANO);
      form.append("templateType", "NSD");
      try {
        let res = await createGenericTemplate(form);
        this.td_list.push(res.data);
        const alertInfo = {
          alertExist: true,
          alertStatus: true,
          alertColor: 'alert-success',
          alertIcon: 'bi bi-check-circle-fill',
          alertTitle: 'Operates Successfully',
          alertContent: 'NSD Template has been created !',
        }
        setAlertData(alertInfo)
        // this.setAlertData('alert-success', 'bi bi-check-circle-fill', 'Operates Successfully', 'NSD Template has been created !');
      }
      catch(err) {
        console.log(err);
        this.setAlertData('alert-danger', 'bi bi-x-circle-fill', 'Operates Unsuccessfully', 'Fail to create the NSD Template !');
      }
      this.$refs.modalCreate.closeModalEvent();
    }
  }