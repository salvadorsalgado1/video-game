<template>
<div class="navigation">
  <nav>
    <div class="nav-wrapper grey darken-1">
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul class="right hide-on-med-and-down">
        <li><router-link class="waves-effect waves-light btn blue" :to="{name:'Intro'}">Introduction</router-link></li>
        <li><router-link class="waves-effect waves-light btn green" :to="{name:'Home'}">Home</router-link></li>
        <li><router-link class="waves-effect waves-light btn orange" :to="{name:'Insert'}">Insert</router-link></li>
        <li><router-link class="waves-effect waves-light btn red" :to="{name:'About'}">About</router-link></li>
      </ul>
    </div>
  </nav>
  <ul class="sidenav" id="mobile-demo">
    <li><router-link :to="{name:'Intro'}">Introduction</router-link></li>
    <li><router-link :to="{name:'Home'}">Home</router-link></li>
    <li><router-link :to="{name:'Insert'}">Insert</router-link></li>
    <li><router-link :to="{name:'About'}">About</router-link></li>
    <li><router-link :to="{name:'Search'}">Advanced Search</router-link></li>
  </ul>
</div>      
</template>
