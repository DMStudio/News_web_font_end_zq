<template>
  <div class="nav" id="nav">
    <ul>
        <li><router-link to="/">新闻管理</router-link></li>
        <li><router-link to="/financial-management">账单管理</router-link></li>
        <li><router-link to="">库存管理</router-link></li>
        <li><router-link to="">人员管理</router-link></li>
        <li><router-link to="">进货管理</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>
    .nav{
        background: #404040;
        color: white;
        height: 100%;
        margin-right: 15%;
        position: fixed;
        top: 60px;
        width: 10%; 
    }
    
    .nav ul{
        list-style-type: none;
        line-height: 3em;
        text-align: left;
        padding-left: 0px;
    }
    .nav ul li{
        padding-left: 20px;
    }

    .nav a{
        text-decoration: none;
    }
    .nav ul li:hover{
        background-color: #5e6d82;
    }
    .nav a:link{
        color: white;
    }
    .nav a:visited{
        color: white;
    }
</style>
