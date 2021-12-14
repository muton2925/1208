<template>
  <div class="container-outer" style="overflow:hidden">
    <div class="container-header d-flex justify-content-between align-items-center flex-nowrap mb-4">
      <h3>NFV MANO Plugin</h3>
      <button class="btn btn-primary text-white" data-bs-toggle="modal" data-bs-target="#create_plugin_Modal">
        <i class="d-sm-none bi bi-folder-plus"></i>
        <span class="d-none d-sm-inline">Create Plugin</span>
      </button>
    </div>
    <div class="card shadow-sm">
      <div class="card-header card-header-custom py-3">
        <h6>NFV MANO Plugin List</h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th v-for="item in th_list" :key="item">{{ item }}</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="create_plugin_Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Create new NFV MANO Plugin</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body mx-1">
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
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary text-white">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      th_list :['Plugin Name', 'Allocate NSSI File', 'Deallocate NSSI File', 'Update Plugin', 'Plugin File', 'Delete Plugin']
    }
  }
}
</script>
<style>
.container-outer {
  flex: 1 1 auto;
  padding: 1rem;
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
thead tr th {
  white-space: nowrap;
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