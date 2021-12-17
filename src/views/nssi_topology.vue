<template>
  <div class="container-outer user-select-none" style="overflow:hidden">
    <div class="container-header d-flex justify-content-between align-items-center flex-nowrap mb-4">
      <h3>
         Network Slice Subnet Instance Graph
      </h3>
    </div>

    <div class="row ">
    <!-- Graph Chart -->
    <div class="col-xl-8 col-lg-7">
        <div class="card shadow mb-4" style="height: 170%">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Graph view</h6>
        </div>
        <div class="card-body">
            <div class="chart-area">
            <div ref="dom" id="container" style="height: 200%"></div>
            <hr>
            </div>
        </div>
        </div>
    </div>

    <!-- view Chart -->
    <div class="col-xl-4 col-lg-5">
        <div class="card shadow mb-4">
        <!-- Card Header - Dropdown -->
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Information</h6>
        </div>
        <!-- Card Body -->
        <div class="card-body">
            <div class="chart-pie pt-4">
            <div id="NS-view-Chart"></div>
            </div>
            <hr>
        </div>
        </div>
    </div>
    </div>
</div>

<!-- Page Heading -->
<!-- {% if id == 'NSSI' %} -->
<!-- <h1 class="h3 mb-4 text-gray-800">Network Slice Subnet Instance Graph</h1> -->
<!-- {% else %}<h1 class="h3 mb-4 text-gray-800">{{ id }} Graph</h1> -->
<!-- {% endif %} -->



</template>
<script>
import {  ref } from '@vue/runtime-core';
// import Modal from '../components/global/modal.vue';
// import Table from '../components/global/table.vue';
// import {show_nssi} from '../assets/js/01'
export default {
  components: {
    // Modal,
    // Table
  },
  setup(){

        const dom = ref(null);
      
        // onMounted(()=>{

        //   show_nssi(dom.value)
        // })
        return{
          dom
        }
  },
  data() {
    return {
      th_list :['Id List', 'Template Name', 'Description', 'Type',	'NFVO',	'VNF Status',	'Update Template',	'Template Download',	'Delete Template']
    }
  }
}
</script>
<style>
.chart-pie {
  position: relative;
  height: 15rem;
  width: 100%;
}
.chart-area {
  position: relative;
  height: 10rem;
  width: 100%;
}
@media (min-width: 768px) {
    .chart-pie {
        height: calc(20rem - 43px) !important;
    }
    .chart-area {
        height: 20rem;
    }
}
</style>