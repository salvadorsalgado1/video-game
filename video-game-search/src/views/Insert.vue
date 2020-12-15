<template>
    <div class="insert">
        <div class="container">
            <div class="card">
                <div class="card-content">
                    <h1 class="insert-heading">Insert</h1>
                    <form @submit.prevent="insertData()">
                    <div class="container input-field">
                        <div class="row">
                            <div class="col l12 m12 s12">
                                <input placeholder="Title" name="title" for="title" type="text" v-model="title"/>
                                <label>Title</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col l6 m6 s12">
                                <input placeholder="Publisher Name" v-model="publisher"/>
                                <label>Publisher</label>
                            </div>
                            <div class="col l6 m6 s12">
                                <input placeholder="Developer Name" v-model="developer"/>
                                <label>Developer</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col l6 m6 s12">
                                  <div class="input-field col s12">
                                    <select v-model="rating">
                                    <option value="N/A" disabled selected>Choose your option</option>
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
                                    <select v-model="console">
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
                                    
                                    </select>
                                    <label>Console</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                           <div class="col l6 m6 s12">
                                <input min="1980" max="2022" type="number" class="datepicker" placeholder="Release Year" v-model="releaseYear">
                                <label>Year</label>
                            </div>
                            
                        </div>
                         <div v-if="loading">
                        <p class="p-loading">Successful Insert</p>
                        <Loading/>
                    </div>
                    </div>
                    <p v-if="feedbackErr" class="feedback-error">{{feedback}}</p>
                    <button class="primary btn">Submit</button>
                </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Axios from 'axios'
import Loading from '@/components/Loading'
export default {
    name:'Insert',
    components:{
        Loading
    },
    data(){
        return{
            title:null,
            publisher:null,
            developer:null,
            rating:null,
            console:null,
            releaseYear:null,
            feedback:null,
            feedbackErr:true,
            loading:false,
            maxIDs:null
        }
    },
    methods:{
        insertData(){
                this.releaseYear = parseInt(this.releaseYear);

            Axios.post('http://localhost:8081/api/insert', 
                {
                console:this.console,
                publisher:this.publisher,
                developer:this.developer,
                rating:this.rating,
                releaseYear:this.releaseYear,
                title:this.title,
                maxTitle:this.maxTitle,
                maxPublisher:this.maxPublisher,
                maxDeveloper:this.maxDeveloper
                
                }).then(()=>{
                    console.log("posted")
                });




/*



            if(this.title == null ||  this.publisher == null || this.developer == null || this.rating == null || this.console == null || this.releaseYear == null){
                this.feedbackErr = true;
                this.feedback = "Form values cannot be null!";
                //Cannot be Null or else DB Breaks
            }else{
                this.feedbackErr = false;
                this.releaseYear = parseInt(this.releaseYear)
                console.log(this.title,this.publisher,this.developer,this.rating,this.console, typeof this.releaseYear)
                console.log(this.releaseYear)
                console.log(this.rating)
            
                Axios.post('http://localhost:8081/api/insert', 
                {
                console:this.console,
                publisher:this.publisher,
                developer:this.developer,
                rating:this.rating,
                releaseYear:this.releaseYear,
                title:this.title,
                maxTitle:this.maxTitle,
                maxPublisher:this.maxPublisher,
                maxDeveloper:this.maxDeveloper
                
                }).then(()=>{
                console.log("Successful Insert");
                console.log("Insert: ", this.maxTitle, this.title, this.console, this.releaseYear, this.rating, this.publisher, this.developer)
                }).then(()=>{
                    this.loading = true;
                    setTimeout(()=>{
                        this.loading = false;
                        this.$router.push({name:'Home'}) 
                        },1000)
                })
            }
*/
           
        },
    },
    mounted(){
        ($(document).ready(function(){
            $('select').formSelect();}))

            Axios.get('http://localhost:8081/api/get/max')
            .then((response=>{
                console.log(response.data);
                this.maxIDS = JSON.parse(JSON.stringify(response.data));
            })).then(()=>{
                this.maxTitle = this.maxIDS[0].titleID + 1;
                this.maxPublisher = this.maxIDS[0].publisherID + 2;
                this.maxDeveloper = this.maxIDS[0].developerID + 3;
                
                console.log(this.maxTitle);

            })
    }
}
</script>
<style>
.insert-heading{
    font-size:1.8em;
}
.card .card-content .feedback-error{
    color:red;
    margin-bottom:20px;
}

</style>