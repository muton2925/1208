<template>
  <Table  v-if="status" :column="th_list" :entrie="td_lst" @update="updateData">
    <template v-slot:header>
      Virtualized Network Function Template
    </template>
    <template v-slot:button>
      Create VNF Template
    </template>
    <template v-slot:table-name>
      VNF Template List
    </template>
 
    <template v-slot:table-td>
      <tr v-for="(item,i) in filterEntries" :key="item.name">
        <td><i class=" text-white bg-info rounded-circle cursor-pointer bi bi-file-text-fill mx-2"></i>{{ item.templateId }}
        </td>
        <td>{{ item.name }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.templateType }}</td>
        <td>{{ item.nfvoType }}</td>
        <td>{{ item.operationStatus }}</td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-warning rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" ata-bs-toggle="modal" data-bs-target="#a">
            <i class="bi bi-wrench"></i>
          </div>
        </td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-primary rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px">
            <i class="bi bi-arrow-down"></i>
          </div>
        </td>
        <td class="w-0">
          <div class="d-flex justify-content-center align-items-center text-white bg-danger rounded-circle cursor-pointer mx-auto" style="width:30px; height:30px" @click="delete_template(item.templateId,i)">
            <i class="bi bi-trash"></i>
          </div>
        </td>
      </tr>
    </template>
  </Table>
    <Modal>
    <template v-slot:header>
      Create new VNF Template
    </template>
    <template v-slot:body>
      <form>
        <div class="mb-3">
          <label for="InputFile" class="form-label">Template Name :</label>
          <input type="text" class="form-control" id="InputFile" placeholder="Template Name">
        </div>
        <div class="mb-2">
          <label for="InputFile2" class="form-label">VNF Description :</label>
          <input type="text" class="form-control" id="InputFile2" placeholder="VNF Description">
        </div>
        <div class="mb-2">
          <label for="NFVOName" class="form-label">NFVO Name :</label>
          <select ref= 'NFVOName' name="NFVOName" id="NFVOName"></select>
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
import Modal from '../components/global/modal-create.vue';
import Table from '../components/global/table.vue';
import {Share,GenericTemplate} from '../assets/js/api'
export default {
  components: {
    Modal,
    Table
  },
  data() {
    return {
      filterEntries:[],
      status:false,
       th_list: [
        { name: "idList", text: "Id List", sort: true, status: 'none' },
        { name: "name", text: "Template Name", sort: true, status: 'none' },
        { name: "Description", text: "Description", sort: true, status: 'none' },
        { name: "Type", text: "Type", sort: true, status: 'none' },
        { name: "NFVO", text: "NFVO", sort: true, status: 'none' },
        { name: "VNF_Status", text: "VNF Status", sort: true, status: 'none' },
        { name: "update_template", text: "Update Template", sort: false, status: 'none' },
        { name: "Template_Download", text: "Template Download", sort: false, status: 'none' },
        { name: "delete_template", text: "Delete Template", sort: false, status: 'none' },
      ],
      td_lst:[]
    }
  },
  created(){
    const {TemplateList}  = Share();
    const th = this;
    TemplateList().then(res=>{
      console.log(res)
      const VNF =res.data.filter(x=>x.templateType == 'VNF')
      VNF.forEach(element => {
        th.td_lst.push(element)
      });
       this.status=true;
    }).catch(err=>{
      console.log(err)
      this.status=true;
    })
 
  },
  methods:{
    updateData(val) {
      this.filterEntries = val;
    },
    delete_template(templateId,index){
      const {deleteGenericTemplate}=GenericTemplate()
      var yes = confirm("Sure to delete VNF Template ?");
      if (yes) {
        deleteGenericTemplate(templateId).then(()=>{
          alert("VNF Template Delete Success");
        }).catch((error) => {
          console.log(error);
          alert("ERROR!!");
        });
        this.td_lst.splice(index,1)
      }
      
    }
  }
}
</script>