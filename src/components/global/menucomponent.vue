<template>
  <aside class="d-none d-sm-block w-sm-102px w-md-224px aside_height bg-blue">
    <ul class="list-none text-white text-center text-md-start" id="accordionExample">
      <template v-if="windowWidth >= 768">
        <li class="list-item"><router-link to="/dashboard">Dashboard</router-link></li>
        <li class="list-item"><router-link to="/nfv_mano_plugin">NFV MANO Plugin</router-link></li>
        <li class="list-item">
          <a class="mb-4" data-bs-toggle="collapse" data-bs-target="#collapseOne">Generic Template</a>
          <div id="collapseOne" class="mt-3 collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body-custom">
              <a class="list-item2" href="#">VNF Template</a>
              <a class="list-item2" href="#">NSD Template</a>
              <a class="list-item2" href="#">NRM Template</a>
            </div>
          </div>
        </li>
        <li class="list-item"><a href="#">NSS template</a></li>
        <li class="list-item">
          <a data-bs-toggle="collapse" data-bs-target="#collapseTwo">NSSI View</a>
          <div id="collapseTwo" class="mt-3 collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body-custom">
              <a class="list-item2" href="#">Graph View</a>
              <a class="list-item2" href="#">List View</a>
            </div>
          </div>
        </li>
      </template>
      <template v-else>
        <li class="list-item"><router-link to="/dashboard">Dashboard</router-link></li>
        <li class="list-item"><router-link to="/nfv_mano_plugin">NFV MANO Plugin</router-link></li>
        <li class="list-item">
          <router-link to="/nfv_mano_plugin" data-bs-toggle="collapse" data-bs-target="#collapse1">Generic Template</router-link>
          <div id="collapse1" class="collapse aaa" data-bs-parent="#accordionExample">
            <div class="accordion-body-custom">
              <a class="list-item2" href="#">VNF Template</a>
              <a class="list-item2" href="#">NSD Template</a>
              <a class="list-item2" href="#">NRM Template</a>
            </div>
          </div>
        </li>
        <li class="list-item"><router-link to="/nfv_mano_plugin">NSS Template</router-link></li>
        <li class="list-item">
          <router-link to="/nfv_mano_plugin" data-bs-toggle="collapse" data-bs-target="#collapse2">NSSI View</router-link>
          <div id="collapse2" class="collapse aaa" data-bs-parent="#accordionExample">
            <div class="accordion-body-custom">
              <a class="list-item2" href="#">VNF Template</a>
              <a class="list-item2" href="#">NSD Template</a>
              <a class="list-item2" href="#">NRM Template</a>
            </div>
          </div>
        </li>
      </template>
    </ul>
  </aside>
</template>
<script>
export default {
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  watch: {
    windowWidth: function (newValue,oldValue) {
      if(oldValue < 768){
        if (newValue >= 768) {
          this.isOpen = false;
        }
      }
      else{
        if(newValue < 768) {
          this.isOpen = false;
        }        
      }
    },
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
}
</script>
<style scoped>
li{
    cursor: pointer;
}
.aaa {
    position: absolute;
    top: 0;
    left: 110px;
    box-shadow: 0 0.15rem 1.75rem 0 rgb(58 59 69 / 15%);
}
.accordion-body-custom {
    background-color: #FFF;
    border-radius: 5px;
    padding: 8px 0;
}
.list-none {
    padding-left: 0;
    list-style: none;
}
.list-item {
    display: block;
    font-size: .65rem;
    padding: 12px 16px;
    position: relative !important;
}
.list-item a{
    color: white;
    text-decoration: none;
}
.list-item2 {
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    display: block;
    color: #494b5c !important;
    text-decoration: none;
    border: 0.35rem;
    white-space: nowrap;
}
.bang {
    position: absolute;

}
@media (min-width: 768px) {
    .list-item {
        padding: 19px;
    }
}
</style>