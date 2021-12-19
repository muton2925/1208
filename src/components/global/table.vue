<template>
  <div class="d-flex flex-column container-outer user-select-none" style="overflow:hidden">
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
    <div class="card card-custom shadow-sm">
      <div class="card-header card-header-custom py-3">
        <h6>
          <slot name="table-name"></slot>
        </h6>
      </div>
      <div class="d-flex flex-column card-body">
        <div class="d-flex mb-3 align-items-center">
          <div class="d-flex align-items-baseline">
            Show
            <select v-model="currentEntries" class="form-select form-select-sm form-select-custom mx-2" @change="paginateEntries">
              <option v-for="option in showEntries" :key="option" :value="option">{{ option }}</option>
            </select>
            entries
          </div>
          <div class="d-flex ms-auto">
            <input type="text" class="form-control form-control" placeholder="Search" v-model="searchInput" @input="paginateEntries">
          </div>
        </div>
        <div class="table-responsive mb-2">
          <table class="table table-bordered table-striped table-hover align-middle mb-1">
            <thead>
              <slot name="table-th"></slot>
            </thead>
            <tbody>
              <slot name="table-td"></slot>
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-center justify-content-sm-between align-items-center mt-auto">
          <div class="d-none d-sm-block">Show {{ showInfo.start }} to {{ showInfo.end }} of {{ showInfo.length }} entries</div>
          <ul class="pagination">
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
      currentEntries: 10, // 當前每頁筆數
      showEntries: [10,50,100], // 每頁筆數列表
      filterEntries: [], // 過濾完的資料
      currentPage: 1, // 當前頁數
      allPages: 1, // 所有頁數
      searchInput: '',
      searchEntries: [],
    }
  },
  props:{
    showBtn:{
      typeof: Boolean,
      default: true
    },
    entries: {
      typeof: Array,
      default: []
    }
  },
  created() {
    if(this.entries.length > 0) {
      this.allPages = $array.pages(this.entries, this.currentEntries); // pages ( 所有資料 , 每頁幾筆 )
    }
    this.filterEntries = $array.paginate(this.entries,this.currentPage,this.currentEntries); // paginate ( 所有資料 , 當前頁數 , 每頁幾筆 )
    this.$emit('update',this.filterEntries); // 過濾好的資料丟回
  },
  computed: {
    showInfo() {
      const getCurrentEntries = (this.searchInput.length <= 0) ? this.entries : this.searchEntries;
      return $array.pageInfo(getCurrentEntries,this.currentPage,this.currentEntries) // pageInfo ( 所有資料 , 當前頁數 , 每頁幾筆 )
    },
    showPagination() {
      if (this.searchInput.length > 0) {
        if(this.searchEntries.length > 0) {
          return $array.pagination(this.allPages,this.currentPage,2)  // pagination ( 全部頁數 , 目前頁數 , 差多少頁會顯示 ... )
        }
        else {
          return $array.pagination(1,1,0)  // pagination ( 全部頁數 , 目前頁數 , 差多少頁會顯示 ... )
        }
      }
      else {
        return $array.pagination(this.allPages,this.currentPage,2)  // pagination ( 全部頁數 , 目前頁數 , 差多少頁會顯示 ... )
      }
    }
  },
  methods: {
    paginateEntries() {
      this.currentPage = 1;
      if(this.searchInput.length > 0) {
        this.searchEntries = $array.searchBy(this.entries,[this.searchInput],['name','allocate_nssi','deallocate_nssi']);
        this.filterEntries = $array.paginate(this.searchEntries,this.currentPage,this.currentEntries); // paginate ( 所有資料 , 當前頁數 , 每頁幾筆 )
        this.allPages = $array.pages(this.searchEntries, this.currentEntries);
      }
      else {
        this.filterEntries = $array.paginate(this.entries,this.currentPage,this.currentEntries);  // paginate ( 所有資料 , 當前頁數 , 每頁幾筆 )
        this.allPages = $array.pages(this.entries, this.currentEntries);
      }
      this.$emit('update',this.filterEntries);
    },
    paginateEvent(page) {
      this.currentPage = page;
      const paginateStatus = (this.searchInput.length > 0) ? this.searchEntries : this.entries;
      this.filterEntries = $array.paginate(paginateStatus,this.currentPage,this.currentEntries)// paginate ( 所有資料 , 當前頁數 , 每頁幾筆 )
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
.card-custom {
  flex: 1;
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