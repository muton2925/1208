import {ref} from 'vue'
export let text_invalidated = ref(false);
export let file_invalidated = ref(false);
export let select_invalidated = ref(false);

/**
 * 
 * @param {Array} text - index 0 repeatName index 1 fileName
 * @returns 
 */
function text_Validate(text){
  const [repeatName, fileName] = text
  if(repeatName || fileName == '') {
    text_invalidated.value = true;
  }
  else {
    return true
  }
}

function select_Validate(option, set ){
  if ( option == set){
    select_invalidated.value = true;
  }else{
    return true
  }

}

// function selects_Validate(options, set = `${t('Please')}${t('select')} ...` ){
//   for (const iterator of options) {
//     if( iterator == set ){

//     }
//   }
// }

/**
 * 
 * @param {string} file - fileData 
 * @returns 
 */
function file_Validate(file){
  if( file == null) {
    file_invalidated.value = true;
  }
  else {
    return true
  }
}

export { text_Validate }
export { file_Validate }
export { select_Validate } 
// export { selects_Validate } 
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
