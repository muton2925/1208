<template>
  <div class="container-outer user-select-none h-100 p-4" style="overflow:hidden">
  <div class="d-flex flex-column  user-select-none">
    <div class="container-header d-flex justify-content-between align-items-center mb-4">
      <h3>
        {{ title }}
      </h3>
    </div>
  </div>
    <div class="row  ">
    <!-- Graph Chart -->
      <div class="col-lg-7 col-12">
          <div class="card shadow mb-4 mb-lg-0" >
          <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">{{ t('Graph') }} {{ t('view') }}</h6>
          </div>
          <div class="card-body">
              <div class="chart-area">
                <div ref="dom" id="container"  class=" d-flex justify-content-center h-100"></div>
                <hr>
              </div>
          </div>
          </div>
      </div>
      <!-- view Chart -->
      <div class="col-lg-5 col-12">
          <div class="card shadow ">
          <!-- Card Header - Dropdown -->
          <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">{{ t('Information') }}</h6>
          </div>
          <!-- Card Body -->
          <div class="card-body">
              <div class="chart-pie pt-4">
                <div ref="viewChart" id="NS-view-Chart"></div>
                <p class="m-0" v-for="item in NSViewChartContent" :key="item">{{item}}</p>
              </div>
              <hr>
          </div>
          </div>
      </div>
    </div>
</div>

</template>
<script>
import {  ref ,onMounted, onBeforeUnmount, watch,  inject} from '@vue/runtime-core';
import { useRoute } from "vue-router";
import { useI18n } from 'vue-i18n'
import {show_nssi,nssiContent,myChartDbclick,myChartClick,allocate_nssi,deallocate_nssi_topology,NSViewChartContent} from '../assets/js/topology'
export default {
  components: {

  },
  setup(){
    const {t} = useI18n()
    const dom = ref(null);
    const route = useRoute();
    let mychart;
    const reload = inject('reload')
    let NSSI_status = ref('NSSI');
    let title = ref(`${t('NSSI')}${t('Graph')}`)
    if(route.query.id){
      title.value = `${route.query.id} ${t('Graph')}`
    }
    function topology(){
      if (route.query.status == "deallocate"){
        NSSI_status.value = "deallocate"; 
        deallocate_nssi_topology(mychart, route.query.id)
      }
      else if (route.query.status == "allocate"){
        NSSI_status.value = "allocate"; 
        allocate_nssi(mychart, route.query.id)
      }
      else {
        NSSI_status.value = "show";
        nssiContent(mychart, route.query.id)
        myChartDbclick(mychart)
        myChartClick(mychart)
      } 
    }
    onMounted(()=>{
      mychart = show_nssi(dom.value, false)
      topology()
    })
    watch(route,()=>{
      reload()
    })
    watch(NSViewChartContent ,()=>{
      return NSViewChartContent
    })
    onBeforeUnmount(()=>{

      show_nssi(dom.value,true)
    })
    return{
      dom,NSViewChartContent,title,t
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
  height: 18rem;
  width: 100%;
}
.echarts {
  width: 100%;
  height: 400px; 
}
.h-100{
  height: 100%;
}
@media (min-width: 990px) {
    .chart-pie {
        height: calc(20rem - 43px) !important;
    }
    .chart-area {
        height: 40rem;
    }
}
</style>