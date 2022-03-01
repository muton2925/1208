import { ref } from 'vue';
const update = () => {
  const filterEntries = ref([]);
  const updateTableData = val => {
    filterEntries.value = val;
  };
  return { filterEntries, updateTableData };
}
export { update };