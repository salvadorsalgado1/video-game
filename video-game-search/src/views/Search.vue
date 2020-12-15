<template>
    <div class="search">
        <div class="container">
            <div class="card">
                <div class="card-content">
                    <h1 class="heading-h1">Search</h1>
                        <form>
                            <label>Search</label>
                            <div class="input-field">
                        <input type="text" placeholder="Title, Rating, Developer..." v-model="search"/>
                        </div>
                        <button @click="searchQuery(search)" class="btn blue">Search<i class="material-icons right">search</i></button>
                        </form>
                        <div v-if="searchResult">
                            <h2 class="heading-h2">Results</h2>
                            <table class="table striped highlight ">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Console</th>
                                        <th>Year</th>
                                        <th>Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="result in searchResult" :key="result.title_id">
                                        <td>{{result.title_name}}</td>
                                        <td>{{result.console_name}}</td>
                                        <td>{{result.year_release}}</td>
                                        <td>{{result.rating}}</td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Axios from 'axios';
export default {
    name:'Search',
    data(){
        return{
            search:null,
            searchResult:null
        }
    },
    methods:{
        searchQuery(search){
            console.log(search)
            Axios.get(`http://localhost:8081/api/search/${search}`, {

            })
            .then((response)=>{
                
                console.log(response.data)
                this.searchResult = JSON.parse(JSON.stringify(response.data));
            })
        }
    }
}
</script>
