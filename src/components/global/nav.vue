<template>
  <div class="Nav">
    <header class="  ">
      <div class="header_logo header_logo-width">
        <img src="../../assets/free5gmano_icon.png" width="70" height="70" alt="logo_icon"/>
        <h1 class="header_logo_h1">FREE 5G MANO</h1>
      </div>
      <div class="navColor header "></div>
    </header>
    <nav class="nav nav-height navColor">

    </nav>
  </div>
</template>
<script>
export default {
  setup() {


    return {

    }
  }




};
</script>
<style scoped>
.nav-height {
  min-height: calc(100vh - 70px);

}
.navColor{
  background-color: #4e73df;
  background-image: linear-gradient(180deg, #4e73df 10%, #224abe 100%);
  background-size: cover;
}
header{
  min-width: 100vw;
  display: flex;
}
.header{
  min-width: calc(100vw - 104px);
  }
.header_logo {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFF;
  cursor: pointer;
}
.header_logo_h1 {
    display: none;
    text-align: center;
    letter-spacing: 0.05em;
    font-weight: 900;
    font-size: 16px;
    margin-left: 4px;
    margin-right: 4px;
}
.header_logo-width{
  width: 104px;
}
 .nav {
    width: 224px;
  }
@media (min-width: 576px) {
  .nav, .header_logo-width {
    width: 104px;
  }
  .header{
    min-width: calc(100vw - 104px);
    padding: 0;
    margin: 0;
  } 
}
@media (min-width: 768px) {
  .nav, .header_logo-width {
    width: 224px;
  }
  .header_logo {
    padding: 0 16px;
  }
  .header_logo_h1 {
      display: inline;
  }
  .header{
    min-width: calc(100vw - 224px);
    padding: 0;
    margin: 0;
  }
}
</style>