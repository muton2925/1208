<template>
  <Table :column="th_list" :entrie="td_list" :columnSort="columnSort" :status="status" :showBtn="showBtn" @update="updateTableData">
    <template v-slot:header>
        <button class="btn btn-primary ms-3 text-white">
          <span class="d-none d-sm-inline">
            {{t('nfv.plugin', ['NFV MANO'])}}
          </span>
        </button>
    </template>
    <template v-slot:table-name>
      {{t('nfv.plugin', ['NFV MANO', t('list')])}}
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
const showBtn = ref(false)
const th_list = ref([
  { name: "userName", text: t('base.userName') },
  { name: "name", text: t('nfv.name') },
  { name: "allocate_nssi", text: t('nfv.allocate') },
  { name: "deallocate_nssi", text: t('nfv.deallocate') }
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
// const a =async () => {
//   console.log(123)
//   status.value = false;
//  await delay(700)
//   status.value = true;
// }
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