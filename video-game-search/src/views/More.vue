<template>
  <div class="more">
      <div class="container">
        <div class="card">
          <div class="card-content">
              <h1 class="heading-h1">About the Game</h1>
              <h2 class="heading-h2">Details:</h2>
              <img v-bind:src="this.results[0].media_url" class="responsive-img materialboxed" />
              <div v-for="result in results" :key="result.id">
                <h3 class="heading-h3">{{result.title}}</h3>
                <p class="scores left">
                    Critic Score: {{result.critic_score}} of 100<br/>
                    User Score: {{result.user_score}} of 10
                </p>
              <table class="table bordered highlight striped">
                  <thead>
                      <tr>
                          <th>Rating</th>
                          <th>Publisher</th>
                          <th>Deveoper</th>
                          <th>Year</th>
                          <th>Genre</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>{{result.rating}}</td>
                          <td>{{result.publisher}}</td>
                          <td>{{result.developer}}</td>
                          <td>{{result.year}}</td>
                          <td>{{result.genre}}</td>
                      </tr>
                  </tbody>
              </table>
              <h2 class="heading-h2">Sales Information (Sales by Millions)</h2>
              <table class="table bordered highlight striped">
                  <thead>
                      <tr>
                          <th>North America</th>
                          <th>Japan</th>
                          <th>Europe</th>
                          <th>Global Sales</th>
                          <th>Other Sales</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                        <td>{{result.na_sales}}</td>
                        <td>{{result.jp_sales}}</td>
                        <td>{{result.eu_sales}}</td>
                        <td>{{result.global_sales}}</td>
                        <td>{{result.other_sales}}</td>
                      </tr>
                  </tbody>
              </table>
              </div>
          </div>
        </div>
            <router-link :to="{name:'Home'}" class="btn green return-btn">Return</router-link>
      </div>
  </div>
</template>
<script>
import Axios from 'axios'
export default {
name:'More',
props:['id'],

data(){
    return{
        results:null,
        image:'@/assets/placeholder.png',
    }
},
mounted(){
    Axios.get(`http://localhost:8081/api/more/${this.id}`)
    .then((response)=>{
        this.results = JSON.parse(JSON.stringify(response.data));
        console.log(this.results);
    })
    console.log("Search for ID: " + this.id);
    $(document).ready(function(){
        $('.materialboxed').materialbox();
    });
}
}
</script>

<style>
.card .card-content .scores{
    font-size:1.5em;
    font-family:Arial, sans-serif;
}
</style>