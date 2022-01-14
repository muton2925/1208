<template>
  <div class="d-flex flex-column p-4 user-select-none">
    <template v-if="pageStatus">
      <div class="container-header d-flex justify-content-between align-items-center mb-4">
        <h3>
          <slot name="header"></slot>
        </h3>
        <button v-if="btn" class="btn btn-primary ms-3 text-white" data-bs-toggle="modal" data-bs-target="#create_plugin_Modal">
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
        <div class="d-flex flex-column card-body">
          <div class="d-flex mb-3 align-items-center">
            <div class="d-flex align-items-baseline me-2">
              Show
              <select v-model="currentEntries" class="form-select form-select-sm form-select-custom mx-2" @change="paginateEntries">
                <option v-for="option in showEntries" :key="option" :value="option">{{ option }}</option>
              </select>
              entries
            </div>
            <div class="d-flex ms-auto">
              <input type="text" class="form-control form-control" placeholder="Search" v-model="searchInput" @input="searchEvent">
            </div>
          </div>
          <div class="mb-2 mb-lg-3 table-custom" style="min-height: 115px">
            <table class="table table-bordered table-striped table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col" class="table-light cursor-pointer col-1" :class="{ 'w-0' : !sortableColumn(item.name) }" v-for="item in columns" :key="item.name" @click="sortColumn(item.name)">
                    <template v-if="sortableColumn(item.name)">
                      <div class="d-flex justify-content-between">
                        <span>{{ item.text }}</span>
                        <i :class="[[ item.name == this.sortDesc ? 'bi bi-sort-alpha-up' : 'bi bi-sort-alpha-down' ],{ 'text-danger' : item.name == this.sortAsc || item.name == this.sortDesc },'ms-2']"></i>
                      </div>
                    </template>
                    <template v-else>
                      <div>{{ item.text }}</div>
                    </template>
                  </th>
                </tr>
              </thead>
              <tbody>
                <template v-if="loadingStatus">
                  <tr class="text-center">
                    <td :colspan="columnNumber">
                      <div class="d-flex justify-content-center align-items-center">
                        <span class="spinner-grow spinner-grow-sm" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </span>
                        <strong class="ms-3">Loading ...</strong>
                      </div>
                    </td>  
                  </tr>
                </template>
                <template v-else>
                  <template v-if="filterEntries.length > 0">
                    <slot name="table-td"></slot>
                  </template>
                  <template v-else>
                    <tr class="text-center">
                      <td :colspan="columnNumber">No matching data found</td>  
                    </tr>
                  </template>
                </template>
              </tbody>
            </table>
          </div>
          <div class="d-flex flex-wrap justify-content-center justify-content-lg-between align-items-center">
            <div class="col-12 text-center col-lg-auto mb-2 mb-lg-0">Show {{ showInfo.start }} to {{ showInfo.end }} of {{ showInfo.length }} entries</div>
            <ul class="pagination justify-content-center flex-wrap col-lg-auto" :class="{ 'pagination-sm' : currentWindowWidth < 576 }">
              <li class="page-item" :class="{ disabled : currentPage == 1 }">
                <a class="page-link" href="#" @click.prevent="paginateEvent(1)">First</a>
              </li>
              <li class="page-item" :class="{ disabled : currentPage == 1 }">
                <a class="page-link" href="#" @click="paginateEvent(currentPage-1)"><i class="bi bi-chevron-left"></i></a>
              </li>
              <li class="page-item" v-for="page in showPagination" :key="page" :class="[{ active: page == currentPage },{ disabled: page == '...'}]">
                <a class="page-link" href="#" @click="paginateEvent(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled : currentPage == allPages }">
                <a class="page-link" href="#" @click="paginateEvent(currentPage+1)"><i class="bi bi-chevron-right"></i></a>
              </li>
              <li class="page-item" :class="{ disabled : currentPage == allPages }">
                <a class="page-link" href="#" @click.prevent="paginateEvent(allPages)">Last</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="placeholder-glow d-flex justify-content-between mt-2 mb-4">
        <div class="placeholder placeholder-lg rounded-pill col-6 col-lg-3 col-xxl-2"></div>
        <div class="placeholder placeholder-lg rounded-pill col-2 col-sm-3 col-lg-1"></div>
      </div>
      <div>
      <div class="card shadow-sm placeholder-glow">
        <div class="card-header card-header-custom py-3">
          <h6 class="placeholder bg-dark rounded-pill col-2 col-lg-1"></h6>
        </div>
        <div class="d-flex flex-column card-body">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="placeholder placeholder rounded-pill col-3 col-lg-2 col-xl-1"></div>
            <div class="placeholder placeholder rounded-pill col-2 col-lg-2 col-xl-1"></div>
          </div>
          <div class="mb-3 mb-lg-3">
            <table class="table table-bordered table-striped table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th v-for="i in 5" :key="i"><div class="d-flex mx-auto placeholder rounded-pill col-12 col-md-10 col-xl-7"></div></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i in 6" :key="i" class="placeholder-glow">
                  <td v-for="i in 5" :key="i"><div class="d-flex mx-auto placeholder rounded-pill col-12 col-md-10 col-xl-7"></div></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="d-flex flex-wrap justify-content-center justify-content-lg-between align-items-center">
            <div class="d-flex col-12 col-lg-2 col-xl-1 justify-content-center mb-3 mb-lg-0">
              <div class="placeholder rounded-pill col-5 col-lg-12"></div>
            </div>
            <div class="d-flex col-12 col-lg-3 col-xl-2 justify-content-center justify-content-lg-end">
              <div v-for="i in 5" :key="i" class="placeholder rounded-pill col-1 col-lg mx-1"></div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </template>
  </div>
</template>
<script>
import { $array } from 'alga-js';
import { ref } from 'vue';
export default {
  setup(props) {
    const btn = ref(props.showBtn)
    return {
      btn
    }
  },
  data() {
    return {
      currentEntries: 10, // 當前每頁筆數
      showEntries: [10,50,100], // 每頁筆數列表
      currentPage: 1, // 當前頁數
      searchInput: '',
      searchEntries: [],
      columns: this.column,
      entries: this.entrie,
      sortAsc: '',
      sortDesc: '',
      loadingStatus: false,
    }
  },
  props:{
    showBtn:{
      typeof: Boolean,
      default: true,
    },
    column: {
      typeof: Array,
    },
    entrie: {
      typeof: Array,
      default: []
    },
    columnSort: {
      typeof: Array,
    },
    columnNumber: {
      typeof: Number,
    },
    status: {
      typeof: Boolean,
      default: false
    },
  },
  computed: {
    currentWindowWidth() {
      return this.$store.state.windowWidth;
    },
    pageStatus() {
      return this.status;
    },
    allPages() {
      if(this.entries.length != 0)
        return $array.pages(this.entries, this.currentEntries);
      else
        return 1;
    },
    filterEntries() {
      this.loadingEvent();
      return $array.paginate(this.entries, this.currentPage, this.currentEntries); // paginate ( 所有資料 , 當前頁數 , 每頁幾筆 );
    },
    showInfo() {
      return $array.pageInfo(this.entries, this.currentPage, this.currentEntries); // pageInfo ( 所有資料 , 當前頁數 , 每頁幾筆 )
    },
    showPagination() {
      return $array.pagination(this.allPages, this.currentPage, 2);  // pagination ( 全部頁數 , 目前頁數 , 差多少頁會顯示 ... )
    },
  },
  watch: {
    entrie: {
      handler: function(newVal) {
        this.searchInput = '';
        this.entries = newVal;
        this.entries = $array.searchBy(this.entries, [this.searchInput], this.columnSort);
        if(this.sortAsc != '') {
          this.entries = $array.sortBy(this.entries, this.sortAsc, 'asc');
        }
        if(this.sortDesc != '') {
          this.entries = $array.sortBy(this.entries, this.sortDesc, 'desc'); 
        }
      },
      deep: true
    },
    filterEntries: {
      handler: function(newVal) {
        if(newVal.length == 0 && this.currentPage != 1)
          this.currentPage -= 1 ;
        this.$emit('update', newVal);
      },
      deep: true,
    }
  },
  methods: {
    loadingEvent() { // 表格 loading 效果
      this.loadingStatus = true;
      setTimeout(() => {
        this.loadingStatus = false;
      },500)
    },
    paginateEntries() {  // 換筆數事件
      this.currentPage = 1;
    },
    searchEvent() { // 搜尋事件
      this.currentPage = 1;
      this.entries = $array.searchBy(this.entrie, [this.searchInput], this.columnSort);
      if(this.sortAsc != '') {
        this.entries = $array.sortBy(this.entries, this.sortAsc, 'asc');
      }
      if(this.sortDesc != '') {
        this.entries = $array.sortBy(this.entries, this.sortDesc, 'desc'); 
      }
    },
    paginateEvent(page) { // 換頁事件
      this.currentPage = page;
    },
    sortableColumn(name) { // 判斷各個 TH 是否能做排序
      return this.columnSort.includes(name);
    },
    sortColumn(name) { // 排序事件
      if(this.sortableColumn(name)){
        if(this.sortAsc == name){
          this.entries = $array.sortBy(this.entries, name , 'desc');
          this.sortAsc = '';
          this.sortDesc = name;
        }
        else{
          this.entries = $array.sortBy(this.entries, name , 'asc');
          this.sortAsc = name;
          this.sortDesc = '';
        }
      }
    }
  }
}
</script>
<style>
.container-header h3 {
  margin: 0;
  flex: 1;
  font-size: 1.25rem;
}
.container-header button {
  flex:none;
}

.card-header-custom {
  display: flex;
  align-items: center;
  background-color: #f8f9fc;
}
.card-header h6 {
  margin: 0;
  color: #4e73df;
  font-size: 1rem;
  font-weight: 900;
}
.form-select-custom {
  width: auto !important;
  padding-left: 0.75rem !important;
}
thead tr th {
  height: 48px;
  white-space: nowrap;
  vertical-align: middle;
  position: sticky;
  top: 0;
}
tbody {
  border-top: 0 !important;
}
tbody tr td {
  height: 48px;
}
.table-custom {
  max-height: calc(100vh - 399px);
  overflow-x: scroll !important;
  overflow-y: scroll;
  border-top:0.1px solid #dee2e6;
}
@media (min-width: 576px) {
  .container-header h3 {
    margin: 0;
    font-size: 1.375rem;
  }
}
@media (min-width: 768px) {
  .container-header h3 {
    margin: 0;
    font-size: 1.625rem;
  }
}
@media (min-width: 992px) {
  .table-custom {
    max-height: calc(100vh - 375px);
  }
}
</style>