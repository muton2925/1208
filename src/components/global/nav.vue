<template>
  <div class="header">
    <div class="nav_logo">
      <img src="../../assets/free5gmano_icon.png" width="70" height="70" alt="logo_icon"/>
      <h1 class="nav_logo_h1">FREE 5G MANO</h1>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.header {
  min-height: 100vh;
  background-color: #4e73df;
  background-image: linear-gradient(180deg, #4e73df 10%, #224abe 100%);
  background-size: cover;
}
.nav_logo {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFF;
  cursor: pointer;
}
.nav_logo_h1 {
    display: none;
    text-align: center;
    letter-spacing: 0.05em;
    font-weight: 900;
    font-size: 16px;
    margin-left: 4px;
    margin-right: 4px;
}
@media (min-width: 576px) {
  .header {
    width: 104px;
  }
}
@media (min-width: 768px) {
  .header {
    width: 224px;
  }
  .nav_logo {
    padding: 0 16px;
  }
  .nav_logo_h1 {
      display: inline;
  }
}
</style>