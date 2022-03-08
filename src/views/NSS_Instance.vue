<template>
  <Table :column="th_list" :entrie="td_list" :columnSort="columnSort"  @update="updateTableData" :status="status" :showBtn="false">
    <template v-slot:header>
      {{t('NSSI_herder',2)}}
      <!-- Network Slice Subnet Instance -->
    </template>
    <template v-slot:table-name>
      {{ `NSSI ${t('list')}` }}
      <!-- NSSI List -->
    </template>
    <template v-slot:table-td>
      <tr v-for="item in filterEntries" :key="item.templateId">
        <td  class="tablecell-custom">
          <i class="bi bi-list cursor-pointer me-1" data-bs-toggle="modal" data-bs-target="#show_plugin_Modal" @click="show_template_button(item.nssiId,item.nsInfo)"></i>
          {{ item.nssiId }}
        </td>
        <td class="tablecell-custom">{{ item.nsInstanceName }}</td>
        <td class="tablecell-custom">{{ item.administrativeState }}</td>
        <td class="tablecell-custom">{{ item.operationalState }}</td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white cursor-pointer mx-auto" style="width:30px; height:30px" @click="showGraph(item.nssiId, item.nsInstanceName)">
            <img src="../assets/topology_icon.png"  style="width:30px; height:30px" alt="">
          </div>
        </td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white cursor-pointer mx-auto bg-warning rounded-circle" style="width:30px; height:30px" data-bs-toggle="modal" data-bs-target="#Deallocate_plugin_Modal"  @click="Deallocate_NSSI_button(item.nssiId)">
            <i class="bi bi-exclamation-triangle"></i>
          </div>
        </td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-danger rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px"  data-bs-toggle="modal" data-bs-target="#delete_plugin_Modal" @click="delete_NSSI_button(item.nssiId, item.nssi_status)">
            <i class="bi bi-trash"></i>
          </div>
        </td>
      </tr>
    </template>
  </Table>
  <Modalshow ref="modalShow" @remove="removeShowData">
    <template v-slot:header>
      {{`VNF ${t('Instance')}`}}
      <!-- VNF Instance -->
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">
            {{`${t('NSSI')}${t('ID')} :`}}
            <!-- Network Slice Subnet Instance ID: -->
          </label>
          <input type="text" class="form-control" id="InputFile" placeholder="請輸入 Plugin 名稱" v-model="nssiId" readonly>
        </div>
        <div class="table-responsive">
          <table class="table table-bordered table-striped table-hover align-middle mb-0">
            <thead>
              <tr>
                <th scope="col" class="table-light cursor-pointer col-1">
                  {{`VNF ${t('Name')}`}}
                  <!-- VNF Name -->
                </th>
                <th scope="col" class="table-light cursor-pointer col-1">
                  {{`VNF ${t('Provider')}`}}
                  <!-- VNF Provider -->
                </th>
                <th scope="col" class="table-light cursor-pointer col-1">
                  {{`VNF ${t('State')}`}}
                  <!-- VNF State -->
                </th>
                <th scope="col" class="table-light cursor-pointer col-1">
                  {{`VNF IP ${t('Addresses')}`}}
                  <!-- VNF IP Addresses -->
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-if="vnfInstance">
                <tr v-for="item in vnfInstance" :key="item.id">
                  <td class="tablecell-custom">{{ item.vnfProductName }}</td>
                  <td class="tablecell-custom">{{ item.vnfProvider }}</td>
                  <td class="tablecell-custom">{{ item.vnfState }}</td>
                  <td class="tablecell-custom">{{ item.Addresses }}</td>
                </tr>
              </template>
              <template v-else>
                <tr class="text-center">
                  <td :colspan="4">
                    {{t('no')}}VNF {{t('Information')}} !!
                    <!-- No VNF Information !! -->
                  </td>  
                </tr>
              </template>
            </tbody>
          </table>          
        </div>
      </form>
    </template>
  </Modalshow>
  <Modaldelete @delete="delete_NSSI_modal" @remove="removeDeleteData">
    <template v-slot:header>
      {{`${t('Delete')}NSSI`}}
      <!-- Delete NSSI -->
    </template>
  </Modaldelete>
  <Alert ref="alertRef" v-show="alertExist"></Alert>
  <div class="modal fade" id="Deallocate_plugin_Modal" ref="modal_Deallocate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{`${t('Deallocate')}NSSI`}}
            <!-- Deallocate NSSI -->
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body mx-1">
          {{`${t('Sure to')}${t('Deallocate')}NSSI ?`}}
          <!-- Sure to deallocate NSSI ? -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{t('Cancel')}}
          </button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="Deallocate_plugin">
            {{t('Deallocate')}}
            <!-- Deallocate -->
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Table from '../components/global/table.vue';
import router from '@/router';
import { NSS_Instance } from '../assets/js/api';
import { defineAsyncComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
import {useI18n} from 'vue-i18n';
import { delay } from '../assets/js/delay';
import { alertConfig, alertEvent } from '../assets/js/alertData';
const Modalshow = defineAsyncComponent(() => import(/* webpackChunkName: "Modalshow" */ '../components/global/modal-show.vue'));
const Modaldelete = defineAsyncComponent(() => import(/* webpackChunkName: "Modaldelete" */ '../components/global/modal-delete.vue'));
const Alert = defineAsyncComponent(() => import(/* webpackChunkName: "Alert" */ '../components/global/alert.vue'));
export default {
  components: {
    Table,
    Alert,
    Modalshow,
    Modaldelete
  },
  setup(){
    const { t } = useI18n();
    const { alertRef, alertExist } = toRefs(alertConfig);
    const columnSort = ["nssiId","nsInstanceName","administrativeState","operationalState"];
    const th_list = [
      { name: "nssiId", text: `${t("NSSI")}(NSSI)` },
      { name: "nsInstanceName", text: `${t("Network")}${t("Service")}(NS)` },
      { name: "administrativeState", text: `${t("Administrative")}${t("State")}`},
      { name: "operationalState", text: `${t("Operational")}${t("State")}` },
      { name: "Graph", text: t("Graph") },
      { name: "Deallocate", text: t("Deallocate") },
      { name: "Delete_NSSI", text: `${t("Delete")}NSSI` },
    ];
    let td_list = ref([]);
    let status=ref(false);
    let filterEntries=ref([]);
    let nssiId=ref('');
    let vnfInstance=ref([]);
    let deleteData= reactive({
      id:null,
      status:null,
    });
    let Deallocate_NSSI_ID=ref('');
    onBeforeMount(async()=>{
      try {
        await  nss_instance_list();
      }
      catch(err) {
      console.log(err);
      }
      await delay(700);
      status.value = true;
    });

    const nss_instance_list = async () => {
      const { nssInstanceIist } = NSS_Instance()
      let res =   await  nssInstanceIist()
      td_list.value = [];
      for (const i of res.data.attributeListOut) {
        const obj = {
          nssiId:i.nssiId,
          nsInstanceName:'',
          administrativeState:i.administrativeState,
          operationalState:i.operationalState,
          nsInfo:i.nsInfo,
          nssi_status:''
        }
        if(i.nsInfo){
          obj.nsInstanceName = i.nsInfo.nsInstanceName
          obj.nssi_status = 'running'
          // obj.nsInfo=i.nsInfo
        }
        else{
          obj.nsInstanceName = 'null'
          obj.nssi_status = 'deallocated'
          // obj.nsInfo=null
        }
        td_list.value.push(obj)
      }
    }
    const show_template_button = (id, nsInfo) => {
      nssiId.value = id;
      if(nsInfo){
        let tojson = nsInfo.vnfInstance.replace(/'/g, '"').replace(/:[ ]*False/g, ":false").replace(/:[ ]*True/g, ":true").replace(/:[ ]*None/g, ":null");
        let vnfInstanceJson = JSON.parse(tojson);
        // if(vnfInstanceJson.length){
          let vnfIp ;
          for (const iterator of vnfInstanceJson) {
            const obj = {
              vnfProductName:iterator.vnfProductName,
              vnfProvider:iterator.vnfProvider,
              vnfState:iterator.instantiatedVnfInfo.vnfState,
              Addresses:"",
            }
            for (const i of iterator.instantiatedVnfInfo.extCpInfo) {
              if (i.cpdId == "CP2") {
                vnfIp = i.cpProtocolInfo[0].ipOverEthernet.ipAddresses[0].addresses;
                // obj.Addresses = i.cpProtocolInfo[0].ipOverEthernet.ipAddresses[0].addresses;
              }
            }
            obj.Addresses = vnfIp; 
            vnfInstance.value.push(obj)
          }
        // }
        // else{
        //   let result_array = Object.values(vnfInstanceJson);
        //   
        // }
      }
      else{
        vnfInstance.value = null
      }
    }
    const removeShowData = () => { // 關閉 Show Modal
      nssiId.value = '';
      vnfInstance.value = [];
    }
    const updateTableData = val => { // 每次執行 Table 操作，更新資料 
      filterEntries.value = val;
    }
    const showGraph = (id, status ) => {
      if(status != 'null'){
        router.push({ path:'/nssi_topology/', query: { id: id, status: 'show'}});
      }
    }
    const Deallocate_NSSI_button = id => {
      Deallocate_NSSI_ID.value = id;
    }
    const Deallocate_plugin = () => {
      router.push({ path:'/nssi_topology/', query: { id: Deallocate_NSSI_ID.value, status: 'deallocate'}});
    }
    const delete_NSSI_button = (id, status) => { // 點擊 Delete Modal 按鈕
      deleteData.id = id;
      deleteData.status = status;
    }
    const delete_NSSI_modal = () => {
      const { deleteNssi } = NSS_Instance()
      const alertData = {
            Template: `NSSI`,
            configSuccess:  t('Delete'),
            configUnsuccess:  t('deallocated'),
          }
      if(deleteData.status == 'deallocated'){
        deleteNssi(deleteData.id).then(()=>{
          nss_instance_list()
          alertEvent(1, alertData.Template, alertData.configSuccess, true)
        })
      }else{
        alertEvent(0, alertData.Template, alertData.configUnsuccess, true)
      }  
    }
    const removeDeleteData = () => {
      deleteData.id = null;
      deleteData.status = null;
    }
    return{
      t,
      alertRef, alertExist,
      columnSort,th_list,td_list,status,filterEntries,nssiId,vnfInstance,
      removeDeleteData,delete_NSSI_modal,delete_NSSI_button,Deallocate_plugin,
      Deallocate_NSSI_button,showGraph,updateTableData,removeShowData,show_template_button
    }
  }
  // data() {
  //   return {
  //     th_list: [
  //       // { name: "nssiId", text: `Network Slice Subnet Instance(NSSI)` },
  //       // { name: "nsInstanceName", text: "Network Service(NS)" },
  //       // { name: "administrativeState", text: "Administrative State" },
  //       // { name: "operationalState", text: "Operational State" },
  //       // { name: "Graph", text: "Graph" },
  //       // { name: "Deallocate", text: "Deallocate" },
  //       // { name: "Delete_NSSI", text: "Delete NSSI" },
  //     ],
  //     columnSort: ["nssiId","nsInstanceName","administrativeState","operationalState"],
  //     columnNumber: 7,
  //     td_list:[],
  //     status:false,
  //     filterEntries:[],
  //     nssiId:'',
  //     vnfInstance:[],
  //     deleteData:{
  //       id:null,
  //       status:null
  //     },
  //     alertInfo: {
  //       alertExist: false,
  //       alertStatus: false,
  //       alertColor: '',
  //       alertIcon: '',
  //       alertTitle: '',
  //       alertContent: '',
  //     },
  //     Deallocate_NSSI_ID:'',
  //     i18n:null
  //   }
  // },
  // async created(){
  //   const { t } = useI18n();
  //   this.i18n = t;
  //   this.th_list = [
  //     { name: "nssiId", text: `${this.i18n("NSSI")}(NSSI)` },
  //     { name: "nsInstanceName", text: `${this.i18n("Network")}${this.i18n("Service")}(NS)` },
  //     { name: "administrativeState", text: `${this.i18n("Administrative")}${this.i18n("State")}`},
  //     { name: "operationalState", text: `${this.i18n("Operational")}${this.i18n("State")}` },
  //     { name: "Graph", text: this.i18n("Graph") },
  //     { name: "Deallocate", text: this.i18n("Deallocate") },
  //     { name: "Delete_NSSI", text: `${this.i18n("Delete")}NSSI` },
  //   ]
  //   try {
  //     await  this.nss_instance_list();
  //   }
  //   catch(err) {
  //     console.log(err);
  //   }
  //   await this.delay(700);
  //   this.status = true;
  // },
  // methods:{
  // delay(interval) { // 計時器
  //     return new Promise((resolve) => {
  //       setTimeout(resolve,interval);
  //     })
  //   },
  // async  nss_instance_list(){
  //   const { nssInstanceIist } = NSS_Instance()
  //   let res =   await  nssInstanceIist()
  //       this.td_list = [];
  //       for (const i of res.data.attributeListOut) {
  //         const obj = {
  //           nssiId:i.nssiId,
  //           nsInstanceName:'',
  //           administrativeState:i.administrativeState,
  //           operationalState:i.operationalState,
  //           nsInfo:i.nsInfo,
  //           nssi_status:''
  //         }
          
  //         if(i.nsInfo){
  //           obj.nsInstanceName = i.nsInfo.nsInstanceName
  //           obj.nssi_status = 'running'
  //           // obj.nsInfo=i.nsInfo
  //         }
  //         else{
  //           obj.nsInstanceName = 'null'
  //           obj.nssi_status = 'deallocated'
  //           // obj.nsInfo=null
  //         }
  //         this.td_list.push(obj)
  //       }
  //   },
  //   show_template_button(id, nsInfo){
  //     this.nssiId = id;
  //     if(nsInfo){
  //       let tojson = nsInfo.vnfInstance.replace(/'/g, '"').replace(/:[ ]*False/g, ":false").replace(/:[ ]*True/g, ":true").replace(/:[ ]*None/g, ":null");
  //       let vnfInstanceJson = JSON.parse(tojson);
  //       // if(vnfInstanceJson.length){
  //         let vnfIp ;
  //         for (const iterator of vnfInstanceJson) {
  //           const obj = {
  //             vnfProductName:iterator.vnfProductName,
  //             vnfProvider:iterator.vnfProvider,
  //             vnfState:iterator.instantiatedVnfInfo.vnfState,
  //             Addresses:"",
  //           }
  //           for (const i of iterator.instantiatedVnfInfo.extCpInfo) {
  //             if (i.cpdId == "CP2") {
  //               vnfIp = i.cpProtocolInfo[0].ipOverEthernet.ipAddresses[0].addresses;
  //               // obj.Addresses = i.cpProtocolInfo[0].ipOverEthernet.ipAddresses[0].addresses;
  //             }
  //           }
  //           obj.Addresses = vnfIp; 
  //           this.vnfInstance.push(obj)
  //         }
  //       // }
  //       // else{
  //       //   let result_array = Object.values(vnfInstanceJson);
  //       //   
  //       // }
  //     }
  //     else{
  //       this.vnfInstance = null
  //     }

  //   },
  //   removeShowData() { // 關閉 Show Modal
  //     this.nssiId = '';
  //     this.vnfInstance = [];
  //   },
  //   updateTableData(val) { // 每次執行 Table 操作，更新資料 
  //     this.filterEntries = val;
  //   },
  //   showGraph(id, status){
  //     if(status != 'null'){
  //       router.push({ path:'/nssi_topology/', query: { id: id, status: 'show'}});
  //     }
  //   },
  //   Deallocate_NSSI_button(id){
  //     this.Deallocate_NSSI_ID = id;
  //   },
  //   Deallocate_plugin(){
  //     router.push({ path:'/nssi_topology/', query: { id: this.Deallocate_NSSI_ID, status: 'deallocate'}});
  //   },
  //   delete_NSSI_button(id, status) { // 點擊 Delete Modal 按鈕
  //     this.deleteData.id = id;
  //     this.deleteData.status = status;
  //   },
  //   delete_NSSI_modal(){
  //     const { deleteNssi } = NSS_Instance()
  //     if(this.deleteData.status == 'deallocated'){
  //       deleteNssi(this.deleteData.id).then(()=>{
  //         this.nss_instance_list()
  //         // this.setAlertData('alert-success','bi bi-check-circle-fill','Operates Successfully','NSSI Delete Success !');
  //          this.setAlertData('alert-success','bi bi-check-circle-fill',`${this.i18n('Operates')}${this.i18n('Success')}`,`NSSI ${this.i18n('Delete')}${this.i18n('Success')} !`);
  //       })
  //     }else{
  //       // this.setAlertData('alert-danger','bi bi-x-circle-fill','Operates Unsuccessfully','NSSI is not deallocated !!');
  //       this.setAlertData('alert-danger','bi bi-x-circle-fill',`${this.i18n('Operates')}${this.i18n('Unsuccess')}`,`NSSI ${this.i18n('yet')}${this.i18n('deallocated')} !!`);
  //     }  
  //   },
  //   removeDeleteData(){
  //     this.deleteData.id = null;
  //     this.deleteData.status = null;
  //   },
  //   setAlertData(color,icon,title,content) { // alert 的樣式
  //     this.alertInfo.alertStatus = false; // 避免重複動作太快
  //     this.alertInfo.alertExist = false; // 避免重複動作太快
  //     this.alertInfo.alertColor = color;
  //     this.alertInfo.alertIcon = icon;
  //     this.alertInfo.alertTitle = title;
  //     this.alertInfo.alertContent = content;
  //     this.alertInfo.alertStatus = true;
  //     this.alertInfo.alertExist = true;
  //     setTimeout(() => {
  //       this.alertInfo.alertStatus = false;
  //       setTimeout(() => {
  //         this.alertInfo.alertExist = false;
  //         this.alertInfo.alertColor = '';
  //         this.alertInfo.alertIcon = '';
  //         this.alertInfo.alertTitle = '';
  //         this.alertInfo.alertContent = '';
  //       },100);
  //     },1500);
  //   },
  // }
}
</script>
