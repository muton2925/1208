<template>
  <div class="container-outer" style="overflow:hidden">
    <containerHeader title="Network Slice Subnet Instance" :createBtn="false"></containerHeader>
    <fileTable title="NSSI List" :tableFile="th_list"></fileTable>

  </div>

</template>
<script>
import fileTable from '../components/global/fileTable.vue'
import containerHeader from '../components/global/containerHeader.vue'
export default {
  components:{
    fileTable
    ,containerHeader
  },
  data() {
    return {
      th_list :['Network Slice Subnet Instance(NSSI)','Id', 'Network Service(NS)', 'Administrative State', 'Operational State',	'Graph',	'Deallocate', '	Delete NSSI']
    }
  }
}
</script>
