<template>
  <v-toolbar dark color="primary" class="mb-2">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="header-title" @click="onClickHeaderTitle">HWP File Parser (WEB Version)</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn flat class="px-0 title">
      <v-icon left>fa fa-user</v-icon>
      Josh Lee
    </v-btn>
    <div class="pr-2">|</div>
    <div class="title">
      accforaus@gmail.com
    </div>
  </v-toolbar>
</template>

<script>
  import {SET_CURRENT_FEATURE, SET_SELECTED_FILES, UPLOAD_FILES} from "../../store/mutation_types";

  export default {
    name: "Header",
    methods: {
      onClickHeaderTitle() {
        this.$EventBus.$emit('onBodyClear')
        this.$EventBus.$emit('onFileTableClear')
        this.$store.commit(SET_CURRENT_FEATURE, { payload: '' })
        this.$store.commit(SET_SELECTED_FILES, { payload: [] })
      }
    }
  }
</script>

<style scoped>
  .header-title {
    cursor: pointer;
  }
</style>
