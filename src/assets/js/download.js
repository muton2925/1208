function download_template_button(file) { // 點擊 Download Modal 按鈕
    if(file == null)
      this.setAlertData('alert-danger', 'bi bi-x-circle-fill', 'Operates Unsuccessfully', 'Fail to download the NFV MANO Plugin !');
    else
      this.setAlertData('alert-success', 'bi bi-check-circle-fill', 'Operates Successfully', 'NFV MANO Plugin has been downloaded !');
  }
export { download_template_button }