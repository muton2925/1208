<template>
  <div class="container-outer user-select-none" style="overflow:hidden">
    <div class="container-header d-flex justify-content-between align-items-center flex-nowrap mb-4">
      <h3>
        <slot name="header"></slot>
      </h3>
      <button class="btn btn-primary text-white" data-bs-toggle="modal" data-bs-target="#create_plugin_Modal">
        <i class="d-sm-none bi bi-folder-plus"></i>
        <span class="d-none d-sm-inline">
          <slot name="button"></slot>
        </span>
      </button>
    </div>
    <div class="card shadow-sm">
      <div class="card-header card-header-custom py-3">
        <h6>
          <slot name="table"></slot>
        </h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <slot name="tr"></slot>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
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