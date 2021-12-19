<template>
  <div class="container-outer user-select-none" style="overflow:hidden">
    <div class="container-header d-flex justify-content-between align-items-center flex-wrap mb-4">
      <h3>
        <slot name="header"></slot>
      </h3>
      <button v-if="btn" class="btn btn-primary text-white" data-bs-toggle="modal" data-bs-target="#create_plugin_Modal">
        <i class="d-sm-none bi bi-folder-plus"></i>
        <span class="d-none d-sm-inline">
          <slot name="button"></slot>
        </span>
      </button>
    </div>
    <div class="card shadow-sm">
      <div class="card-header card-header-custom py-3">
        <h6>
          <slot name="table-name"></slot>
        </h6>
      </div>
      <div class="card-body">
        <div class="d-flex mb-3">
          <div class="d-flex align-items-baseline">
            Show
            <select v-model="currentEntries" class="form-select form-select-sm form-select-custom mx-2" @change="paginateEntries">
              <option v-for="option in showEntries" :key="option" :value="option">{{ option }}</option>
            </select>
            entries
          </div>
        </div>
        <div class="table-responsive">
          <table ref="Table" class="table table-bordered table-striped table-hover align-middle" id="a">
            <thead>
              <slot name="table-th"></slot>
            </thead>
            <tbody>
              <slot name="table-td"></slot>
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div>Show {{ showInfo.start }} to {{ showInfo.end }} of {{ showInfo.length }} entries</div>
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item" v-for="page in showPagination" :key="page"><a class="page-link" href="#" @click="paginateEvent(page)">{{ page }}</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { $array } from 'alga-js'
import { ref } from 'vue'
export default {
  setup(props) {
    const btn = ref(props.showBtn)
    return {
      btn
    }
  },
  data() {
    return {
      currentEntries: 5, // 當前每頁筆數
      showEntries: [5,10,15,20,50], // 每頁筆數列表
      filterEntries: [], // 過濾完的資料
      currentPage: 1, // 當前頁數
      allPages: 1, // 所有頁數
    }
  },
  props:{
    showBtn:{
      typeof:Boolean,
      default:true
    },
    entries: Array
  },
  created() {
    this.filterEntries = $array.paginate(this.entries,this.currentPage,this.currentEntries); // paginate ( 所有資料 , 當前頁數 , 每頁幾筆 )
    this.allPages = $array.pages(this.entries, this.currentEntries); // pages ( 所有資料 , 每頁幾筆 )
    this.$emit('update',this.filterEntries); // 過濾好的資料丟回
  },
  computed: {
    showInfo() {
      return $array.pageInfo(this.entries,this.currentPage,this.currentEntries) // pageInfo ( 所有資料 , 當前頁數 , 每頁幾筆 )
    },
    showPagination() {
      return $array.pagination(this.allPages,this.currentPage,3)  // pagination ( 全部頁數 , 目前頁數 , 差多少頁會顯示 ... )
    }
  },
  methods: {
    paginateEntries() {
      this.currentPage = 1;
      this.filterEntries = $array.paginate(this.entries,this.currentPage,this.currentEntries);  // paginate ( 所有資料 , 當前頁數 , 每頁幾筆 )
      this.allPages = $array.pages(this.entries, this.currentEntries);
      this.$emit('update',this.filterEntries);
    },
    paginateEvent(page) {
      this.currentPage = page;
      this.filterEntries = $array.paginate(this.entries,this.currentPage,this.currentEntries);  // paginate ( 所有資料 , 當前頁數 , 每頁幾筆 )
      this.$emit('update',this.filterEntries);
    }
  }
}
</script>
<style>
.container-outer {
  flex: 1 1 auto;
  padding: 1.5rem;
}
.container-header h3 {
  margin: 0;
  flex: none;
  min-width: 0;
  font-size: 1.25rem;
}
.container-header button {
  flex:none;
  min-width: 0;
}
.card-header-custom {
  background-color: #f8f9fc ;
}
.card-header h6 {
  margin: 0;
  color: #4e73df;
  font-size: 1rem;
  font-weight: 900;
}
.form-select-custom {
  padding-left: 0.75rem !important;
}
thead tr th {
  height: 48px;
  white-space: nowrap;
  vertical-align: middle;
}
tbody {
  border-top: 0 !important;
}
tbody tr td {
  height: 48px;
} 
@media (min-width: 576px) {
  .container-header h3 {
    margin: 0;
    font-size: 1.5rem;
  }
}
@media (min-width: 768px) {
  .container-header h3 {
    margin: 0;
    font-size: 1.75rem;
  }
}
</style>