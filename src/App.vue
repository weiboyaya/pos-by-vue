<template>
  <div id="app">
    <LeftNav></LeftNav>
    <div class="main-page">
      <router-view/>
    </div>
    
  </div>
</template>

<script>
import LeftNav from '@/components/LeftNav.vue'

export default {
  name: 'App',
  components:{
        LeftNav
    }
}
</script>

<style>
.main-page{
  position: absolute;
  left:60px;
  top:0;
  width: calc(100% - 60px);
  height: 100%;
}
</style>
