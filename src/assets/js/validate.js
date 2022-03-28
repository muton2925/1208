import {ref, reactive} from 'vue'
export let text_invalidated = ref(false);
export let file_invalidated = ref(false);
export let select_invalidated = ref(false);
export let selects_invalidated = reactive({})

/**
 * 
 * @param {Array} text - index 0 repeatName index 1 fileName
 * @returns 
 */
function text_Validate(text){
  const [repeatName, fileName] = text
  if(repeatName || fileName == '') {
    text_invalidated.value = true;
    return false
  }
  else {
    return true
  }
}

function select_Validate(option, set ){
  if ( option == set){
    select_invalidated.value = true;
    return false
  }else{
    return true
  }

}

function set_selects_invalidated(selectKey){
  for (const iterator of selectKey) {
    selects_invalidated[iterator] = false;
  }
}

function selects_Validate(options, set){
  for (const iterator of options) {
    if(iterator[1] == set){
      selects_invalidated[iterator[0]] = true;
    }
  }
}

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
export { set_selects_invalidated } 
export { selects_Validate } 
