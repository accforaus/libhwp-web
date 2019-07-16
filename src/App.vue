<template>
  <div id="app" class="main">
    <v-app>
      <router-view name="header"></router-view>
      <v-content class="pb-5">
        <router-view name="body"></router-view>
      </v-content>
      <router-view name="footer"></router-view>
    </v-app>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    background: white;
  }

  .main {
    background: white;
  }
</style>
