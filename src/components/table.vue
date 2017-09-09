<template>
    <div id="table">
        <el-button  id="add" type="primary" @click="initDialog(),addVariable=true"><i class="el-icon-plus"></i> 添加记录</el-button>
        <p id="newsTitle">新闻管理</p>
        <!--数据表-->
        <el-table :data="tableData" stripe >
            <el-table-column prop="localKey" label="id" width="70"></el-table-column>
            <el-table-column prop="type" label="类型" width="70"></el-table-column>
            <el-table-column prop="title" label="标题" width="150"></el-table-column> 
            <el-table-column prop="img" label="图片" width="100">
                <template scope="Img">
                    <img  :src="Img.row.img" style="height:77px;width:77px;margin:3px 0 0 0 ">
                </template>
            </el-table-column>
            <el-table-column prop="content" label="内容" width="240">
                <template scope="Content">{{Content.row.content.slice(0,60)}} </template>
            </el-table-column>
            <el-table-column prop="created_at" label="创建时间" width="180"></el-table-column>
            <el-table-column prop="updated_at" label="更新时间" width="180"></el-table-column>
            <el-table-column prop="handle" label="操作"  >
                <template scope="handle">
                    <el-button size="small" type="success" @click="showRevise(handle.row.localKey)" >编辑</el-button>
                    <el-button size="small" type="danger" @click="deleteInfo(handle.row.key,handle.row.localKey)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <!--分页-->
        <div class="pageNumber">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>
        <!--添加弹窗-->
        <el-dialog title="添加新闻" v-model="addVariable" size="small" >
            <el-form label-position="right" label-width="80px" style="width:90%; ">
                <el-form-item label="标题">
                    <el-input v-model="addTitle" ></el-input>
                </el-form-item>
                <el-form-item label="新闻类型" >
                    <el-input v-model="addType"></el-input>
                </el-form-item>
                <el-form-item label="内容" >
                    <div id="summernote"></div>
                </el-form-item>
                <el-form-item>
                    <el-button @click="addInfo" type="primary" >确定</el-button>
                    <el-button @click="initDialog">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script lang="babel">

import '../assets/css/toastr.css'
import toastr from '../assets/js/toastr'
import {mapActions} from 'vuex'
import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$http = axios
import $ from 'jquery'

import 'bootstrap/js/modal.js'
import 'bootstrap/js/dropdown.js'
import 'bootstrap/js/tooltip.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'summernote'
import 'summernote/dist/summernote.js'
import 'summernote/dist/summernote.css'
export default {
    
  data(){
      return {
          pageSize:10,
          currentPage:1,
          reviseKey:"",
          addTitle: "",
          addContent: "",
          addImg: "",
          addType:　"",
          addVariable: false,
          tableData:[{
                        key: "",
                        title: "",
                        content: "",
                        type: "",
                        img: "",
                        localKey:"",
                        created_at:"",
                        updated_at:""
                    }]
                }
  },
  created:function(){
        this.updateNews()
        
      },
  mounted:function(){
      
  },
  methods:{
      
      ...mapActions([
          'myUpdate'
      ]),
      
      initDialog(){       
          this.addVariable= false
          this.addTitle="",
          this.addContent="",
          this.addImg="",
          this.addType=""
          $(document).ready(()=>{
              var that=this
              $('#summernote').summernote({
                  height:300,
                  placeholder:'内容',
                  callbacks:{
                      onImageUpload:function(files){
                          var formData=new FormData()
                          formData.append('file',files[0])
                          axios.post('http://118.89.37.216/api/upload',formData)
                          .then((response)=>{
                              that.addImg=response.data.path
                               $('#summernote').summernote('insertImage',that.addImg);
                          })
                      } 
                  }   
            })
          })
              //$('#summernote').summernote('code',this.addContent)
      },
  
      initData(){
          this.tableData.splice(0,50,{
                        key: "",
                        title: "",
                        content: "",
                        type: "",
                        img: "",
                        localKey:"",
                        created_at:"",
                        updated_at:""
                    })
      },
      updateNews:function(){
          var tableData=this.tableData
          axios.get('http://118.89.37.216/api/news_list?skip=1&take=10')
          .then(function(response){
              var mydata=response.data
              for(var i=0;i<=mydata.length-1;i++)
              {      
                  tableData.push({
                        localKey:i+1,
                        key:mydata[i].id,
                        title:mydata[i].title,
                        content:mydata[i].content,
                        img:mydata[i].img_url,
                        type:mydata[i].type_id,
                        created_at:mydata[i].created_at,
                        updated_at:mydata[i].updated_at
                    })
              }

              tableData.splice(0,1)
        })
      },
      addInfo:function(){

          var tableData=this.tableData
          var key=this.reviseKey
          let formData=new FormData()
          if(!(key=='')){
              axios.post('http://118.89.37.216/api/update_news',{
                id:tableData[key].key,
                title:this.addTitle,
                content:$('#summernote').summernote('code'),
                img_url:this.addImg,
                type_id:Number(this.addType)
            })
              .then((response)=>{
                if(response.data.status==0){
                    tableData[key].title=this.addTitle,
                    tableData[key].content=this.addContent,
                    tableData[key].img=this.addImg,
                    tableData[key].type=Number(this.addType)
                    toastr.success('修改第'+key+'条消息成功','数据修改')
                    }
                else{
                    toastr.error('修改失败','数据修改')
                }
                    this.initDialog()
                    this.reviseKey=''
                })
          }
          else{
              formData.append('title',this.addTitle)
              formData.append('content',$('#summernote').summernote('code'))
              formData.append('img_url',this.addImg)
              formData.append('type_id',Number(this.addType))
              axios.post('http://118.89.37.216/api/update_news',formData)
                .then((response)=>{
                    if(response.data.status==0){
                        tableData.unshift({
                            localKey:"新建",
                            key:Number(tableData[tableData.length-1].key+1),
                            title:this.addTitle,
                            content:$('#summernote').summernote('code'),
                            img:this.addImg,
                            type:Number(this.addType)
                            })
                    }
                    this.initDialog()  
                })
            }
          this.myUpdate(this.addTitle)
        },
        deleteInfo(id,key){
          var tableData=this.tableData
          axios.post('http://118.89.37.216/api/destroy_news',{
              id:[id]
          })
          .then(function(response){
            if(response.data.status==0){
                tableData.splice(key-1,1)
                toastr.success('删除第'+key+'条消息成功','数据删除')
            }
            else{
                toastr.error('数据删除','删除失败')
            }
          })
        },
        showRevise:function(key){
            this.initDialog()
            var tableData=this.tableData
            this.reviseKey=key-1
            this.addTitle=tableData[key-1].title
            this.addContent=tableData[key-1].content
            this.addImg=tableData[key-1].img
            this.addType=tableData[key-1].type
            this.addVariable=true
            $(document).ready(()=>{
                 $('#summernote').summernote('code',this.addContent)
            })

        },
        handleSizeChange(val){
            var tableData=this.tableData
            this.initData()
            this.pageSize=val
            var url="http://118.89.37.216/api/news_list?skip="+(val*(this.currentPage-1)+1)+"&take="+val
            axios.get(url)
            .then(function(response){
              var mydata=response.data
              for(var i=0;i<=mydata.length-1;i++){      
                  tableData.push({
                        localKey:i+1,
                        key:mydata[i].id,
                        title:mydata[i].title,
                        content:mydata[i].content,
                        img:mydata[i].img_url,
                        type:mydata[i].type_id,
                        created_at:mydata[i].created_at,
                        updated_at:mydata[i].updated_at
                    })
              }
              tableData.splice(0,1)
            })
        },
        handleCurrentChange(val){
            var tableData=this.tableData
            this.initData()
            var url="http://118.89.37.216/api/news_list?skip="+((val-1)*this.pageSize+1)+"&take="+this.pageSize
            axios.get(url)
            .then(function(response){
              var mydata=response.data
              for(var i=0;i<=mydata.length-1;i++){     
                  tableData.push({
                        localKey:i+1,
                        key:mydata[i].id,
                        title:mydata[i].title,
                        content:mydata[i].content,
                        img:mydata[i].img_url,
                        type:mydata[i].type_id,
                        created_at:mydata[i].created_at,
                        updated_at:mydata[i].updated_at
                    })
              }
              tableData.splice(0,1)
            })
        }
  },
  computed:{
      getinfo:function(){
          return this.$store.state.addt
          }
  }
}
</script>
<style>
#add{
    float: right;
    margin: 5px;
}
#newsTitle{
    font-family: "微软雅黑";
    font-size: 25px;
    font-weight: normal;
    margin: 0;
}
#table .el-table{
    text-align: center;
    margin-top: 5px;

}
#table .el-table label{
    text-align: center;}
#table{
    margin:60px auto 0 10%;
    padding: 0.5%;
    background: #e0e0e0;
    height: 550px;
    overflow: auto;    
}

#table th>div{
    text-align: center;
}
#table .pageNumber{
    text-align: center;
    margin: 50px 0 15px 0;
}

</style>
