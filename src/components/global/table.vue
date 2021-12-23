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
        <div class="table-responsive mb-2 mb-lg-3 table-custom">
          <table class="table table-bordered table-striped table-hover align-middle mb-1">
            <thead>
              <tr>
                <th class="cursor-pointer" scope="col" v-for="item in columns" :key="item" @click="sortColumn(item.name,item.status)">
                  <template v-if="item.sort == true">
                    <div class="d-flex justify-content-between">
                      <span>{{ item.text }}</span>
                      <i class="bi bi-filter ms-2"></i>
                    </div>
                  </template>
                  <template v-else>
                    <div>{{ item.text }}</div>
                  </template>
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-if="filterEntries.length > 0">
                <slot name="table-td"></slot>
              </template>
              <template v-else>
                <tr class="text-center">
                  <td :colspan="columnNumber">No matching data found</td>  
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div class="d-flex flex-wrap justify-content-center justify-content-lg-between align-items-center">
          <div class="col-12 text-center col-lg-auto mb-2 mb-lg-0">Show {{ showInfo.start }} to {{ showInfo.end }} of {{ showInfo.length }} entries</div>
          <ul class="pagination col-auto">
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
      currentEntries: 5, // 當前每頁筆數
      showEntries: [5,10,50,100], // 每頁筆數列表
      // filterEntries: [], // 過濾完的資料
      currentPage: 1, // 當前頁數
      // allPages: 1, // 所有頁數
      searchInput: '',
      searchEntries: [],
      columns: this.column,
      entries: this.entrie,
      sortAsc: '',
      sortDesc: '',
      sortCol: '',
    }
  },
  props:{
    showBtn:{
      typeof: Boolean,
      default: true
    },
    column: {
      typeof: Array,
    },
    entrie: {
      typeof: Array,
      default: []
    },
    columnNumber: {
      typeof: Number
    }
  },
  created() {
    // this.allPages = $array.pages(this.entries, this.currentEntries); // pages ( 所有資料 , 每頁幾筆 )
    this.filterEntries = $array.paginate(this.entries,this.currentPage,this.currentEntries); // paginate ( 所有資料 , 當前頁數 , 每頁幾筆 )
    this.$emit('update',this.filterEntries); // 過濾好的資料丟回
  },
  watch: {
    entrie: {
      handler: function(newVal){
        this.entries = newVal;
        this.allPages = $array.pages(newVal, this.currentEntries); // pages ( 所有資料 , 每頁幾筆 )
        this.filterEntries = $array.paginate(newVal, this.currentPage, this.currentEntries);
        this.$emit('update', this.filterEntries);
      },
      deep: true
    },
    filterEntries: {
      handler: function(newVal) {
        // console.log('觸發 filterEntries watch')
        this.$emit('update', newVal);
      },
      deep:true,
    }
  },
  computed: {
    allPages: {
      get() {
        // console.log('觸發 allpages get :' + $array.pages(this.entries, this.currentEntries))
        if(this.entries.length != 0){
          return $array.pages(this.entries, this.currentEntries);
        }
        else
          return 1;
      },
      set(newVal) {
        // console.log('觸發 allpages set :' + newVal)
        // return $array.pages(this.entries, this.currentEntries);
        return newVal;
      }
    },
    filterEntries: {
      get() {
        console.log('觸發 filterEntries get')
        return $array.paginate(this.entries,this.currentPage,this.currentEntries); // paginate ( 所有資料 , 當前頁數 , 每頁幾筆 );
      },
      set(newVal) {
        console.log('觸發 filterEntries set')
        return newVal;
      }
    },
    showInfo() {
        return $array.pageInfo(this.entries,this.currentPage,this.currentEntries) // pageInfo ( 所有資料 , 當前頁數 , 每頁幾筆 )
      // const getCurrentEntries = (this.searchInput.length <= 0) ? this.entries : this.searchEntries;
      // return $array.pageInfo(getCurrentEntries,this.currentPage,this.currentEntries) // pageInfo ( 所有資料 , 當前頁數 , 每頁幾筆 )
    },
    showPagination() {
      return $array.pagination(this.allPages,this.currentPage,2)  // pagination ( 全部頁數 , 目前頁數 , 差多少頁會顯示 ... )
    //   if (this.searchInput.length > 0) {
    //     if(this.searchEntries.length > 0) {
    //       return $array.pagination(this.allPages,this.currentPage,2)  // pagination ( 全部頁數 , 目前頁數 , 差多少頁會顯示 ... )
    //     }
    //     else {
    //       return $array.pagination(1,1,0)  // pagination ( 全部頁數 , 目前頁數 , 差多少頁會顯示 ... )
    //     }
    //   }
    //   else {
    //     return $array.pagination(this.allPages,this.currentPage,2)  // pagination ( 全部頁數 , 目前頁數 , 差多少頁會顯示 ... )
    //   }
    }
  },
  methods: {
    paginateEntries() { // 搜尋事件
      this.currentPage = 1; // currentPage 固定為 1
      // this.filterEntries = $array.paginate(this.entries,this.currentPage,this.currentEntries); // paginate ( 所有資料 , 當前頁數 , 每頁幾筆 )
      // if(this.searchInput.length > 0) { // 若搜尋字數大於 0
      //   this.searchEntries = $array.searchBy(this.entries,[this.searchInput],['name','allocate_nssi','deallocate_nssi']); // 搜尋過濾完的 Entries ， searchBy ( 所有資料 , 要搜尋的東西 , 要搜尋的欄位 )
      //   if(this.sortAsc != '') // 若有進行 ASC 排序
      //     this.searchEntries = $array.sortBy(this.searchEntries, this.sortAsc, 'asc'); // searchEntries 根據 sortAsc 對象排序
      //   if(this.sortDesc != '') // 若有進行 DESC 排序
      //     this.searchEntries = $array.sortBy(this.searchEntries, this.sortDesc, 'desc'); // searchEntries 根據 sortDesc 對象排序
      //   this.filterEntries = $array.paginate(this.searchEntries,this.currentPage,this.currentEntries); // paginate ( 所有資料 , 當前頁數 , 每頁幾筆 )
      //   if(this.searchEntries.length > 0)  // 若搜尋過濾完的 Entries 長度大於 0
      //     this.allPages = $array.pages(this.searchEntries, this.currentEntries); // allPage 跟據 searchEntries 跟 currentEntries ( 每頁幾筆 ) 計算
      //   else // 若搜尋過濾完的 Entrires 長度小於等於 0 ，意即查無數據
      //     this.allPages = 1; // allPages 固定為 1
      // }
      // else { // 若搜尋字數小於等於0
      //   if(this.entries.length > 0){ // 若全 Entries 長度大於 0
      //     if(this.sortAsc != '')
      //       this.entries = $array.sortBy(this.entries, this.sortAsc, 'asc');
      //     if(this.sortDesc != '')
      //       this.entries = $array.sortBy(this.entries, this.sortDesc, 'desc');
      //     this.filterEntries = $array.paginate(this.entries,this.currentPage,this.currentEntries);  // paginate ( 所有資料 , 當前頁數 , 每頁幾筆 )
      //     this.allPages = $array.pages(this.entries, this.currentEntries); // allPage 跟據全 Entries 跟 currentEntries ( 每頁幾筆 ) 計算
      //   }
      //   else // 若全 Entries 長度小於等於 0
      //     this.allPages = 1; // allPages 固定為 1 
      // }
      // this.$emit('update',this.filterEntries); // 每次更新都觸發 update 事件回傳 filterEntries
    },
    searchEvent() {
      this.currentPage = 1;
      this.entries = $array.searchBy(this.entrie,[this.searchInput],['name','allocate_nssi','deallocate_nssi'])
      if(this.sortAsc != '') {
        this.entries = $array.sortBy(this.entries, this.sortAsc, 'asc');
      }
      if(this.sortDesc != '') {
        this.entries = $array.sortBy(this.entries, this.sortDesc, 'desc'); 
      }
    },
    paginateEvent(page) { // 換頁事件
      this.currentPage = page; // currentPage 等於點擊的頁數
      // const paginateStatus = (this.searchInput.length > 0) ? this.searchEntries : this.entries; // 若搜尋長度大於 0 ， 選用 searchEntries ，反之，使用全 Entries
      // this.filterEntries = $array.paginate(this.entries,this.currentPage,this.currentEntries)// 更新 filterEntries，paginate ( 所有資料 , 當前頁數 , 每頁幾筆 )
      // this.$emit('update',this.filterEntries); // 每次點擊都觸發 update 事件回傳 filterEntries
    },
    sortColumn(name,status) { // 排序事件
      let index = this.columns.map(function(e) {return e.name}).indexOf(name); // 當前欄位名稱 (name) 在 columns 的索引
      if(this.sortCol != name && this.sortCol != ''){ // 若 sortCol (上一次排序的 name) 跟 name ( 本次排序的 name ) 不同，以及 sortCol 不為空 ( 沒點過排序 )
        let idx = this.columns.map(function(e) {return e.name}).indexOf(this.sortCol); // 找上一次點選排序的欄位名稱
        this.columns[idx].status = 'none'; // 將該物件的 status 設為 none { name: xxx , status: none }
      }
      // if(this.searchInput.length > 0){ // 若搜尋字數大於 0
      //   switch (status) {
      //     case 'asc': // status 狀態為 asc ，2
      //       this.searchEntries = $array.sortBy(this.searchEntries, name , 'desc'); 
      //       this.columns[index].status = 'desc';
      //       this.sortDesc = name;
      //       this.sortAsc = '';
      //       break;
      //     case 'desc':
      //       this.searchEntries = $array.sortBy(this.searchEntries, name , 'asc');
      //       this.columns[index].status = 'asc';
      //       this.sortAsc = name;
      //       this.sortDesc = '';
      //       break;
      //     default:
      //       this.searchEntries = $array.sortBy(this.searchEntries, name , 'asc');
      //       this.columns[index].status = 'asc';
      //       this.sortAsc = name;
      //       this.sortDesc = '';
      //       this.sortCol = name;
      //   }
      //   this.filterEntries = $array.paginate(this.searchEntries,this.currentPage,this.currentEntries);
      // }
      // else {
        switch (status) {
          case 'asc':
            this.entries = $array.sortBy(this.entries, name , 'desc');
            this.columns[index].status = 'desc';
            this.sortDesc = name;
            this.sortAsc = '';
            break;
          case 'desc':
            this.entries = $array.sortBy(this.entries, name , 'asc');
            this.columns[index].status = 'asc';
            this.sortAsc = name;
            this.sortDesc = '';
            break;
          default:
            this.entries = $array.sortBy(this.entries, name , 'asc');
            this.columns[index].status = 'asc';
            this.sortAsc = name;
            this.sortDesc = '';
            this.sortCol = name;
        }
        // this.filterEntries = $array.paginate(this.entries,this.currentPage,this.currentEntries);
      // }
      // this.$emit('update',this.filterEntries); // 每次更新都觸發 update 事件回傳 filterEntries
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
  background-color: #FFF !important;
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
  min-height: 200px;
  max-height: calc(100vh - 380px);
  overflow-y:auto;
  border-top:0.1px solid #dee2e6;
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