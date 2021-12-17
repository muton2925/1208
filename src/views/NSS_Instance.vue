<template>
  <Table :showBtn="false">
    <template v-slot:header>
      Network Slice Subnet Instance
    </template>
    <template v-slot:table>
      NSSI List
    </template>
    <template v-slot:tr>
      <th v-for="item in th_list" :key="item">{{ item }}</th>
    </template>
  </Table>
</template>
<script>
// import Modal from '../components/global/modal.vue';
import Table from '../components/global/table.vue';
export default {
  components: {
    // Modal,
    Table
  },
  data() {
    return {
      th_list :['Network Slice Subnet Instance(NSSI)','Id', 'Network Service(NS)', 'Administrative State', 'Operational State',	'Graph',	'Deallocate', '	Delete NSSI']
    }
  }
}
</script>
