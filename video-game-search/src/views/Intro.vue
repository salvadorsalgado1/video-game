<template>
    <div class="intro">
       <Introduction/>
    </div>
</template>
<script>
import Introduction from '../components/Introduction'
export default {
    name:'Intro',
    components:{
        Introduction
    } 
}
</script>
<style>
.intro-h-one{
    font-size:2em;
}
.intro-p{
    font-size:1.6em;
}
.card{
    max-width:100%;
}
.intro-img{
    width:30%;
    margin-top:50px;
    margin-bottom:40px;
    -webkit-animation:spin 4s linear infinite;
    -moz-animation:spin 4s linear infinite;
    animation:spin 4s linear infinite;
}
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>