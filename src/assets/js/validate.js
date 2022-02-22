import {ref} from 'vue'
export let text_invalidated = ref(false);
export let file_invalidated = ref(false);
// let select_invalidated = ref(false);
function _textValidate(text){
  const [repeatName, fileName] = text
  if(repeatName || fileName == '') {
    text_invalidated.value = true;
  }
}
// function _selectValidate(options){
    
// }
function _fileValidate(file){
  if( file == null) {
      file_invalidated.value = true;
  }
}

export { _textValidate }
export { _fileValidate }
// [text, select, file]
// function text_validate() { // 驗證 Create Modal
//     if(this.repeatName || this.templateName == '') {
//       this.text_invalidated = true;
//     }
//     if(this.currentNFVMANO == '請選擇 ...') {
//       this.select_invalidated = true;
//     }
// }
// function create_template_validate() { // 驗證 Create Modal
//     if(this.currentVNF == '請選擇 ...')
//       this.select_vnf_invalidated = true;
//     if(this.currentNSD == '請選擇 ...')
//       this.select_nsd_invalidated = true;
//     if(this.currentNRM == '請選擇 ...')
//       this.select_nrm_invalidated = true;
//     if(this.currentNFVMANO == '請選擇 ...') 
//       this.select_nfvmano_invalidated = true;
//   }
