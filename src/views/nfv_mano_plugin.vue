<template>
  <Table :column="th_list" :entrie="td_list" @update="updateData">
    <template v-slot:header>
      NFV MANO Plugin
    </template>
    <template v-slot:button>
      Create Plugin
    </template>
    <template v-slot:table-name>
      NFV MANO Plugin List
    </template>
    <!-- <template v-slot:table-th>
      <tr>
        <th scope="col" v-for="item in th_list" :key="item">
          <template v-if="item.sort == true">
            <div class="d-flex justify-content-between cursor-pointer" @click="sortColumn()">
              <span>{{ item.name }}</span>
              <i class="bi bi-filter ms-2"></i>
          </div>
          </template>
          <template v-else>
            <span class="cursor-pointer">{{ item.name }}</span>
          </template>
        </th>
      </tr>
    </template> -->
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
        { name: "name", text: "Plugin Name", sort: true, status: 'none' },
        { name: "allocate_nssi", text: "Allocate NSSI File", sort: true, status: 'none' },
        { name: "dellocate_nssi", text: "Deallocate NSSI File", sort: true, status: 'none' },
        { name: "update_plugin", text: "Update Plugin", sort: false, status: 'none' },
        { name: "plugin_file", text: "Plugin File", sort: false, status: 'none' },
        { name: "delete_plugin", text: "Delete Plugin", sort: false, status: 'none' },
      ],
      td_list: [
        {
          name: "2",
          allocate_nssi: "1",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/1/NFVOplugin.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "1",
          allocate_nssi: "22",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/123/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "3",
          allocate_nssi: "34",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/kube5gnfvo/simpleexampleplugin.zip",
          nm_host: "127.0.0.1:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "4",
          allocate_nssi: "4",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/kube5gnfvo1/kube5gnfvo_IITPhfr.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.180:8000",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "5",
          allocate_nssi: "57",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/kube5gnfvo2/kube5gnfvo_yAILjQX.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.180:8000",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "6",
          allocate_nssi: "16",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/kube5gnfvo3/kube5gnfvo_xPwLyrd.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.180:8000",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "7",
          allocate_nssi: "7",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/kube5gnfvo4/kube5gnfvo_d7Nfj1E.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.180:8000",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "8",
          allocate_nssi: "80",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/kube5gnfvo5/kube5gnfvo_vvQz197.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.180:8000",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "9",
          allocate_nssi: "9",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/kube5gnfvo5/kube5gnfvo_vvQz197.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.180:8000",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "10",
          allocate_nssi: "150",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/kube5gnfvo5/kube5gnfvo_vvQz197.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.180:8000",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "11",
          allocate_nssi: "171",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/kube5gnfvo5/kube5gnfvo_vvQz197.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.180:8000",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "12",
          allocate_nssi: "12",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/kube5gnfvo5/kube5gnfvo_vvQz197.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.180:8000",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "13",
          allocate_nssi: "133",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/kube5gnfvo5/kube5gnfvo_vvQz197.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.180:8000",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "14",
          allocate_nssi: "114",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "15",
          allocate_nssi: "5",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "16",
          allocate_nssi: "167",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "17",
          allocate_nssi: "157",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "18",
          allocate_nssi: "187",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "19",
          allocate_nssi: "189",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "20",
          allocate_nssi: "120",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "21",
          allocate_nssi: "231",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "22",
          allocate_nssi: "227",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "23",
          allocate_nssi: "232",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "24",
          allocate_nssi: "214",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "25",
          allocate_nssi: "215",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "26",
          allocate_nssi: "256",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "27",
          allocate_nssi: "207",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "28",
          allocate_nssi: "288",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "29",
          allocate_nssi: "279",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "30",
          allocate_nssi: "30",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "31",
          allocate_nssi: "351",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "32",
          allocate_nssi: "32",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/nfvo16/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "33",
          allocate_nssi: "33",
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
    },
  }
}
</script>

