<template>
  <SideDisplay/>
</template>

<script>
// import { provide } from 'vue';
import SideDisplay from './components/sideDisplay.vue';

export default {
  name: 'App',
  components: {
    SideDisplay
  },
  setup(){

    return{
    }

   
  } 
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Varela Round", sans-serif;
  font-weight: 400;
  font-style: normal;
  scroll-behavior: smooth;
  text-decoration: none;
}

#app{
  min-height: 100vh;
  display: flex;
  animation: fadeIn 1.5s;
}

@keyframes fadeIn {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }

}
</style>
