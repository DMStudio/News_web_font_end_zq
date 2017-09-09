import Vue from 'vue'
import Router from 'vue-router'
import Table from '../components/table'
import Header from '../components/header'
import Nav from '../components/sideNav'
import Link from '../components/fileLink'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      components:{
        table:Table,
        header:Header,
        nav:Nav,
      } 
    },
    {
      path:'/financial-management',
      components:{
        header:Header,
        nav:Nav,
        table:Link
      }
    }
  ]
})
