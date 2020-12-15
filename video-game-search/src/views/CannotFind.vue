<template>
    <div class="cannot-find">
        <div class="container">
            <div class="card">
                <div class="card-content">
                    <h1 class="canont-find-message-h">404</h1>
                    <p class="cannot-find-message-p">Oops! Cannot find page!</p>
                    <img alt="" class=" responsive-img" src="@/assets/pipe.png" />
                </div>
            </div>
            <router-link class="btn align-center" :to="{name:'Home'}">Home</router-link>
        </div>
    </div>
</template>
<script>
export default {
    name:'CannotFind'
}
</script>
<style scoped>
.card{
    margin-top:50px;
}
.cannot-find-message-h{
    font-size:3em;
}
.cannot-find-message-p{
    font-size:1.8em;
}
.btn{
    margin-top:20px;
}
.cannot-find-img{
    width:50%;
}
.cannot-find-img{
    width:20%;
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