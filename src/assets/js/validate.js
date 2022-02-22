import {ref} from 'vue'
let text_invalidated = ref(false);
let file_invalidated = ref(false);
let select_invalidated = ref(false);
function _textValidate(text){
    
}
function _selectValidate(options){
    
}
function _fileValidate(file){
    
}
// [text, select, file]
function text_validate() { // 驗證 Create Modal
    if(this.repeatName || this.templateName == '') {
      this.text_invalidated = true;
    }
    if(this.currentNFVMANO == '請選擇 ...') {
      this.select_invalidated = true;
    }
}
function create_template_validate() { // 驗證 Create Modal
    if(this.currentVNF == '請選擇 ...')
      this.select_vnf_invalidated = true;
    if(this.currentNSD == '請選擇 ...')
      this.select_nsd_invalidated = true;
    if(this.currentNRM == '請選擇 ...')
      this.select_nrm_invalidated = true;
    if(this.currentNFVMANO == '請選擇 ...') 
      this.select_nfvmano_invalidated = true;
  }

  function create_plugin_validate() { // 驗證 Create Modal
    if(this.repeatName || this.fileName == '') {
      this.text_invalidated = true;
    }
    if(this.fileData[0] == null) {
      this.file_invalidated = true;
    }
  }

  /**
   * options = {
   *    id:string
   *    value:string
   *    invalidated:bool
   * }
   * ref<options[]>
   * [{
   *    id:'VNF'
   *    value:'請選擇 ...'
   *    invalidated:false
   * },
   * {
   *    id:'NSD'
   *    value:'請選擇 ...'
   *    invalidated:false
   * },
   * {
   *    id:'NRM'
   *    value:'請選擇 ...'
   *    invalidated:false
   * },
   * {
   *    id:'NFVMANO'
   *    value:'請選擇 ...'
   *    invalidated:false
   * }]
   */