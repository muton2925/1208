<template>
  <Table :column="th_list" :entrie="td_list" :columnSort="columnSort" :status="status" :showBtn="false" @update="updateTableData">
    <template v-slot:header>
     <button @click="a()"  class="btn btn-primary ms-3 text-white">
          <i class="d-sm-none bi bi-folder-plus"></i>
          <span class="d-none d-sm-inline">
            {{ `NFV MANO ${ t('Plugin') }`}}
          </span>
        </button>
    </template>
    <template v-slot:table-name>
      {{ `NFV MANO ${ t('Plugin') } ${ t('list') }`}}
    </template>
    <template v-slot:table-td>
      <tr v-for="item in filterEntries" :key="item.name">
        <td v-for="i in columnSort" :key="i">{{ item[i] }}</td>
      </tr>
    </template>
  </Table>
  
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import { delay } from '@/assets/js/delay';
import Table from '../components/global/table.vue';
import { Share } from '@/assets/js/api';
import { ref, onBeforeMount } from 'vue';
const { PluginList } = Share();
const { t } = useI18n();
const th_list = ref([
  { name: "userName", text: "userName" },
  { name: "name", text: `${ t("Plugin") }${ t("Name") }` },
  { name: "allocate_nssi", text: `${ t("Allocate") }NSSI${ t("File") }` },
  { name: "deallocate_nssi", text: `${ t("Deallocate") }NSSI${ t("File") }` }
]);
const td_list = ref([]);
const status = ref(false);
const filterEntries = ref([]);
const columnSort = ref(['user_name', 'name', 'allocate_nssi', 'deallocate_nssi']);
const getTableData = async () => { // 顯示 Table 資料
  const res = await PluginList();
  console.log(res)
  td_list.value = res.data;
};
const updateTableData = val => {  // 每次執行 Table 操作，更新資料 
  filterEntries.value = val;
};
const a = () => {
  console.log(123)
  th_list.value = [
  { name: "userName", text: "userName" },
  { name: "templateId", text: t("ID") },
  { name: "name", text: `${ t("Template") }${ t("Name") }` },
  { name: "description", text: t("Description") },
  { name: "templateType", text: t('Type') },
  { name: "nfvoType", text: t("NFVO") },
  { name: "operationStatus", text: `NRM ${ t('Status') }` },]
  columnSort.value = ['userName', 'templateId', 'name', 'description', 'templateType', 'nfvoType', 'operationStatus']
}
onBeforeMount(async () => {
  try {
    await getTableData();
  }
  catch(err) {
    console.log(err);
  }
  await delay(700);
  status.value = true;
});
</script>