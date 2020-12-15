<template>
  <div class="load-more">
      <button @click="count()" class="btn blue">Load More Results</button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            counter:50
        }
    },
    methods:{
        count(){
            if(counter = 50){
               console.log("Count: " + counter); 
            }
            else{
                counter += 50;
                console.log("Count: " + counter)
            }

        }
    }
}
</script>

<style>

</style>