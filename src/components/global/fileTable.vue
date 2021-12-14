<template>
    <div class="card shadow-sm">
      <div class="card-header card-header-custom py-3">
        <h6>{{titleConent}}</h6>
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
</template>
<script>
import { ref } from '@vue/reactivity';


export default {
    setup(props) {
        const titleConent = ref(props.title);
        let th_list = ref(props.tableFile)
        return{
            titleConent,th_list
        }
    },
    props:{
        title:String,
        tableFile:Array
    }
}
</script>
