function removeCreateData(element) { // 關閉 Create Modal
    this.fileName = '';
    this.fileData = {};
    this.text_invalidated = false;
    this.file_invalidated = false;
    element = null;
  }
function removeUpdateData() { // 關閉 Update Modal
  this.fileName = '';
  this.fileData = {};
  this.file_invalidated = false;
  this.$refs.uploadData_update.value = null;
}
function removeDeleteData() { // 關閉 Delete Modal
  this.fileData = {};
}
//   removeCreateData() { // 關閉 Create Modal
//     this.templateName = '';
//     this.templateDescription = '';
//     this.currentNFVMANO = '請選擇 ...';
//     this.text_invalidated = false;
//     this.select_invalidated = false;
//   },
//   removeUpdateData() { // 關閉 Update Modal
//     this.templateId = '';
//     this.templateData = {};
//     this.currentNFVMANO = '請選擇 ...';
//     this.file_invalidated = false;
//     this.$refs.uploadData_update.value = null;
//   },
//
/**
 *  remove
 * {
 *  templateName:string 
 *  options :  'string'
 *  validated: bool
 * }
 * 
 * 
 * 
 */