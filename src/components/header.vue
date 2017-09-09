<template>
    <div class="myHeader">
        <div id="logo">admin</div>
        这是个
        <span> 后台管理系统</span>
    </div>
</template>

<script>
export default {
    name:'header'
}
</script>

<style scoped>
  .myHeader{
      background: #404040;
      color: white;
      font-family: youyuan;
      font-size: 45px;
      height: 60px;
      top: 0;
      padding-left:15px;
      position: fixed;
      width: 100%;
      z-index: 99;
}
  .myHeader span{
      color: white;
      font-family: youyuan;
      font-size: 30px;
      margin: 0px;
      padding: 0;
  }
  #logo{
      font-size: 50px;
      font-family: Arial, Helvetica, sans-serif;
      float: right;
      margin:5px 20px 2px 0px;
  }
</style>
