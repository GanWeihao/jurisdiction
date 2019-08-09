<template>
  <div id="app">
    <router-view/>
  </div>

</template>

<script>
  import Home from "@/views/Home";
  export default {
    name: 'App',
    components: {
      Home
    },
    created(){
      window.addEventListener("beforeunload",()=>{
        localStorage.setItem("userId",JSON.stringify(this.$store.state))
      })
      localStorage.getItem("userId") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("userId"))));
    }
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
</style>
