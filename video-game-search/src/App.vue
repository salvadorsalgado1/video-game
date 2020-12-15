<template>
  <div id="app">
    <Navigation/>
    
    <router-view/>
  </div>
</template>
<script>
import Navigation from './components/Navigation'

 export default {
   components:{
     Navigation
   },
   name:'App',
  mounted(){
    document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
   background: url('./assets/controller.jpg') no-repeat center center fixed; 
 -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.card{
  margin-top:50px;
}
</style>
