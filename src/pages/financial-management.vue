<template>
  <div id="app">
    <router-view name="header"></router-view>
    <router-view name="nav"></router-view>
    <router-view name="link"></router-view>
  </div>
</template>
<script>
export default {
  name: 'financial-management'
}
</script>