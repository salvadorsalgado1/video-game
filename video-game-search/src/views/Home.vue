<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-content">
              <p class="heading-description">
                Search for your favorite titles ratings, and even go as far as finding information 
                about your favorite developers and titles. Give it a search to try it out! You can also 
                <router-link :to="{name:'SearchByLetter'}">Search By Letter</router-link> if you know the 
                title of your games.</p>
               <form>
                <label>Search</label>
                <div class="input-field">
                <input placeholder="Title, Rating, Developer..." v-model="search"/>
                </div>
              </form>
              <p>Not seeing what you're looking for? <router-link :to="{name:'Search'}">Try an Advanced Search!</router-link></p>
            <h1 class="heading-h1">{{this.filteredResults.length}} Result(s) of {{this.results.length}}</h1>
            <div v-if="loading">
              <Loading/>
            </div>
            <table class="table bordered striped centered" >
              <caption>Game Listings</caption>
              <thead>
              <tr>
                <th>ID</th>
                <th>Game Title</th>
                <th>Rating</th>
                <th>Release Year</th>
                <th>Console</th>
              </tr>
              </thead>
              <tbody>
                <tr v-for="(filteredResult, title_id) in filteredResults" :key="title_id">
                  <td>{{filteredResult.title_id}}</td>
                  <td>{{filteredResult.title_name}}</td>
                  <td>{{filteredResult.rating}}</td>
                  <td>{{filteredResult.year_release}}</td>
                  <td>{{filteredResult.console_name}}</td>
                  <td><div v-if="toggleEdit">
                    <button @click="moreInfo(filteredResult.title_id)" class="btn-edit-delete btn green">More<i class="material-icons right">search</i></button>
                     <router-link class="btn-edit-delete btn blue" :to="{name:'Edit', 
                  params:{
                    id:filteredResult.title_id, 
                    title:filteredResult.title_name, 
                    //developer:result.developer,
                   // publisher:result.publisher,
                    rating:filteredResult.rating,
                    console:filteredResult.console_name,
                    releaseYear:filteredResult.year_release
                    }}">Edit <i class="material-icons right">edit</i></router-link>
                  <button class="btn-edit-delete btn red" @click="removeQuery(filteredResult.title_id)">Delete <i class="material-icons right">delete_forever</i></button>
                  
                  </div></td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div @click="toggleEditHandler">
      <Floating />
    </div>
  </div>
</template>
<script>
import Floating from '@/components/Floating.vue'
import Loading from '@/components/Loading.vue'
import Axios from 'axios'
export default {
  name: 'Home',
  components:{Loading, Floating},
  data(){
    return{
      results:[],
      search:'',
      loading:true,
      toggleEdit:false,
      queryCount:null,
    }
  },
   methods:{
     moreInfo(id){
       this.$router.push({name:'More', params:{id:id}})
     },
      toggleEditHandler(){
        console.log("handler")
        
        if(this.toggleEdit){
          return this.toggleEdit = false;
        }else if(!this.toggleEdit){
          return this.toggleEdit = true;
        }else{
          console.log("Outside")
        }
      },
      removeQuery(id){
        console.log(id);
        Axios.delete(`http://localhost:8081/api/delete/${id}`)
        .then(()=>{
          console.log("Deletion Successful...")
        })
        
        this.results = this.results.filter(result =>{
          return result.title_id != id;
        })
        
        }
        },
        computed:{
          filteredResults: function(){
            return this.results.filter((result)=>{
              if(result.year_release == null){
                return result.title_name.toUpperCase().match(this.search.toUpperCase()) 
              || result.rating.toUpperCase().match(this.search.toUpperCase()) 
              || result.year_release.match(this.search)
              }else{
              result.year_release = result.year_release.toString()
              return result.title_name.toUpperCase().match(this.search.toUpperCase()) 
              || result.rating.toUpperCase().match(this.search.toUpperCase()) 
              || result.year_release.match(this.search)
              }
              
            })
          },
        },
        mounted(){
          Axios.get('http://localhost:8081/api/get').then((response)=>{
          this.loading = false;
          console.log(response.data);
          this.results = JSON.parse(JSON.stringify(response.data));
          
        })
        document.addEventListener('DOMContentLoaded', function() {
          var elems = document.querySelectorAll('.fixed-action-btn');
          var instances = M.FloatingActionButton.init(elems);
        });
        }
}
</script>
<style>
.btn-search{
  margin-top:30px;
}
.collection{
  font-size:1.6em;
}
.btn-edit-delete{
  margin:5px 1px;
  margin-bottom:5px;
  margin-top:5px;
}
.heading-h1{
  font-size:2em;
}
.heading-h2{
  font-size:1.8em;
}
.heading-h3{
  font-size:1.6em;
}
.heading-description{
  font-size: 1.25rem;
  font-weight: 300;
  color:#212529;
}


</style>

