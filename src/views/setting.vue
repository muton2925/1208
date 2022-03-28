<template>
<select name="" id="" v-model="loc" >
    <option value="en">EN</option>
    <option value="tw">TW</option>
</select>
{{t('show')}}
</template>
<script setup>
import { useStore } from 'vuex';
import { watch, ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n()
const store = useStore();
let loc = ref(store.state.localeLang)
watch(loc,()=>{
    store.commit("changeLocaleLang", loc.value);
    locale.value = loc.value
})
</script>
