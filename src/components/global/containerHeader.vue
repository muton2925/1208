<template>
    <div class="container-header d-flex justify-content-between align-items-center flex-nowrap mb-4">
      <h3>{{titleConent}}</h3>
      <button v-if="btnShow" class="btn btn-primary text-white" data-bs-toggle="modal" data-bs-target="#create_plugin_Modal">
        <i class="d-sm-none bi bi-folder-plus"></i>
        <span class="d-none d-sm-inline">{{btn}}</span>
      </button>
    </div>
</template>
<script>
import { ref } from '@vue/reactivity'
export default {
    setup(props) {
        const titleConent = ref(props.title)
        const btn = ref(props.btnContent)
        const btnShow = ref(props.createBtn)
        return{
            titleConent,btn,btnShow
        }
    },
    props:{
        title:String,
        btnContent:{
             typeof:String,
             default:""
        },
        createBtn:{
            typeof:Boolean,
            default:true
        }
    }
}
</script>