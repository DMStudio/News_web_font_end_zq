<template>
  <div id="link">
    <input type="file" @change="getFile($event)" id="theFile">
    <button id="linkStart" @click="go($event)">GO</button>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$http = axios
export default {
    
    data(){
        return {
            file:''
        }
    },
    methods:{
        getFile(event){
            this.file=event.target.files[0];
            console.log(this.file)
        },
        go(event){
            event.preventDefault()
            let formData=new FormData()
            formData.append('file',this.file)
            formData.append('name',"2333")
            let config={
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }
            axios.post('http://118.89.37.216/api/test',formData,config)
            .then((response)=>{
                console.log(response.data)
            })
        }
    }
}
</script>

<style>
#link{
    text-align: center;
    margin-top:100px;
}
#theFile{
    margin:0 auto 0 auto;
}
</style>
