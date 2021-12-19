<template>
  <Table :entries="td_list" @update="updateData">
    <template v-slot:header>
      NFV MANO Plugin
    </template>
    <template v-slot:button>
      Create Plugin
    </template>
    <template v-slot:table-name>
      NFV MANO Plugin List
    </template>
    <template v-slot:table-th>
      <tr>
        <th scope="col" v-for="item in th_list" :key="item">
          <div class="d-flex cursor-pointer">
            <span>{{ item.name }}</span>
            <i v-if="item.sort == true" class="bi bi-filter ms-auto"></i>
          </div>
        </th>
      </tr>
    </template>
    <template v-slot:table-td>
      <tr v-for="item in filterEntries" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.allocate_nssi }}</td>
        <td>{{ item.deallocate_nssi }}</td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-warning rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px">
            <i class="bi bi-wrench"></i>
          </div>
        </td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-primary rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px">
            <i class="bi bi-arrow-down"></i>
          </div>
        </td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-danger rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px">
            <i class="bi bi-trash"></i>
          </div>
        </td>
      </tr>
    </template>
  </Table>

  <Modal>
    <template v-slot:header>
      Create new NFV MANO Plugin
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">Plugin Name</label>
          <input type="text" class="form-control" id="InputFile" placeholder="請輸入 Plugin 名稱">
        </div>
        <div class="mb-2">
          <label for="UploadFile" class="form-label">Plugin File</label>
          <input type="file" class="form-control" id="UploadFile">
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="button" class="btn btn-primary text-white">Create</button>
    </template>
  </Modal>
</template>
<script>
import Modal from '../components/global/modal.vue';
import Table from '../components/global/table.vue';
// import { Share } from '../assets/js/api'
export default {
  components: {
    Modal,
    Table
  },
  setup(){
    // const {PluginList,TemplateList} = Share();
    // PluginList().then(res=>{
    //   console.log(res)
    // })
    // TemplateList().then(res=>{
    //   console.log(res)
    // })
   return {

   }
  },
  data() {
    return {
      filterEntries: [],
      th_list: [
        { name: "Plugin Name", sort: true },
        { name: "Allocate NSSI File", sort: true },
        { name: "Deallocate NSSI File", sort: true },
        { name: "Update Plugin", sort: false },
        { name: "Plugin File", sort: false },
        { name: "Delete Plugin", sort: false },
      ],
      td_list: [
        {
          name: "1",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/1/NFVOplugin.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "123",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/123/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "kube5gnfvo",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/kube5gnfvo/simpleexampleplugin.zip",
          nm_host: "127.0.0.1:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "kube5gnfvo1",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/kube5gnfvo1/kube5gnfvo_IITPhfr.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.180:8000",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "kube5gnfvo2",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/kube5gnfvo2/kube5gnfvo_yAILjQX.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.180:8000",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "kube5gnfvo3",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/kube5gnfvo3/kube5gnfvo_xPwLyrd.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.180:8000",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "kube5gnfvo4",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/kube5gnfvo4/kube5gnfvo_d7Nfj1E.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.180:8000",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "kube5gnfvo5",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/kube5gnfvo5/kube5gnfvo_vvQz197.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.180:8000",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "kube5gnfvo6",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/kube5gnfvo5/kube5gnfvo_vvQz197.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.180:8000",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "kube5gnfvo7",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/kube5gnfvo5/kube5gnfvo_vvQz197.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.180:8000",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "kube5gnfvo8",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/kube5gnfvo5/kube5gnfvo_vvQz197.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.180:8000",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "kube5gnfvo9",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/kube5gnfvo5/kube5gnfvo_vvQz197.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.180:8000",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "kube5gnfvo10",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/kube5gnfvo5/kube5gnfvo_vvQz197.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.180:8000",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "nfvof16",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "nfvo18fff6",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "nfvo1eee76",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "nfvfffo146",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "nfqqqvo161",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "nfvqfweo161",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "nfvefqo161",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "nfvo1feqw61",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "nfvoqwfe161",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "nfvofeqw161",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "nffeqvo161",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "nfvofqwf161",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "nfqfwevo161",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "nfvofqw161",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "nfvo1feq61",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "nfvqwfeo161",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "nfvoqef161",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "nfqewfvo161",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "nfvoqe161",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "nfvgfo161",
          allocate_nssi: "allocate/main.py",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
      ],
    };
  },
  methods: {
    updateData(val) {
      this.filterEntries = val;
    }
  }
}
</script>

