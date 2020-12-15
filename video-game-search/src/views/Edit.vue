<template>
    <div class="edit">
        <div class="container">
            <div class="card">
                <div class="card-content">
                    <h1 class="heading-h1">Game Data</h1>
                    <table class="table bordered striped centered responsive-table">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Developer</th>
                            <th>Publisher</th>
                            <th>Rating</th>
                            <th>Console Available</th>
                            <th>Release Year</th>
                            </tr>  
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{this.id}}</td>
                                <td>{{this.gettitle}}</td>
                                <td>{{this.developer}}</td>
                                <td>{{this.publisher}}</td>
                                <td>{{this.getrating}}</td>
                                <td>{{this.getconsole}}</td>
                                <td>{{this.getreleaseYear}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h1 class="heading-h1">Edit Information</h1>
                    <form @submit.prevent="submitEdit()">
                    <div class="container input-field">
                        <div class="row">
                            <div class="col l12 m12 ">
                                <input placeholder="Title" name="title" for="title" type="text" v-model="gettitle"/>
                                <label>Title</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col l6 m6 s12">
                                <input placeholder="Developer Name" v-model="developer"/>
                                <label>Developer</label>
                            </div>
                            <div class="col l6 m6 s12">
                                <input placeholder="Publisher Name" v-model="publisher"/>
                                <label>Publisher</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col l6 m6 s12">
                                <div class="input-field col s12">
                                    <select v-model="getrating">
                                    <option value="null" disabled selected>Choose your option</option>
                                    <option value="NR">NR for Not Rated</option>
                                    <option value="E">E for Everyone</option>
                                    <option value="T">T for Teen</option>
                                    <option value="M">M for Mature</option>
                                    </select>
                                    <label>Rating</label>
                                </div>
                            </div>
                            <div class="col l6 m6 s12">
                                <div class="input-field col s12">
                                    <select v-model="getconsole">
                                    <option value="N/A" disabled selected>Choose your option</option>                                    
                                    <option value="3DS">3DS</option>
                                    <option value="DC">DC</option>
                                    <option value="DS">DS</option>
                                    <option value="GBA">Gameboy Advance</option>
                                    <option value="GC">GameCube</option>
                                    <option value="PC">PC</option>
                                    <option value="Playstation 5">Playstation 5</option>
                                    <option value="Playstation 4">Playstation 4</option>
                                    <option value="Playstation 3">Playstation 3</option>
                                    <option value="Playstation 2">Playstation 2</option>
                                    <option value="Playstation">Playstation</option>
                                    <option value="Wii">Wii</option>
                                    <option value="WiiU">WiiU</option>
                                    <option value="Xbox">Xbox</option>
                                    <option value="Xbox 360">Xbox 360</option>
                                    <option value="Xbox One">Xbox One</option>
                                    <option value="null">Unknown</option>
                                    </select>
                                    <label>Console</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                           <div class="col l6 m6 s12">
                                <input min="1980" max="2022" type="number" class="datepicker" placeholder="Release Year" v-model="getreleaseYear">
                                <label>Year</label>
                            </div>
                        </div>
                        <p v-if="feedbackErr">{{feedback}}</p>
                        <div v-if="loading">
                            <p class="p-loading">Edit Successful</p>
                            <Loading/>
                        </div>
                    </div>
                    <button class="primary btn">Submit</button>
                </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Axios from 'axios';
import Loading from '@/components/Loading'
export default {
    name:'Edit',
    props:['id', 'title', 'rating', 'console','releaseYear'],
    components:{Loading},
    data(){
        return{
            gettitle:this.title,
            getid:this.id,
            getrating:this.rating,
            getreleaseYear:this.releaseYear,
            getconsole:this.console,
            loading:false,
            feedbackErr:null,
            feedback:null,
            gameInformation:[],
            publisher:null,
            developer:null,
        }
    },
    methods:{
        submitEdit(){
            this.loading = true;
            this.getreleaseYear = parseInt(this.getreleaseYear);
            console.log(this.getid, this.gettitle, this.getrating, this.getreleaseYear, this.getconsole,this.publisher, this.developer)
            Axios.put('http://localhost:8081/api/update', 
            {
                id:this.getid,
                title:this.gettitle,
                rating:this.getrating,
                year:this.getreleaseYear,
                console:this.getconsole,
                publisher:this.publisher,
                developer:this.developer
            
            })
            setTimeout(()=>{
                this.loading = false;
                this.$router.push({name:'Home'})
            }, 1000)
        }
    },
    mounted(){
        Axios.get(`http://localhost:8081/api/get/${this.getid}`)
        .then((res)=>{
            console.log(res.data);
            this.gameInformation = JSON.parse(JSON.stringify(res.data));
            this.publisher = this.gameInformation[0].publisher_name;
            this.developer = this.gameInformation[0].developer_name;
            this.genre = this.gameInformation[0].genre;
          });
            ($(document).ready(function(){
                $('select').formSelect();
                }))
    }
}
</script>
<style>
.card .card-content p{
    margin-bottom:20px;
}
.p-loading{
    color:darkgreen;
    margin-top:50px;
}
</style>