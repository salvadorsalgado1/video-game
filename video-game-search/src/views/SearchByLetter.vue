<template>
    <div class="search">
        <div class="container">
            <div class="card">
                <div class="card-content">
                    <h1 class="heading-h1">Search By Letter</h1>
                        <p>
                            <a href="#" @click='getID(A)' id="A">{{A}}</a> | 
                            <a href="#" @click='getID(B)' id="B">{{B}}</a> | 
                            <a href="#" @click='getID(C)' id="C">{{C}}</a> |
                            <a href="#" @click='getID(D)' id="D">{{D}}</a> | 
                            <a href="#" @click='getID(E)' id="E">{{E}}</a> |
                            <a href="#" @click='getID(F)' id="F">{{F}}</a> | 
                            <a href="#" @click='getID(G)' id="G">{{G}}</a> | 
                            <a href="#" @click='getID(H)' id="H">{{H}}</a> | 
                            <a href="#" @click='getID(I)' id="I">{{I}}</a> |
                            <a href="#" @click='getID(J)' id="J">{{J}}</a> | 
                            <a href="#" @click='getID(K)' id="K">{{K}}</a> | 
                            <a href="#" @click='getID(L)' id="L">{{L}}</a> |
                            <a href="#" @click='getID(M)' id="M">{{M}}</a> | 
                            <a href="#" @click='getID(N)' id="N">{{N}}</a> | 
                            <a href="#" @click='getID(O)' id="O">{{O}}</a> |
                            <a href="#" @click='getID(P)' id="P">{{P}}</a> | 
                            <a href="#" @click='getID(Q)' id="Q">{{Q}}</a> |
                            <a href="#" @click='getID(R)' id="R">{{R}}</a> | 
                            <a href="#" @click='getID(S)' id="S">{{S}}</a> | 
                            <a href="#" @click='getID(T)' id="T">{{T}}</a> |
                            <a href="#" @click='getID(U)' id="U">{{U}}</a> | 
                            <a href="#" @click='getID(V)' id="V">{{V}}</a> | 
                            <a href="#" @click='getID(W)' id="W">{{W}}</a> |
                            <a href="#" @click='getID(X)' id="X">{{X}}</a> |
                            <a href="#" @click='getID(Y)' id="Y">{{Y}}</a> | 
                            <a href="#" @click='getID(Z)' id="Z">{{Z}}</a>
                            </p>
                    <div v-if="loading"><Loading/></div>
                    <div v-if="toggleResult">
                        <h2 class="heading-h2">Results</h2>
                        <table class="table higlighted bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Year</th>
                                    <th>Console</th>
                                    <th>Rating</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="result in searchResult" :key="result.title_id">
                                    <td>{{result.title_id}}</td>
                                    <td>{{result.title_name}}</td>
                                    <td>{{result.year_release}}</td>
                                    <td>{{result.console_name}}</td>
                                    <td>{{result.rating}}</td>
                                    <td v-if="toggleEdit">
                                        <button @click="moreInfo(result.title_id)" class="btn-edit-delete btn green">More<i class="material-icons right">search</i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>                       
                </div>
            </div>
        </div>
        <div @click="toggleButton">
            <Floating/>
        </div>
    </div>
</template>
<script>
import Loading from '../components/Loading'
import LoadMore from '../components/LoadMore'
import Floating from '../components/Floating'
import Axios from 'axios';
export default {
    name:'SearchByLetter',
    components:{
        Loading,
        LoadMore,
        Floating,
     
    },
    data(){
        return{
            toggleResult:false,
            searchResult:[],
            toggleEdit:false,
            loading:false,
            A:'A', B:'B',C:'C', D: 'D', E: 'E', F: 'F', 
            G: 'G', H: 'H', I: 'I', J: 'J', K: 'K', L: 'L', 
            M: 'M', N: 'N', O: 'O', P: 'P', Q: 'Q', R: 'R', 
            S: 'S', T: 'T', U: 'U', V: 'V', W: 'W', X: 'X', 
            Y: 'Y', Z: 'Z'
        }
    },
    methods:{
        getID(letter){
            console.log(letter)
            this.toggleResult = true;
            Axios.get(`http://localhost:8081/api/search/${letter}`)
            .then((response)=>{
                this.searchResult = JSON.parse(JSON.stringify(response.data));
                console.log(this.searchResult)
            })
        },
        moreInfo(id){
       this.$router.push({name:'More', params:{id:id}})
     },
     toggleButton(){
         if(this.toggleEdit){
             this.toggleEdit = false;
         }else{
             this.toggleEdit = true;
         }
     }
    },
    mounted(){
        
        
// Implementation 1, first get 50 results, then pass in a way to get results more than 50 but =< 100.

    }
}
</script>
<style>

</style>
