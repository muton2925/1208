<template>
<select name="" id="" v-model="loc" >
    <option value="en">EN</option>
    <option value="tw">TW</option>
</select>
{{t('show')}}
</template>
<script setup>

import { watch ,ref} from 'vue';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n()
let loc = ref('en')
watch(loc,()=>{
    locale.value = loc.value
})
</script>
