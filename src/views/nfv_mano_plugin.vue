<template>
  <Table v-if="status" :column="th_list" :entrie="td_list" :columnSort="columnSort" :columnNumber="columnNumber" @update="updateData">
    <template v-slot:header>
      NFV MANO Plugin
    </template>
    <template v-slot:button>
      Create Plugin
    </template>
    <template v-slot:table-name>
      NFV MANO Plugin List
    </template>
    <template v-slot:table-td>
      <tr v-for="item in filterEntries" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.allocate_nssi }}</td>
        <td>{{ item.deallocate_nssi }}</td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-warning rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" data-bs-toggle="modal" data-bs-target="#update_plugin_Modal" @click="update_plugin(item.name)">
            <i class="bi bi-wrench"></i>
          </div>
        </td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-primary rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px">
            <i class="bi bi-arrow-down"></i>
          </div>
        </td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-danger rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" data-bs-toggle="modal" data-bs-target="#delete_plugin_Modal" @click="delete_plugin(item)">
            <i class="bi bi-trash"></i>
          </div>
        </td>
      </tr>
    </template>
  </Table>
  <Modalcreate :fileName="fileName" :fileData="fileData" @remove="removeAllData">
    <template v-slot:header>
      Create new NFV MANO Plugin
    </template>
    <template v-slot:body>
      <form :class="{ 'was-invalidated': isinvalidated }">
        <div class="mb-3">
          <label for="InputFile" class="form-label">Plugin Name :</label>
          <input type="text" class="form-control" :class="{ 'is-invalid' : text_invalidated }" id="InputFile" placeholder="請輸入 Plugin 名稱" v-model="fileName">
          <div class="invalid-feedback">
            <template v-if="repeatName">
              此 Plugin 名稱已存在
            </template>
            <template v-else>
              Plugin 名稱不得為空
            </template>
          </div>
        </div>
        <div class="mb-2">
          <label for="UploadFile" class="form-label">Plugin File :</label>
          <input type="file" class="form-control" :class="{ 'is-invalid' : file_invalidated }" id="UploadFile" ref="uploadData" accept=".zip" @change="add_plugin">
          <div class="invalid-feedback">
            檔案不得為空
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-primary text-white" @click="create_plugin">Create</button>
    </template>
  </Modalcreate>
  <Modalupdate :fileName="fileName" @remove="removeData">
    <template v-slot:header>
      Update Service Mapping Plugin
    </template>
    <template v-slot:plugin-name>
      Plugin Name :
    </template>
    <template v-slot:plugin-file>
      Plugin File :
    </template>
  </Modalupdate>
  <Modaldelete :fileData="fileData" @delete="deleteData" @remove="removeFile"></Modaldelete>
</template>
<script>
import Modalcreate from '../components/global/modal-create.vue';
import Modalupdate from '../components/global/modal-update.vue';
import Modaldelete from '../components/global/modal-delete.vue';
import Table from '../components/global/table.vue';
import { ref } from 'vue';
import { $array } from 'alga-js';
import { Share } from '../assets/js/api';
import { nfv_mano_plugin } from '../assets/js/api';
export default {
  components: {
    Modalcreate,
    Modalupdate,
    Modaldelete,
    Table
  },
  setup() {
    const uploadData = ref(null)
    return{
      uploadData
    }
  },
  created() {
    const { PluginList } = Share();
    PluginList()
    .then(res => {
      console.log(res)
      for(let i of res.data){
        this.td_list.push(i);
      }
      this.status = true;
    })
    .catch(res => {
      console.log(res);
      this.status = true;
    })
  },
  data() {
    return {
      filterEntries: [],
      status: true,
      th_list: [
        { name: "name", text: "Plugin Name", sort: true, status: 'none' },
        { name: "allocate_nssi", text: "Allocate NSSI File", sort: true, status: 'none' },
        { name: "dellocate_nssi", text: "Deallocate NSSI File", sort: true, status: 'none' },
        { name: "update_plugin", text: "Update Plugin", sort: false, status: 'none' },
        { name: "plugin_file", text: "Plugin File", sort: false, status: 'none' },
        { name: "delete_plugin", text: "Delete Plugin", sort: false, status: 'none' },
      ],
      td_list:[],
      td_list2: [
        {
          name: "123",
          allocate_nssi: "1",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/1/NFVOplugin.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "12345",
          allocate_nssi: "22",
          deallocate_nssi: "deallocate/main.py",
          pluginFile:
            "http://10.0.0.15:8081/plugin/management/download/123/kube5gnfvo_16.zip",
          nm_host: "10.0.0.15:8000",
          nfvo_host: "10.0.0.16:30888",
          subscription_host: "10.0.1.108:8082",
        },
        {
          name: "123456",
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
      columnSort: ['name','allocate_nssi','dellocate_nssi'],
      columnNumber: 6,
      fileName: '',
      fileData: {},
      text_invalidated: false, //文字是否未通過認證
      file_invalidated: false
    };
  },
  computed: {
    isinvalidated() {
      return this.text_invalidated || this.file_invalidated;
    },
    repeatName() {
      return this.td_list.map(function(e) { return e.name }).includes(this.fileName);
    }
  },
  watch: {
    fileName: {
      handler: function() {
        this.text_invalidated = false;
      }
    },
    fileData: {
      handler: function() {
        this.file_invalidated = false;
      }
    }
  },
  methods: {
    updateData(val) {  // emit
      this.filterEntries = val;
    },
    deleteData() { // emit
      const { deletePlugin } = nfv_mano_plugin();
      deletePlugin(this.fileData.name)
      .then(() => {
        let index = this.td_list.indexOf(this.fileData);
        this.td_list = $array.destroy(this.td_list, index);
        this.removeFile();
      })
      .catch(res => {
        console.log(res)
        this.removeFile();
      })
    },
    removeFile() {
      this.fileData = {};
    },
    removeData() {
      this.fileName = '';
      this.fileData = {};
    },
    removeAllData() {
      this.removeData();
      this.$refs.uploadData.value = null;
    },
    add_plugin(e) {
      this.fileData = e.target.files;
    },
    create_plugin() {
      this.create_validate();
      if(this.isinvalidated == false) {
        const { createPluginList } = nfv_mano_plugin();
        let form = new FormData();
        form.append("name", this.fileName);
        form.append("pluginFile", this.fileData[0]);
        createPluginList(form)
        .then(res => {
          console.log(res.data);
          let obj = {
            name: res.data.name,
            allocate_nssi: 'allocate/main.py',
            deallocate_nssi: 'deallocate/main.py',
            pluginFile: res.data.pluginFile,
            nm_host: '10.20.1.57:8081',
            nfvo_host: '10.0.0.16:30888',
            subscription_host: '10.0.1.108:8082'
          };
          this.td_list.push(obj);
          this.removeAllData();
        })
        .catch(res => {
          console.log(res);
          this.removeAllData();
        })
      }
    },
    create_validate() {
      if(this.repeatName || this.fileName == '') {
        this.text_invalidated = true;
      }
      if(this.fileData[0] == null) {
        this.file_invalidated = true;
      }
    },
    update_plugin(name) {
      this.fileName = name;
    },
    delete_plugin(file) {
      this.fileData = file;
    },
  }
}
</script>

