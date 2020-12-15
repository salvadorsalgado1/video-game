<template>
    <div class="container">
        <div class="card">
            <div class="card-content">
                <div class="container">
                    <h1 class="intro-h-one">Game Search</h1>
                    <img alt="" class="intro-img" src="@/assets/controller-spin.png" /> 
                    <p class="intro-p">{{desc}}.</p>
                    <br/>
                    <router-link class="waves-effect waves-light btn-large" :to="{name:'Home'}">Continue</router-link>  
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            desc:'Search for your favorite games by looking up basic information such as your favorite game titles by rating, publishers, or developers You have the ability to make edits or perhaps add your favorite game to your collection'
        }
    }
}
</script>